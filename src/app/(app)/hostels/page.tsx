/**
 * ROUTE: /hostels
 * ACCESS: authenticated student
 * PURPOSE: Hostel browse - filters (price, type, distance from campus, amenities) and a grid of <ListingCard>s. Server-fetched via modules/hostels/queries.ts.
 * BUILT HERE: <FilterPanel>, <ListingCard> grid, <Pagination>, <EmptyState>.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Hostels' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/hostels</p>
      <h1 className="font-display text-section text-content">Hostels</h1>
      <p className="text-content-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
