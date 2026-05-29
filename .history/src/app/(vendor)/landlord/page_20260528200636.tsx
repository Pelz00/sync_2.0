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
      <p className="text-muted max-w-xl text-sm">LANDLORD DASHBOARD</p>
    </section>
  );
}
