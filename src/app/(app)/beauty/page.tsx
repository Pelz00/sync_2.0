/**
 * ROUTE: /beauty
 * ACCESS: authenticated student
 * PURPOSE: Beauty professionals directory — stylists, nail techs, barbers. Filter by service type.
 * BUILT HERE: Service-type <Chip>s, <ListingCard> grid.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Beauty' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/beauty</p>
      <h1 className="font-display text-section text-ink">Beauty</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
