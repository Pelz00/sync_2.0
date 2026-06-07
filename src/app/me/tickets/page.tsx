/**
 * ROUTE: /me/tickets
 * ACCESS: authenticated student
 * PURPOSE: The student's event tickets - valid (still usable) and used. Part of
 * the student tracking hub.
 */
import type { Metadata } from 'next';
import { TicketCard } from '../(components)/EventsTickets';
import { studentTickets } from '@/mock/student';

export const metadata: Metadata = { title: 'Tickets' };

export default function Page() {
  const valid = studentTickets.filter((t) => t.status === 'valid');
  const used = studentTickets.filter((t) => t.status === 'used');

  return (
    <section className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-content-muted font-mono text-sm tracking-wide">
          VALID · {valid.length}
        </h2>
        <div className="flex flex-col gap-3">
          {valid.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-content-muted font-mono text-sm tracking-wide">USED · {used.length}</h2>
        <div className="flex flex-col gap-3">
          {used.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
}
