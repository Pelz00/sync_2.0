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
 * Role for the gate comes from the server-trusted `profiles.role` (resolved in
 * updateSession), with an env admin-allowlist fallback - never the editable
 * `user_metadata`, so a user can't self-assign a role to reach /admin.
 */
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { isReservedHandle, resolveHandle } from '@/lib/handle';

type Role = 'student' | 'vendor' | 'admin' | 'super_admin';

// Shared marketplace modules: any signed-in user can browse and transact. The
// only role difference is the dashboard (/me vs /vendor vs /admin).
const ALL: Role[] = ['student', 'vendor', 'admin', 'super_admin'];

const PROTECTED_PREFIXES: { prefix: string; roles: Role[] }[] = [
  // /around is the public "home of the full Sync app" per the wireframe -
  // signed-out users land here, so it's deliberately not in the gate list.
  { prefix: '/hostels', roles: ALL },
  { prefix: '/events', roles: ALL },
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
  { prefix: '/vendor', roles: ['vendor'] },
  { prefix: '/landlord', roles: ['vendor'] }, // category-check happens in the page itself
  // { prefix: '/admin', roles: ['admin', 'super_admin'] },
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
  const segments = pathname.split('/').filter(Boolean);
  const firstSeg = segments[0];
  const guarded = PROTECTED_PREFIXES.find(({ prefix }) => pathname.startsWith(prefix));

  // Supabase not configured yet → no session can exist → everyone is
  // logged-out. Gate protected routes, let public ones through.
  if (!supabaseConfigured) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[proxy] Supabase env vars missing - treating visitor as logged-out.');
    }
    return guarded ? redirectToLogin(request, pathname) : NextResponse.next({ request });
  }

  const { response, user, role: trustedRole } = await updateSession(request);

  // Personalised dashboard handles: /<handle>/<page> → the real /me or /vendor
  // page, but ONLY when <handle> is the signed-in user's own handle (private).
  // Non-handle / unknown segments fall through and Next renders 404 as usual.
  if (firstSeg && !isReservedHandle(firstSeg)) {
    if (user) {
      const meta = user.user_metadata ?? {};
      const role = (meta.role as Role | undefined) ?? 'student';
      const handle = resolveHandle({
        role,
        full_name: meta.full_name as string | undefined,
        business_name: meta.business_name as string | undefined,
        email: user.email,
      });
      const base =
        role === 'student'
          ? '/me'
          : role === 'vendor'
            ? meta.vendor_category === 'landlord'
              ? '/landlord'
              : '/vendor'
            : null;
      if (handle && base && firstSeg === handle) {
        const rest = segments.slice(1).join('/');
        const url = request.nextUrl.clone();
        url.pathname = rest ? `${base}/${rest}` : base;
        const rewritten = NextResponse.rewrite(url, { request });
        // Carry over the refreshed Supabase auth cookies onto the rewrite.
        response.cookies.getAll().forEach((c) => rewritten.cookies.set(c));
        return rewritten;
      }
    }
    return response;
  }

  if (!guarded) return response;

  if (!user) return redirectToLogin(request, pathname);

  // Server-trusted role (profiles.role / admin allowlist), not the editable
  // user_metadata - so a user can't self-assign a role to reach /admin.
  const role = (trustedRole as Role | undefined) ?? 'student';
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
