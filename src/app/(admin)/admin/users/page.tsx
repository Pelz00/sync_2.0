/**
 * ROUTE: /admin/users
 * ACCESS: admin only
 * PURPOSE: Student user directory — moderation actions (warn, suspend, ban) and account lookups.
 * BUILT HERE: Search, filterable table, moderation actions.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Users' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/admin/users</p>
      <h1 className="font-display text-section text-ink">Users</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
