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
  const requestsNumber = 8;
  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-muted max-w-xl font-mono text-sm tracking-wide">LANDLORD DASHBOARD</h1>
      <h2 className="text-section text-ink font-display mt-[8px] font-medium">
        {requestsNumber} new requests <span className="text-lime-deep">this week.</span>
      </h2>
    </section>
  );
}
