/**
 * ROUTE: /food
 * ACCESS: authenticated student
 * PURPOSE: Food vendor directory. Filters: cuisine, delivery vs pickup, rating. Each card opens that vendor's menu.
 * BUILT HERE: Cuisine <Chip> row, <ListingCard> grid pointing at /food/[vendorSlug].
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Food' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/food</p>
      <h1 className="font-display text-section text-ink">Food</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
