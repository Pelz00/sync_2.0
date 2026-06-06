/**
 * Next.js Proxy (renamed from Middleware in Next 16).
 *
 * Two jobs:
 *   1. Refresh the Supabase session on every navigation (so RSC pages see a
 *      valid token) - delegated to `@/lib/supabase/middleware`.
 *   2. Route-group gate: redirect unauthenticated users away from protected
 *      groups, and bounce wrong-role users to a 403 page.
 *
 * Real authorization is enforced by Supabase RLS on the data layer; the
 * checks here are UX (don't render the wrong shell, don't tease a page the
 * user can't load) and a defence in depth.
 *
 * If Supabase env vars are missing (dev without `.env.local` filled in) we
 * can't verify a session, so we treat every visitor as logged-out: public
 * routes pass through, protected routes still redirect to /login. This keeps
 * the auth gate demoable before Supabase is wired.
 *
 * NOTE: role lookup currently uses `user_metadata.role`, set on signup.
 * Once we add a `profiles` table with a `role` column we should fetch from
 * there instead - user_metadata is editable by the user themselves.
 * TODO: switch to a server-trusted source for role.
 */
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

type Role = 'student' | 'vendor' | 'admin' | 'super_admin';

// Shared marketplace modules: any signed-in user (student or vendor) can browse
// and transact. The only role difference is the dashboard (/me vs /vendor).
const ALL: Role[] = ['student', 'vendor'];

const PROTECTED_PREFIXES: { prefix: string; roles: Role[] }[] = [
  // /around is the public "home of the full Sync app" per the wireframe -
  // signed-out users land here, so it's deliberately not in the gate list.
  { prefix: '/hostels', roles: ALL },
  // { prefix: '/events', roles: ALL },
  { prefix: '/food', roles: ALL },
  { prefix: '/beauty', roles: ALL },
  { prefix: '/workmanship', roles: ALL },
  { prefix: '/laundry', roles: ALL },
  { prefix: '/hotspots', roles: ALL },
  { prefix: '/search', roles: ALL },
  { prefix: '/checkout', roles: ALL },
  { prefix: '/wallet', roles: ALL },
  // Dashboards - role-specific. This is the only access difference.
  { prefix: '/me', roles: ['student'] },
  { prefix: '/onboarding', roles: ['vendor'] },
  // { prefix: '/vendor', roles: ['vendor'] },
  { prefix: '/landlord', roles: ['vendor'] }, // category-check happens in the page itself
  { prefix: '/admin', roles: ['admin', 'super_admin'] },
];

const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

function redirectToLogin(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const guarded = PROTECTED_PREFIXES.find(({ prefix }) => pathname.startsWith(prefix));

  // Supabase not configured yet → no session can exist → everyone is
  // logged-out. Gate protected routes, let public ones through.
  if (!supabaseConfigured) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[proxy] Supabase env vars missing - treating visitor as logged-out.');
    }
    return guarded ? redirectToLogin(request, pathname) : NextResponse.next({ request });
  }

  const { response, user } = await updateSession(request);
  if (!guarded) return response;

  if (!user) return redirectToLogin(request, pathname);

  const role = (user.user_metadata?.role as Role | undefined) ?? 'student';
  if (!guarded.roles.includes(role)) {
    const url = request.nextUrl.clone();
    url.pathname = '/403';
    return NextResponse.rewrite(url);
  }

  return response;
}

export const config = {
  // Run on every route except Next internals, static assets, the dev
  // design-system page, and webhook endpoints (those authenticate
  // themselves via signature, not session cookies).
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|dev/design-system|api/webhooks|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2)$).*)',
  ],
};
