import { AvatarFallback, Avatar, AvatarImage, Button, Badge } from '@/components/ui';
import { ArrowRight, Bell, Star, MessageCircle, Check, Search, Plus } from 'lucide-react';
import type { Metadata } from 'next';
import { BookingBillboard } from './(components)/BillboardComponent';
import { HostelCardList } from './(components)/HostelCard';
import { DeleteAccountButton } from '@/components/account/delete-account-button';
import { hostels } from '@/mock/hostels';

export const metadata: Metadata = { title: 'Account' };

const recentActivity = [
  { id: '1', icon: Star, label: 'You saved Pipeline Court', time: '2h ago' },
  { id: '2', icon: MessageCircle, label: 'Mama Yetunde replied', time: 'Yesterday' },
  { id: '3', icon: Check, label: 'Booking request sent', time: 'Yesterday' },
  { id: '4', icon: Search, label: '3 new hostels match your search', time: '2d ago' },
];

export default function Page() {
  const studentName = 'Kanyinsola';
  const notificationCount = 3;
  const savedCount = 12;
  const studentBudget = 250000;

  return (
    <section className="flex flex-col gap-3">
      <p className="text-content-muted font-mono text-lg">WELCOME BACK</p>

      {/* Header */}
      <section className="flex items-center justify-between">
        <h1 className="font-display mt-2 text-3xl">
          Hi <span className="text-lime-deep">{studentName}</span> - let&apos;s find your spot.
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant={'outline'}
            className="border-line flex items-center gap-2 rounded-2xl border px-3 py-2"
          >
            <Bell size={20} />
            <p>{notificationCount}</p>
          </Button>
          <Avatar className="border-line border">
            <AvatarImage src="/avatar-placeholder.png" alt={studentName} />
            <AvatarFallback>{studentName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </section>

      {/* Billboard */}
      <section className="bg-ink mt-3.5 h-full w-full rounded-xl">
        <BookingBillboard
          propertyName="Tanke Crescent Lodge"
          room="Room 4B"
          moveInDate="Sept 5"
          daysAway={18}
          requestedAgo="2 hrs ago"
        />
      </section>

      {/* SAVED HOSTELS + RECENT ACTIVITY */}
      <section className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* LEFT: Saved Hostels */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-content-muted font-mono text-sm tracking-wide">
              SAVED HOSTELS · {savedCount}
            </h2>
            <Button
              variant="outline"
              className="text-body text-content-muted flex shrink-0 items-center gap-1 border-none"
            >
              Manage <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>

          {/* Cards — show only first 3 */}
          <HostelCardList hostels={hostels.slice(0, 3)} />

          {/* More link */}
          <Button
            variant={'outline'}
            className="text-content-muted mt-4 flex items-center gap-2 border-none"
          >
            <Plus className="size-4" />
            {savedCount} more
            <ArrowRight className="ml-1 size-4" />
          </Button>
          {/* {hostels.length > 3 && (
            <Button className="text-content-muted mt-4 flex items-center gap-1 text-sm hover:underline">
              + {hostels.length - 3} more <ArrowRight className="size-3.5" />
            </Button>
          )} */}
        </div>

        {/* RIGHT: Recent Activity */}
        <div className="w-full shrink-0 lg:w-72 xl:w-80">
          {/* Header — same height as the left header row */}
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
      <section className="mt-6">
        <h2 className="text-content-muted mb-4 font-mono text-sm tracking-wide">
          PICKED FOR YOU . BASED ON TANKE + 250K
        </h2>
        <HostelCardList hostels={hostels.slice(0, 3)} />
      </section>

      <DeleteAccountButton />
    </section>
  );
}
