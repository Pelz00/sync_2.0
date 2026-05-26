/**
 * ROUTE: /me/profile
 * ACCESS: authenticated student
 * PURPOSE: Profile editing — name, campus, avatar, password change, account deletion.
 * BUILT HERE: <FormSection> groups for each area, server-action save.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Profile' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/me/profile</p>
      <h1 className="font-display text-section text-ink">Profile</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
