/**
 * Admin (service-role) Supabase client. Bypasses RLS - use ONLY in trusted
 * server code (server actions / admin pages) for privileged operations like
 * archiving/restoring/purging accounts and reading every profile.
 *
 * NEVER import this into a client component. The service-role key is server-only.
 */
import 'server-only';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export function createAdminClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVER_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
