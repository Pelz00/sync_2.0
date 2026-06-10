/**
 * ROUTE: /vendor
 * ACCESS: authenticated vendor
 * PURPOSE: Vendor dashboard overview — KPIs, latest orders, unread inbox count, plan status, verification status.
 * BUILT HERE: KPI <Card>s, recent orders table, <VerifiedBadge> banner if pending.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { ArrowRight, ChevronDown, Dot, Megaphone } from 'lucide-react';
import type { Metadata } from 'next';
import { BookingRequestCard } from './(components)/BookingRequestsCard';
import { VendorChartComponent } from './(components)/VendorChartComponent';
import { ProductsCard } from './(components)/ProductsCard';
import { bookingRequests, earningsSummary, foodProducts, vendorStats } from '@/mock/vendor';
import Link from 'next/link';
import EarningsSummaryCard from './(components)/EarningsSummaryCard';
import { getDashboardProfile } from '@/components/layouts/dashboard-profile';
import { RevenueChart } from './(components)/RevenueChart';
import { mockData } from '@/mock/chart';
import EarningsChart from './(components)/EarningChart';

export const metadata: Metadata = { title: 'Vendor dashboard' };

export default async function Page() {
  const requestsNumber = 8;
  const profile = await getDashboardProfile('vendor');
  const storeName = profile.metaValue ?? 'your store';
  const verified = profile.eyebrow === 'Verified vendor';

  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-content-muted max-w-xl font-mono text-sm tracking-wide">
        VENDOR DASHBOARD . {storeName.toUpperCase()}
      </h1>
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-section text-content font-display mt-2 font-medium">
          {requestsNumber} new <span className="text-lime-deep">orders.</span>
        </h2>
        <div className="">
          <div className="flex items-center gap-3">
            {verified ? (
              <Badge
                variant="accent"
                className="border-line flex items-center self-start border whitespace-normal sm:self-auto sm:whitespace-nowrap"
              >
                <Dot size={20} />
                Verified Vendor
              </Badge>
            ) : (
              <Badge
                variant="accent"
                className="border-line flex items-center self-start border whitespace-normal sm:self-auto sm:whitespace-nowrap"
              >
                <Dot size={20} />
                Verify your store
              </Badge>
            )}
            <Avatar className="size-10">
              <AvatarFallback>{profile.initial}</AvatarFallback>
            </Avatar>
          </div>
          <Link href={'/vendor/promotions'}>
            <Button className="mt-4 flex items-center gap-2">
              <Megaphone />
              ADVERTISE NOW
            </Button>
          </Link>
        </div>
      </div>
      {/* New section for stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {vendorStats.map(({ label, value, sub, icon: Icon }) => (
          <Card key={label} className="border-line/10 bg-transparent shadow-2xl">
            <CardHeader>
              <CardTitle className="text-content-muted font-mono tracking-wide">{label}</CardTitle>
            </CardHeader>
            <CardContent className="text-section font-body text-3xl font-bold">
              <p>{value}</p>
              <CardDescription className="mt-3.5 border-transparent">
                <span className="text-lime-deep font-body flex items-center gap-1 text-sm font-medium">
                  {Icon && <Icon className="size-3.75" />}
                  {sub}
                </span>
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
              <h2 className="text-content-muted text-body font-mono capitalize">
                PENDING ORDERS . {requestsNumber}
              </h2>
              <Link href={'/vendor/orders'}>
                <Button
                  variant={'outline'}
                  className="text-content-muted border-transparent font-light"
                >
                  View all <ArrowRight />
                </Button>
              </Link>
            </div>
            {/* booking requests content */}
            <div className="flex flex-col gap-4">
              <BookingRequestCard key={bookingRequests[0]?.orderId} data={bookingRequests} />
            </div>
          </div>

          {/* STATISTICS CHART */}
          <div className="flex-1">
            <Card className="border-cream-deep mb-4 h-full border bg-transparent">
              <CardHeader>
                <CardTitle className="text-content-muted flex items-center justify-between font-mono tracking-wide">
                  <p>REVENUE . LAST 12 WEEKS</p>
                  <Button
                    variant={'outline'}
                    className="text-content-muted mt-2 flex items-center gap-1 border-transparent font-light"
                  >
                    Weekly
                    <ChevronDown className="size-3.75" />
                  </Button>{' '}
                </CardTitle>
              </CardHeader>
              {/* chart content */}
              <CardContent>
                <VendorChartComponent />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="flex items-start gap-4 lg:gap-8">
        <div className="flex-1">
          <h1 className="text-content-muted mb-2 max-w-xl flex-1 font-mono text-sm tracking-wide">
            BEST SELLING FOOD
          </h1>
          <EarningsChart />
        </div>
        <div>
          {/* EARNINGS SUMMARY */}
          <h1 className="text-content-muted mb-2 max-w-xl flex-1 font-mono text-sm tracking-wide">
            MY EARNINGS
          </h1>
          <EarningsSummaryCard data={earningsSummary[0]} />
        </div>
      </section>
      <section>
        <h1 className="text-content-muted mb-2 max-w-xl flex-1 font-mono text-sm tracking-wide">
          MY PRODUCTS
        </h1>
        <ProductsCard products={foodProducts} />
      </section>
    </section>
  );
}
