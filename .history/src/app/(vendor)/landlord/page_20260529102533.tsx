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
        <Card className="border-ink border bg-transparent">
          <CardHeader>
            <CardTitle className="text-muted font-mono tracking-wide">THIS MONTH</CardTitle>
          </CardHeader>
          <CardContent className="text-section font-body text-3xl font-bold">
            <p>₦420,000</p>
            <CardDescription className="mt-3.5 border-transparent">
              <p className="text-lime-deep font-body flex items-center text-sm font-medium">
                <Plus className="size-[15px]" />
                18%
              </p>
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="border-ink border bg-transparent">
          <CardHeader>
            <CardTitle className="text-muted font-mono tracking-wide">OCCUPANCY</CardTitle>
          </CardHeader>
          <CardContent className="">
            <p>₦165,000 / year</p>
            <CardDescription className="mt-3.5 border-transparent">
              <p className="text-lime-deep font-body flex items-center text-sm">
                <ArrowUp className="size-[15px]" />4 rooms
              </p>
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="border-ink border bg-transparent">
          <CardHeader>
            <CardTitle className="text-muted font-mono tracking-wide">BOOKING REQ.</CardTitle>
          </CardHeader>
          <CardContent>
            <p>₦165,000 / year</p>
          </CardContent>
          <CardFooter>
            <p className="text-lime-deep">+ 18%</p>
          </CardFooter>
        </Card>
        <Card className="border-ink border bg-transparent">
          <CardHeader>
            <CardTitle className="text-muted font-mono tracking-wide">LISTING VIEWS</CardTitle>
          </CardHeader>
          <CardContent>
            <p>₦165,000 / year</p>
          </CardContent>
          <CardFooter>
            <p className="text-lime-deep">+ 18%</p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
