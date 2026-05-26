/**
 * ROUTE: /events/[slug]
 * ACCESS: authenticated student
 * PURPOSE: Event detail + ticket purchase. Cover image, when/where, organiser block, ticket tiers, Paystack inline checkout.
 * BUILT HERE: Hero, tier selector (<RadioGroup>), <QuantityStepper>, organiser <VerifiedBadge>.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Event detail' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/events/[slug]</p>
      <h1 className="font-display text-section text-ink">Event detail</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
