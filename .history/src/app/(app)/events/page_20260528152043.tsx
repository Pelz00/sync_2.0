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
      {/* Come back later to user the dot icon */}
      <h1 className="text-muted font-mono text-sm tracking-[3px]">EVENTS . ILORIN . THIS WEEK</h1>
      <h2 className="text-section text-ink font-display">
        What's on, <span className="text-lime-deep">this week.</span>
      </h2>
    </section>
  );
}

//  <p className="eyebrow text-lime-deep">/events</p>
//     <h1 className="font-display text-section text-ink">Events</h1>
//     <p className="text-muted max-w-xl text-sm">
//       Placeholder — see the route header above for what gets built here.
//     </p>
