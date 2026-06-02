/**
 * ROUTE: /vendor/plan
 * ACCESS: authenticated vendor
 * PURPOSE: Current plan + upgrade flow. Plans are paid via Paystack recurring.
 * BUILT HERE: <PlanCard> grid, current-plan callout, upgrade/downgrade actions.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Plan' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/vendor/plan</p>
      <h1 className="font-display text-section text-content">Plan</h1>
      <p className="text-content-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
