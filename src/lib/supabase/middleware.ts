/**
 * Supabase session refresh - called from the top-level middleware.ts on
 * every navigation. Refreshes the auth token if it's expired and forwards
 * the response with up-to-date cookies attached.
 *
 * Also exposes the authenticated user (or `null`) so the caller can make
 * role-based routing decisions before the page renders.
 */
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: never trust getSession() for auth - it doesn't hit Supabase
  // and the cookie could be spoofed. getUser() verifies with the Auth server.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
