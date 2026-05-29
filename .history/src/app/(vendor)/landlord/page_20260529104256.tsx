/**
 * ROUTE: /landlord
 * ACCESS: authenticated vendor (category=landlord)
 * PURPOSE: Landlord dashboard — properties, occupancy, booking requests, monthly earnings, tenant contacts.
 * BUILT HERE: Property cards, occupancy KPI, recent booking-request feed.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { stats } from '@/mock/StatsCard';
import { ArrowUp, Plus } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Landlord dashboard' };

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
                  {Icon && <Icon className="size-[15px]" />}
                  {sub}
                </p>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* PENDING BOOKING REQUESTS SECTION */}
      <section className="mt-8">
        <h2 className="text-ink mb-4 text-2xl font-bold">Pending Booking Requests</h2>
      </section>
    </section>
  );
}
