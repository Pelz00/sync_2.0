/**
 * Server Supabase client - bound to the current request's cookies.
 *
 * Use from RSC pages (in `queries.ts`) and from Server Actions. For auth
 * decisions ALWAYS call `supabase.auth.getUser()` (network-verified) or
 * `getClaims()` (JWT-verified). NEVER trust `getSession()` for authorization
 * - its user object comes straight from the cookie and can be spoofed.
 *
 * If a `setAll` call throws because we're in an RSC (cookies are read-only
 * outside Server Actions / Route Handlers), we swallow it: the session will
 * still be refreshed by middleware on the next request.
 */
import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from an RSC where cookies are read-only.
            // Middleware will refresh the session on the next request.
          }
        },
      },
    },
  );
}
