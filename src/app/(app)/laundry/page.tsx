/**
 * ROUTE: /laundry
 * ACCESS: authenticated student
 * PURPOSE: Laundry vendor list + pickup scheduler. Pick a vendor, choose pickup/dropoff times, pay on completion (escrow).
 * BUILT HERE: Vendor cards, slot picker, address form.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Laundry' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/laundry</p>
      <h1 className="font-display text-section text-ink">Laundry</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
