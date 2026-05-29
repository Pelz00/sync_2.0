/**
 * ROUTE: /landlord
 * ACCESS: authenticated vendor (category=landlord)
 * PURPOSE: Landlord dashboard — properties, occupancy, booking requests, monthly earnings, tenant contacts.
 * BUILT HERE: Property cards, occupancy KPI, recent booking-request feed.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Landlord dashboard' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/landlord</p>
      <h1 className="font-display text-section text-ink">Landlord dashboard</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
