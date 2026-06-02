/**
 * ROUTE: /food/[vendorSlug]
 * ACCESS: authenticated student
 * PURPOSE: Single food vendor - menu, cart, delivery state. Cart lives in Redux (store/slices/cart) until checkout.
 * BUILT HERE: Menu list, <QuantityStepper>, sticky cart summary, <OrderStageTracker> for active orders.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Vendor' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/food/[vendorSlug]</p>
      <h1 className="font-display text-section text-content">Vendor</h1>
      <p className="text-content-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
