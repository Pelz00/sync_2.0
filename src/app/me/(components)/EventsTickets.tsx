/**
 * Events & tickets building blocks for the student tracking hub. EventRow and
 * TicketCard are shared between the dashboard summary (this file's
 * <EventsTicketsSummary>) and the dedicated /me/events and /me/tickets pages.
 */
import { ArrowRight, CalendarDays, MapPin, TicketIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  studentEvents,
  studentTickets,
  type StudentEvent,
  type StudentTicket,
} from '@/mock/student';

function naira(n: number) {
  return n === 0 ? 'Free' : `₦${n.toLocaleString('en-NG')}`;
}

export function EventRow({ event }: { event: StudentEvent }) {
  const upcoming = event.status === 'upcoming';
  return (
    <div className="border-line/10 flex items-center gap-3 border-b border-dashed py-3 last:border-b-0">
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-xl',
          upcoming ? 'bg-lime/15 text-accent-fg' : 'bg-ink/5 text-content-muted',
        )}
      >
        <CalendarDays className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-content truncate text-sm font-medium">{event.name}</p>
          <Badge variant={upcoming ? 'accent' : 'neutral'}>
            {upcoming ? 'Upcoming' : 'Attended'}
          </Badge>
        </div>
        <p className="text-content-muted mt-0.5 flex items-center gap-1 text-xs">
          <MapPin className="size-3.5 shrink-0" />
          {event.venue} · {event.date} · {event.time}
        </p>
      </div>
    </div>
  );
}

export function TicketCard({ ticket }: { ticket: StudentTicket }) {
  const valid = ticket.status === 'valid';
  return (
    <div className="border-line/15 flex items-center gap-4 rounded-2xl border border-dashed p-4">
      <span
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-xl',
          valid ? 'bg-lime/15 text-accent-fg' : 'bg-ink/5 text-content-muted',
        )}
      >
        <TicketIcon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-content truncate text-sm font-medium">{ticket.eventName}</p>
          <Badge variant={valid ? 'accent' : 'neutral'}>{valid ? 'Valid' : 'Used'}</Badge>
        </div>
        <p className="text-content-muted mt-0.5 text-xs">
          {ticket.date} · {ticket.venue} · {ticket.type}
        </p>
        <p className="text-content-muted mt-1 font-mono text-[11px] tracking-wide">
          REF {ticket.reference}
        </p>
      </div>
      <p className="text-content shrink-0 text-sm font-semibold">{naira(ticket.price)}</p>
    </div>
  );
}

/** Compact dashboard section: a few upcoming events + held tickets. */
export function EventsTicketsSummary({ basePath = '/me' }: { basePath?: string }) {
  const upcomingEvents = studentEvents.filter((e) => e.status === 'upcoming').slice(0, 3);
  const heldTickets = studentTickets.filter((t) => t.status === 'valid').slice(0, 2);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* Upcoming events */}
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-content-muted font-mono text-sm tracking-wide">UPCOMING EVENTS</h2>
          <Button asChild variant="outline" className="text-content-muted border-none">
            <Link href={`${basePath}/events`}>
              View all <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
        <div className="border-line/15 rounded-2xl border border-dashed px-4">
          {upcomingEvents.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Held tickets */}
      <div className="w-full shrink-0 lg:w-80">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-content-muted font-mono text-sm tracking-wide">MY TICKETS</h2>
          <Button asChild variant="outline" className="text-content-muted border-none">
            <Link href={`${basePath}/tickets`}>
              View all <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {heldTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}
