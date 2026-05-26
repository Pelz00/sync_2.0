/**
 * ROUTE: /hostels/[slug]
 * ACCESS: authenticated student
 * PURPOSE: Hostel detail + booking flow. Gallery, amenities, location, reviews, and a sticky booking sidebar (rent + caution + 5% Sync verified-listing fee → Paystack escrow).
 * BUILT HERE: <ImageGallery>, amenities grid, <MapPlaceholder>, <ReviewCard> list, booking sidebar.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Hostel detail' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/hostels/[slug]</p>
      <h1 className="font-display text-section text-ink">Hostel detail</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
