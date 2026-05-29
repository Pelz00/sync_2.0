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
import { BookingRequestCard } from './(components)/BookingRequestsCard';

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

  const onAccept = () => {};
  const onDecline = () => {};
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
            <div className="flex flex-col gap-4">
              <BookingRequestCard
                name="Aisha 0."
                location="Tanke Crescent"
                timeAgo="2h"
                room="3B"
              />
              <BookingRequestCard
                name="Maryam A"
                location="Tanke Crescent"
                timeAgo="2h"
                room="3B"
              />
              <BookingRequestCard
                name="Sadiq O."
                location="Tanke Crescent"
                timeAgo="2h"
                room="3B"
              />
            </div>
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
