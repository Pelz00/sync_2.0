/**
 * ROUTE: /vendor/earnings
 * ACCESS: authenticated vendor
 * PURPOSE: Earnings dashboard - payouts, pending escrow, Paystack settlement timeline, downloadable statements.
 * BUILT HERE: KPI cards, earnings chart, transaction list, statement download.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';
import EarningsPage from './(components)/EarningsPage';

export const metadata: Metadata = { title: 'Earnings' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <EarningsPage />
    </section>
  );
}
