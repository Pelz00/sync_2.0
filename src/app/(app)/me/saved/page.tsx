/**
 * ROUTE: /me/saved
 * ACCESS: authenticated student
 * PURPOSE: Saved listings across all modules.
 * BUILT HERE: <ListingCard> grid filtered to current user's saves, <EmptyState> on empty.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Saved' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/me/saved</p>
      <h1 className="font-display text-section text-ink">Saved</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
