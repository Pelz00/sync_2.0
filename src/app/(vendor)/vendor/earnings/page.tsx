/**
 * ROUTE: /vendor/earnings
 * ACCESS: authenticated vendor
 * PURPOSE: Earnings dashboard - payouts, pending escrow, Paystack settlement timeline, downloadable statements.
 * BUILT HERE: KPI cards, earnings chart, transaction list, statement download.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Earnings' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/vendor/earnings</p>
      <h1 className="font-display text-section text-ink">Earnings</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
