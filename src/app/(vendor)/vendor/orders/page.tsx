/**
 * ROUTE: /vendor/orders
 * ACCESS: authenticated vendor
 * PURPOSE: Orders queue with status flow (new → accepted → in progress → completed → paid out).
 * BUILT HERE: <Tabs> per status, order rows, <OrderStageTracker>, accept/reject actions.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Orders' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/vendor/orders</p>
      <h1 className="font-display text-section text-content">Orders</h1>
      <p className="text-content-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
