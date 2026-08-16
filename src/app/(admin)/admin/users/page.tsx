import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
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

async function getAuthUsers() {
  const admin = createAdminClient();
  const users = [];

  for (let page = 1; page <= 100; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(`Unable to load users: ${error.message}`);

    users.push(...data.users);
    if (data.users.length < 1000) break;
  }

  return users;
}

export default async function Page() {
  const [user, profile] = await Promise.all([getCurrentUser(), getProfile()]);
  const role = adminRoleForEmail(user?.email) ?? profile?.role;

  if (role !== 'admin' && role !== 'super_admin') {
    redirect('/403');
  }

  const isSuperAdmin = role === 'super_admin';

  const admin = createAdminClient();
  const [{ data: profiles, error: profilesError }, authUsers] = await Promise.all([
    admin
      .from('profiles')
      .select('id, role, full_name, vendor_category, verification_status, archived_at, created_at')
      .order('created_at', { ascending: false }),
    getAuthUsers(),
  ]);

  if (profilesError) throw new Error(`Unable to load user profiles: ${profilesError.message}`);

  const emailById = new Map(authUsers.map((authUser) => [authUser.id, authUser.email ?? '—']));

  const rows = ((profiles ?? []) as ProfileRow[]).map((r) => ({
    ...r,
    email: emailById.get(r.id) ?? '—',
  }));

  return <UsersClient rows={rows} isSuperAdmin={isSuperAdmin} />;
}
