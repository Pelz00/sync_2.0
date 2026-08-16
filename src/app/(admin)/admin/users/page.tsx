import type { Metadata } from 'next';
import { getCurrentUser, getProfile } from '@/modules/auth/queries';
import { adminRoleForEmail } from '@/lib/admin-emails';
import { createAdminClient } from '@/lib/supabase/admin';
import { UsersClient } from './user-componenets/UsersClient';

export const metadata: Metadata = { title: 'Users — Admin' };

// This authenticated admin page reads Supabase with the server-only service
// role client. Rendering it per request prevents build-time prerendering from
// requiring production credentials in CI.
export const dynamic = 'force-dynamic';

export type ProfileRow = {
  id: string;
  role: string;
  full_name: string | null;
  vendor_category: string | null;
  verification_status: string;
  archived_at: string | null;
  created_at: string;
};

export default async function Page() {
  const [user, profile] = await Promise.all([getCurrentUser(), getProfile()]);
  const role = profile?.role ?? adminRoleForEmail(user?.email);

  // if (role !== 'admin' && role !== 'super_admin') {
  //   redirect('/403');
  // }

  const isSuperAdmin = role === 'super_admin';

  const admin = createAdminClient();
  const { data: profiles } = await admin
    .from('profiles')
    .select('id, role, full_name, vendor_category, verification_status, archived_at, created_at')
    .order('created_at', { ascending: false });

  const { data: list } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const emailById = new Map((list?.users ?? []).map((u) => [u.id, u.email ?? '—']));

  const rows = ((profiles ?? []) as ProfileRow[]).map((r) => ({
    ...r,
    email: emailById.get(r.id) ?? '—',
  }));

  return <UsersClient rows={rows} isSuperAdmin={isSuperAdmin} />;
}
