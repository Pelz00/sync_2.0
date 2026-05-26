/**
 * ROUTE: /checkout
 * ACCESS: authenticated student
 * PURPOSE: Cart checkout — line items, fees breakdown, Paystack inline payment. Triggers escrow lock on success.
 * BUILT HERE: Line items, totals, delivery address, <Button>Pay with Paystack.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Checkout' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/checkout</p>
      <h1 className="font-display text-section text-ink">Checkout</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
