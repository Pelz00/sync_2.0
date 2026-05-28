/**
 * Browser Supabase client.
 *
 * Use this from any `'use client'` component or hook that needs Supabase
 * (e.g. realtime channel subscriptions in messaging/notifications). Reads/
 * writes auth cookies via the browser; safe to call many times - the
 * underlying client is internally singleton-ed by `@supabase/ssr`.
 *
 * For server-side data fetching use `@/lib/supabase/server` instead - RSC
 * pages should never reach for the browser client.
 */
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
