/**
 * ROUTE: /landlord
 * ACCESS: authenticated vendor (category=landlord)
 * PURPOSE: Landlord dashboard — properties, occupancy, booking requests, monthly earnings, tenant contacts.
 * BUILT HERE: Property cards, occupancy KPI, recent booking-request feed.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { properties, stats } from '@/mock/StatsCard';
import { ArrowRight, ArrowUp, ChevronDown, ChevronUp, Dot, Plus } from 'lucide-react';
import type { Metadata } from 'next';
import { BookingRequestCard } from './(components)/BookingRequestsCard';
import { LandlordChartComponent } from './(components)/LandlordChartComponent';
import { PropertyCard } from './(components)/HostelCards';

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
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-section text-ink font-display mt-2 font-medium">
          {requestsNumber} new requests <span className="text-lime-deep">this week.</span>
        </h2>
        <div>
          <Badge
            variant="accent"
            className="border-ink flex items-center self-start border whitespace-normal sm:self-auto sm:whitespace-nowrap"
          >
            <Dot size={20} />
            Verified landlord
          </Badge>
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1535745318714-da922ca9cc81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww"
              alt="Aisha O."
            />
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
        </div>
      </div>
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
                avatarUrl="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww"
                location="Tanke Crescent"
                timeAgo="2h"
                room="3B"
              />
              <BookingRequestCard
                name="Maryam A."
                avatarUrl="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D"
                location="Tanke Crescent"
                timeAgo="2h"
                room="1A"
              />
              <BookingRequestCard
                name="Muiz O."
                avatarUrl="https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww"
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
              {/* chart content */}
              <CardContent>
                <LandlordChartComponent />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section>
        <h1 className="text-muted mb-2 max-w-xl font-mono text-sm tracking-wide">MY HOSTELS</h1>
        <PropertyCard properties={properties} />
      </section>
    </section>
  );
}
