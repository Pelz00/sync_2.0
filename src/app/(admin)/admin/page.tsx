/**
 * ROUTE: /admin
 * ACCESS: admin only
 * PURPOSE: Admin overview - pending verifications, escrow balance, GMV, recent disputes.
 * BUILT HERE: KPI cards, queue counts, recent-activity feed.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin overview' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/admin</p>
      <h1 className="font-display text-section text-content">Admin overview</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
