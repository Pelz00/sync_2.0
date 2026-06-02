/**
 * Server-side auth reads for the 'auth' module.
 * RSC pages call these to personalise based on the signed-in user.
 */
import 'server-only';
import { cache } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

const configured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

/**
 * The current signed-in user, or null. Always uses `getUser()` (verified),
 * never `getSession()`. Safe before Supabase is configured - returns null so
 * public pages render their signed-out state.
 *
 * Wrapped in React `cache()` so the per-request result is memoised: the header,
 * layout, and page all share a single Supabase call instead of one each.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  if (!configured) return null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
});

/** Best-effort first name: metadata full_name/name, else the email local part. */
export function getFirstName(user: User | null): string | null {
  if (!user) return null;
  const meta = user.user_metadata ?? {};
  const full = (meta.full_name as string | undefined) ?? (meta.name as string | undefined);
  if (full?.trim()) return full.trim().split(/\s+/)[0];
  if (user.email) return user.email.split('@')[0];
  return null;
}
