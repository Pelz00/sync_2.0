/**
 * ROUTE: /vendor/plan
 * ACCESS: authenticated vendor
 * PURPOSE: Current plan + upgrade flow. Plans are paid via Paystack recurring.
 * BUILT HERE: <PlanCard> grid, current-plan callout, upgrade/downgrade actions.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';
import PlanPage from './(components)/PlanPage';

export const metadata: Metadata = { title: 'Plan' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <PlanPage />
    </section>
  );
}
