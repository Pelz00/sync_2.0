/**
 * ROUTE: /me/events
 * ACCESS: authenticated student
 * PURPOSE: Track events the student is attending (upcoming) and has been to
 * (past). Part of the student tracking hub.
 */
import type { Metadata } from 'next';
import { EventRow } from '../(components)/EventsTickets';
import { studentEvents } from '@/mock/student';

export const metadata: Metadata = { title: 'Events' };

export default function Page() {
  const upcoming = studentEvents.filter((e) => e.status === 'upcoming');
  const past = studentEvents.filter((e) => e.status === 'attended');

  return (
    <section className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-content-muted font-mono text-sm tracking-wide">
          UPCOMING · {upcoming.length}
        </h2>
        <div className="border-line/15 rounded-2xl border border-dashed px-4">
          {upcoming.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-content-muted font-mono text-sm tracking-wide">PAST · {past.length}</h2>
        <div className="border-line/15 rounded-2xl border border-dashed px-4">
          {past.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
