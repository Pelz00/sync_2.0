/**
 * ROUTE: /landlord
 * ACCESS: authenticated vendor (category=landlord)
 * PURPOSE: Landlord dashboard — properties, occupancy, booking requests, monthly earnings, tenant contacts.
 * BUILT HERE: Property cards, occupancy KPI, recent booking-request feed.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { stats } from '@/mock/StatsCard';
import { ArrowRight, ArrowUp, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Landlord dashboard' };

interface BookingRequestCardProps {
  name: string;
  location: string;
  room: string;
  timeAgo: string;
  avatarUrl?: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function Page() {
  const requestsNumber = 8;

  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-muted max-w-xl font-mono text-sm tracking-wide">LANDLORD DASHBOARD</h1>
      <h2 className="text-section text-ink font-display mt-2 font-medium">
        {requestsNumber} new requests <span className="text-lime-deep">this week.</span>
      </h2>
      {/* New section for stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map(({ label, value, sub, icon: Icon }) => (
          <Card key={label} className="border-ink border bg-transparent">
            <CardHeader>
              <CardTitle className="text-muted font-mono tracking-wide">{label}</CardTitle>
            </CardHeader>
            <CardContent className="text-section font-body text-3xl font-bold">
              <p>{value}</p>
              <CardDescription className="mt-3.5 border-transparent">
                <p className="text-lime-deep font-body flex items-center gap-1 text-sm font-medium">
                  {Icon && <Icon className="size-3.75" />}
                  {sub}
                </p>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* PENDING BOOKING REQUESTS SECTION */}
      <section className="mt-5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* PENDING BOOKING REQUESTS */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-muted text-body font-mono">
                PENDING BOOKING REQUESTS . {requestsNumber}
              </h2>
              <Button variant={'outline'} className="text-muted border-transparent font-light">
                View all <ArrowRight />
              </Button>
            </div>
            {/* booking requests content */}
            <BookingRequestCard
              name="Aisha 0."
              location="Tanke Crescent"
              timeAgo="2h"
              onAccept={() => {}}
              onDecline={() => {}}
              room="3B"
            />
          </div>

          {/* STATISTICS CHART */}
          <div className="flex-1">
            <Card className="border-ink mb-4 h-full border bg-transparent">
              <CardHeader>
                <CardTitle className="text-muted flex items-center justify-between font-mono tracking-wide">
                  <p>REVENUE . LAST 12 WEEKS</p>
                  <Button
                    variant={'outline'}
                    className="gap-1text-muted mt-2 flex items-center border-transparent font-light"
                  >
                    Weekly
                    <ChevronDown className="size-3.75" />
                  </Button>
                </CardTitle>
              </CardHeader>
            </Card>
            {/* chart content */}
          </div>
        </div>
      </section>
    </section>
  );
}

function BookingRequestCard({
  name,
  location,
  room,
  timeAgo,
  avatarUrl,
  onAccept,
  onDecline,
}: BookingRequestCardProps) {
  return (
    <Card className="flex items-center justify-between px-5 py-4">
      {/* Avatar + Info */}
      <div className="flex items-center gap-4">
        <div className="bg-ink/10 size-10 shrink-0 overflow-hidden rounded-full">
          {avatarUrl ? <img src={avatarUrl} alt={name} className="size-full object-cover" /> : null}
        </div>
        <div>
          <h1 className="font-display text-card leading-tight font-semibold">{name}</h1>
          <p className="text-muted text-sm">
            {location} · {room} · {timeAgo}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline" onClick={onDecline}>
          Decline
        </Button>
        <Button
          onClick={onAccept}
          className="text-ink border-ink rounded-full border bg-[#CAFF4D] font-semibold hover:bg-[#b8f030]"
        >
          Accept <ArrowRight className="ml-1 size-4" />
        </Button>
      </div>
    </Card>
  );
}
