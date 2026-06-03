/**
 * ROUTE: /admin/users
 * ACCESS: admin / super_admin
 * PURPOSE: User directory + account lifecycle - shows every account incl.
 *          archived (soft-deleted) ones; admins restore on request, super_admins
 *          can permanently purge. Long-archived (>60d) accounts are auto-purged
 *          by /api/cron/purge-archived.
 */
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getProfile } from '@/modules/auth/queries';
import { createAdminClient } from '@/lib/supabase/admin';
import { cn } from '@/lib/utils';
import { UserRowActions } from './user-actions';

export const metadata: Metadata = { title: 'Users' };

type ProfileRow = {
  id: string;
  role: string;
  full_name: string | null;
  vendor_category: string | null;
  verification_status: string;
  archived_at: string | null;
};

export default async function Page() {
  const profile = await getProfile();
  if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
    redirect('/403');
  }
  const isSuperAdmin = profile.role === 'super_admin';

  const admin = createAdminClient();
  const { data: profiles } = await admin
    .from('profiles')
    .select('id, role, full_name, vendor_category, verification_status, archived_at')
    .order('created_at', { ascending: false });
  const { data: list } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const emailById = new Map((list?.users ?? []).map((u) => [u.id, u.email ?? '—']));

  const rows = (profiles ?? []) as ProfileRow[];

  return (
    <section className="flex flex-col gap-4">
      <div>
        <p className="eyebrow text-accent-fg">/admin/users</p>
        <h1 className="font-display text-section text-content mt-1">Users</h1>
        <p className="text-content-muted mt-1 text-sm">
          {rows.length} accounts · archived accounts can be restored
          {isSuperAdmin ? ' or purged' : ' (purge is super-admin only)'}.
        </p>
      </div>

      <div className="border-line/10 overflow-x-auto rounded-2xl border">
        <table className="w-full text-left text-sm">
          <thead className="text-content-muted border-line/10 border-b text-xs">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-line/10 divide-y">
            {rows.map((r) => {
              const archived = Boolean(r.archived_at);
              return (
                <tr key={r.id} className={cn(archived && 'opacity-60')}>
                  <td className="text-content px-4 py-3 font-medium">{r.full_name ?? '—'}</td>
                  <td className="text-content-muted px-4 py-3">{emailById.get(r.id) ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className="text-content capitalize">{r.role.replace('_', ' ')}</span>
                    {r.vendor_category && (
                      <span className="text-content-muted"> · {r.vendor_category}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {archived ? (
                      <span className="text-coral inline-flex items-center gap-1.5 text-xs">
                        Archived {new Date(r.archived_at as string).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-content-muted text-xs capitalize">
                        {r.verification_status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <UserRowActions userId={r.id} archived={archived} canPurge={isSuperAdmin} />
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-content-muted px-4 py-10 text-center text-sm">
                  No accounts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
