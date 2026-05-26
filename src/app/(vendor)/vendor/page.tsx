/**
 * ROUTE: /vendor
 * ACCESS: authenticated vendor
 * PURPOSE: Vendor dashboard overview — KPIs, latest orders, unread inbox count, plan status, verification status.
 * BUILT HERE: KPI <Card>s, recent orders table, <VerifiedBadge> banner if pending.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Vendor dashboard' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/vendor</p>
      <h1 className="font-display text-section text-ink">Vendor dashboard</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
