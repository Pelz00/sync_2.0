/**
 * ROUTE: /events
 * ACCESS: authenticated student
 * PURPOSE: Events listing — concerts, parties, campus events. Date filter, category chips, grid of cards.
 * BUILT HERE: Date filter, <Chip> categories, event card grid, <Pagination>.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Events' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      {/* Come back later to use the dot icon */}
      <h1 className="text-muted font-mono text-[12px] tracking-[3px]">
        EVENTS . ILORIN . THIS WEEK
      </h1>
      <h2 className="text-section text-ink font-display">
        What's on, <span className="text-lime-deep">this week.</span>
      </h2>
      <p className="text-lime-deep font-display my-12 flex h-full w-full items-center justify-center text-2xl">
        COMING SOON...
      </p>
    </section>
  );
}
