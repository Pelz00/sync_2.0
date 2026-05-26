/**
 * ROUTE: /me
 * ACCESS: authenticated student
 * PURPOSE: Student dashboard hub — quick links to bookings, saved, messages, profile.
 * BUILT HERE: Welcome header, stat cards, recent activity feed.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Account' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/me</p>
      <h1 className="font-display text-section text-ink">Account</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
