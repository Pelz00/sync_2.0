/**
 * ROUTE: /vendor/promotions
 * ACCESS: authenticated vendor
 * PURPOSE: Boost a listing — featured slot on Around-you / category page. Billed against the vendor's plan.
 * BUILT HERE: Promotion form (listing picker, duration), running promo list.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Promotions' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/vendor/promotions</p>
      <h1 className="font-display text-section text-ink">Promotions</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
