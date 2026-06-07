/**
 * ROUTE: /me/profile
 * ACCESS: authenticated student
 * PURPOSE: Profile editing - name + phone, via the secure RTK Query → /api/profile
 * path (route handler enforces auth + field whitelist; Supabase is never hit
 * from the client). Role + verification status are shown read-only.
 */
import type { Metadata } from 'next';
import { ProfileForm } from './(components)/profile-form';

export const metadata: Metadata = { title: 'Profile' };

export default function Page() {
  return (
    <section className="flex flex-col gap-6">
      <ProfileForm />
    </section>
  );
}
