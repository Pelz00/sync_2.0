/**
 * ROUTE: /api/profile  (Route Handler - server)
 * The security boundary for client-side profile reads/writes. Clients hit this
 * via RTK Query (src/store/api/profile-api) instead of touching Supabase.
 *
 * Why this is the secure path:
 *   - Auth is verified server-side with `getUser()` (network-verified, not the
 *     spoofable cookie session), and every query is scoped to that user's id.
 *   - The session-bound Supabase client is used, so RLS still applies (defense
 *     in depth) - we are NOT using the service-role key here.
 *   - PATCH whitelists editable columns, so a crafted request can't change
 *     server-trusted fields (role, verification_status, archived_at, …).
 *
 * Route Handlers aren't cached for non-GET, and GET here reads per-user data so
 * it's dynamic by default.
 */
import { createClient } from '@/lib/supabase/server';

/** Columns a user is allowed to change about themselves. */
const UPDATABLE = ['full_name', 'phone'] as const;

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data ?? null);
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Whitelist: silently drop anything that isn't user-editable. This is what
  // stops a client from escalating role / forcing verification_status.
  const patch: Record<string, unknown> = {};
  for (const key of UPDATABLE) {
    if (key in body) patch[key] = body[key];
  }
  if (Object.keys(patch).length === 0) {
    return Response.json({ error: 'No updatable fields provided' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', user.id)
    .select('*')
    .single();
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data);
}
