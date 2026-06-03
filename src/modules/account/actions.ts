/**
 * Account lifecycle server actions.
 *
 * Accounts are never hard-deleted on request: "deleting" archives the profile
 * (data retained for auditing). A user un-archives simply by logging in again
 * (handled in modules/auth signIn). Admins can restore on request; only a
 * super_admin can permanently purge an account off the system.
 *
 * All privileged writes go through the service-role client (bypasses RLS), and
 * role/verification are server-controlled (clients can't change them).
 */
'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

type Result = { ok: true } | { ok: false; error: string };

/** The signed-in caller's id + trusted role (from the profiles table). */
async function caller(): Promise<{ id: string; role: string } | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('profiles').select('role').eq('id', user.id).maybeSingle();
  return { id: user.id, role: (data?.role as string | undefined) ?? 'student' };
}

const isAdmin = (role: string) => role === 'admin' || role === 'super_admin';

/** Self-service "delete my account" → archive (soft delete) + sign out. */
export async function archiveAccount(reason?: string): Promise<Result> {
  const c = await caller();
  if (!c) return { ok: false, error: 'You need to be signed in.' };

  const admin = createAdminClient();
  const { error } = await admin
    .from('profiles')
    .update({ archived_at: new Date().toISOString(), archived_reason: reason ?? null })
    .eq('id', c.id);
  if (error) return { ok: false, error: error.message };

  const supabase = await createClient();
  await supabase.auth.signOut();
  return { ok: true };
}

/** Admin (or super_admin) restores an archived account on request. */
export async function restoreAccount(userId: string): Promise<Result> {
  const c = await caller();
  if (!c || !isAdmin(c.role)) return { ok: false, error: 'Not authorized.' };

  const admin = createAdminClient();
  const { error } = await admin
    .from('profiles')
    .update({ archived_at: null, archived_reason: null })
    .eq('id', userId);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Super-admin only: permanently purge an account off the system (irreversible).
 *  Hard-deletes the auth user; the profile row cascades away. */
export async function purgeAccount(userId: string): Promise<Result> {
  const c = await caller();
  if (!c || c.role !== 'super_admin') {
    return { ok: false, error: 'Only a super admin can purge an account.' };
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
