/**
 * ROUTE: /me/reviews
 * ACCESS: authenticated student
 * PURPOSE: Reviews the student has left, and prompts to leave reviews on completed bookings.
 * BUILT HERE: Tabs: 'To review' / 'Posted'. <ReviewCard> list, inline rating form.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'My reviews' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/me/reviews</p>
      <h1 className="font-display text-section text-ink">My reviews</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
