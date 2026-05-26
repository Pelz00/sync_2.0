/**
 * ROUTE: /search
 * ACCESS: authenticated student
 * PURPOSE: Global search results across all modules. Query comes from ?q= URL param.
 * BUILT HERE: Tabs per module, grouped result cards, empty state on no-match.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Search' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/search</p>
      <h1 className="font-display text-section text-ink">Search</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
