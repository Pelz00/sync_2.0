/**
 * BookingsTracker - the student's hostel bookings with a countdown to when each
 * one ends (or to move-in for upcoming ones). This is the core "track the
 * hostels I collected and when they end" surface. Card-per-booking with a
 * status badge + days-left pill.
 */
import { ArrowRight, CalendarClock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge, Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import { studentBookings, type BookingStatus, type StudentBooking } from '@/mock/student';

const STATUS: Record<
  BookingStatus,
  { label: string; variant: 'accent' | 'warning' | 'neutral' | 'outline'; countdown: string }
> = {
  active: { label: 'Active', variant: 'accent', countdown: 'Ends in' },
  awaiting: { label: 'Awaiting landlord', variant: 'warning', countdown: 'Move-in in' },
  ending_soon: { label: 'Ending soon', variant: 'warning', countdown: 'Ends in' },
  upcoming: { label: 'Upcoming', variant: 'neutral', countdown: 'Move-in in' },
  completed: { label: 'Completed', variant: 'outline', countdown: 'Ended' },
};

function naira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

/** Single booking row - reused by the dashboard tracker and /me/bookings. */
export function BookingCard({ booking: b }: { booking: StudentBooking }) {
  const status = STATUS[b.status];
  const done = b.status === 'completed';
  return (
    <Card className="border-line/10 flex flex-col gap-4 border bg-transparent p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl sm:w-28">
        <Image src={b.image} alt={b.property} fill className="object-cover" sizes="112px" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-content text-sm font-medium">
            {b.property} · {b.room}
          </p>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
        <p className="text-content-muted mt-1 flex items-center gap-1 text-xs">
          <MapPin className="size-3.5 shrink-0" />
          {b.area} · {naira(b.pricePerSession)}/session
        </p>
        <p className="text-content-muted mt-1 font-mono text-[11px] tracking-wide">
          MOVE-IN {b.moveIn.toUpperCase()} · ENDS {b.endDate.toUpperCase()}
        </p>
      </div>

      {/* Countdown pill */}
      <div
        className={cn(
          'flex shrink-0 items-center gap-2 self-start rounded-xl px-3 py-2 sm:self-center',
          done
            ? 'bg-ink/5 text-content-muted'
            : b.status === 'ending_soon' || b.status === 'awaiting'
              ? 'bg-coral/10 text-coral'
              : 'bg-lime/15 text-accent-fg',
        )}
      >
        <CalendarClock className="size-4 shrink-0" />
        <div className="leading-tight">
          <p className="text-[10px] font-medium uppercase opacity-80">{status.countdown}</p>
          <p className="text-sm font-semibold">{done ? b.endDate : `${b.daysLeft} days`}</p>
        </div>
      </div>
    </Card>
  );
}

export function BookingsTracker({ basePath = '/me' }: { basePath?: string }) {
  return (
    <div className="flex flex-col gap-3">
      {studentBookings.map((b) => (
        <BookingCard key={b.id} booking={b} />
      ))}

      <Button asChild variant="outline" className="text-content-muted self-start border-none">
        <Link href={`${basePath}/bookings`}>
          View all bookings <ArrowRight className="ml-1 size-4" />
        </Link>
      </Button>
    </div>
  );
}
