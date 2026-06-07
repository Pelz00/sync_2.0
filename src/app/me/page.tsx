import { Button } from '@/components/ui';
import { ArrowRight, Star, MessageCircle, Check, Search, Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookingBillboard } from './(components)/BillboardComponent';
import { HostelCardList } from './(components)/HostelCard';
import { UsageSummary } from './(components)/UsageSummary';
import { BookingsTracker } from './(components)/BookingsTracker';
import { EventsTicketsSummary } from './(components)/EventsTickets';
import { getDashboardProfile } from '@/components/layouts/dashboard-profile';
import { hostels } from '@/mock/hostels';

export const metadata: Metadata = { title: 'Dashboard' };

const recentActivity = [
  { id: '1', icon: Star, label: 'You saved Pipeline Court', time: '2h ago' },
  { id: '2', icon: MessageCircle, label: 'Mama Yetunde replied', time: 'Yesterday' },
  { id: '3', icon: Check, label: 'Booking request sent', time: 'Yesterday' },
  { id: '4', icon: Search, label: '3 new hostels match your search', time: '2d ago' },
];

export default async function Page() {
  const profile = await getDashboardProfile('student');
  const studentName = profile.name;
  const base = profile.handle ? `/${profile.handle}` : '/me';
  const savedCount = 12;

  return (
    <section className="flex flex-col gap-6">
      <div>
        <p className="text-content-muted font-mono text-sm tracking-wide">WELCOME BACK</p>
        <h1 className="font-display mt-1 text-3xl">
          Hi <span className="text-lime-deep">{studentName}</span> - here&apos;s your spot.
        </h1>
      </div>

      {/* Usage / spending summary */}
      <UsageSummary />

      {/* Featured active booking */}
      <BookingBillboard
        propertyName="Tanke Crescent Lodge"
        room="Room 4B"
        moveInDate="Sept 5"
        daysAway={18}
        requestedAgo="2 hrs ago"
      />

      {/* Bookings tracker - hostels + countdown to when they end */}
      <section>
        <h2 className="text-content-muted mb-3 font-mono text-sm tracking-wide">MY BOOKINGS</h2>
        <BookingsTracker basePath={base} />
      </section>

      {/* SAVED HOSTELS + RECENT ACTIVITY */}
      <section className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* LEFT: Saved Hostels */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-content-muted font-mono text-sm tracking-wide">
              SAVED HOSTELS · {savedCount}
            </h2>
            <Button
              asChild
              variant="outline"
              className="text-body text-content-muted flex shrink-0 items-center gap-1 border-none"
            >
              <Link href={`${base}/saved`}>
                Manage <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>

          <HostelCardList hostels={hostels.slice(0, 3)} />

          <Button
            asChild
            variant="outline"
            className="text-content-muted mt-4 flex items-center gap-2 border-none"
          >
            <Link href={`${base}/saved`}>
              <Plus className="size-4" />
              {savedCount} more
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        {/* RIGHT: Recent Activity */}
        <div className="w-full shrink-0 lg:w-72 xl:w-80">
          <div className="mb-4 flex h-9 items-center">
            <h2 className="text-content-muted font-mono text-sm tracking-wide">RECENT ACTIVITY</h2>
          </div>

          <div className="border-line/20 rounded-2xl border border-dashed">
            {recentActivity.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 px-4 py-4 ${
                    index !== recentActivity.length - 1
                      ? 'border-line/10 border-b border-dashed'
                      : ''
                  }`}
                >
                  <Icon className="text-content mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="text-content text-sm font-medium">{item.label}</p>
                    <p className="text-content-muted text-xs">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events & tickets */}
      <section>
        <h2 className="text-content-muted mb-3 font-mono text-sm tracking-wide">
          EVENTS & TICKETS
        </h2>
        <EventsTicketsSummary basePath={base} />
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="text-content-muted mb-4 font-mono text-sm tracking-wide">
          PICKED FOR YOU . BASED ON TANKE + 250K
        </h2>
        <HostelCardList hostels={hostels.slice(0, 3)} />
      </section>
    </section>
  );
}
