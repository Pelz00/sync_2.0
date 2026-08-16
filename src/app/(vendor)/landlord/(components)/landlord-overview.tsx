'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BarChart3, CalendarDays, Eye, MoveUpRight, Users, WalletCards } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import {
  PendingRequestList,
  type PendingRequestItem,
} from '@/components/dashboard/pending-request-card';
import { RevenueChartPanel } from '@/components/dashboard/revenue-chart-panel';
import type { RevenueDatum } from '@/components/dashboard/revenue-bar-chart';
import { formatNaira, type Property } from '@/lib/landlord-data';

export function LandlordOverview({
  name,
  pending,
  chart,
  properties,
}: {
  name: string;
  pending: PendingRequestItem[];
  chart: RevenueDatum[];
  properties: Property[];
}) {
  const firstName = name.trim().split(/\s+/)[0] || 'there';

  return (
    <div className="flex flex-col gap-7 pb-8">
      <section>
        <div>
          <p className="text-content-muted text-sm tracking-wide">Good morning, {firstName} 👋</p>
          <h1 className="text-section text-content font-display mt-2">
            Here’s what’s happening <span className="text-lime-deep">this week</span>
          </h1>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewKpi
          icon={BarChart3}
          tone="lime"
          label="Total Revenue"
          value="₦420,000"
          detail="+18%"
          helper="vs last month"
          sparkline
        />
        <OverviewKpi
          icon={Users}
          tone="violet"
          label="Occupancy Rate"
          value="87%"
          detail="4 of 5 rooms occupied"
          progress={87}
        />
        <OverviewKpi
          icon={CalendarDays}
          tone="blue"
          label="Booking Requests"
          value="8"
          detail="3 pending"
        />
        <OverviewKpi
          icon={Eye}
          tone="amber"
          label="Listing Views"
          value="1,248"
          detail="+24%"
          helper="vs last 7 days"
          sparkline
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
        <Card className="border-line/10 rounded-3xl border shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold">
                Pending Booking Requests{' '}
                <span className="bg-lime/15 text-lime-deep ml-1 rounded-full px-2 py-0.5 text-xs">
                  8
                </span>
              </h2>
              <Link
                href="/landlord/bookings"
                className="text-content-muted hover:text-content flex items-center gap-1 text-sm"
              >
                View all <MoveUpRight className="size-4" />
              </Link>
            </div>
            <PendingRequestList items={pending} />
            <Button variant="outline" className="mt-4 w-full" asChild>
              <Link href="/landlord/bookings">
                View all requests <MoveUpRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <RevenueChartPanel initialData={chart} initialPeriod="weekly" />
          <div className="border-line/10 bg-surface-deep/60 grid gap-3 rounded-2xl border p-4 sm:grid-cols-3">
            <RevenueFact
              label="Highest week"
              value="₦8,200"
              detail="May 2 – May 8"
              icon={MoveUpRight}
              tone="lime"
            />
            <RevenueFact
              label="Average / week"
              value="₦5,408"
              detail="Last 12 weeks"
              icon={BarChart3}
              tone="violet"
            />
            <RevenueFact
              label="Total (12 weeks)"
              value="₦64,900"
              detail="All recorded payments"
              icon={WalletCards}
              tone="blue"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)]">
        <Card className="border-line/10 rounded-3xl border shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold">Recent Activity</h2>
            <div className="divide-line/10 mt-5 flex flex-col divide-y">
              {pending.slice(0, 3).map((request, index) => (
                <div key={request.id} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                  <span className="bg-lime/10 text-lime-deep grid size-10 shrink-0 place-items-center rounded-xl">
                    <CalendarDays className="size-4" />
                  </span>
                  <p className="min-w-0 flex-1 text-sm">
                    {index === 0 ? 'New booking request' : 'Booking activity'} from{' '}
                    <span className="font-medium">{request.name}</span>.
                  </p>
                  <span className="text-content-muted text-xs">
                    {request.tags?.at(-1) ?? 'Today'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-line/10 rounded-3xl border shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold">Property Summary</h2>
              <Link
                href="/landlord/properties"
                className="text-content-muted hover:text-content text-sm"
              >
                View all
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {properties.slice(0, 3).map((property) => (
                <Link key={property.id} href="/landlord/properties" className="group min-w-0">
                  <div className="bg-surface-deep relative aspect-[1.6] overflow-hidden rounded-xl">
                    {property.imageUrl ? (
                      <Image
                        src={property.imageUrl}
                        alt={property.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <p className="font-display mt-3 truncate font-semibold">{property.name}</p>
                  <p className="text-content-muted mt-1 text-xs">
                    {property.roomsBooked}/{property.roomsTotal} rooms booked ·{' '}
                    {formatNaira(property.price ?? 0)}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function OverviewKpi({
  icon: Icon,
  tone,
  label,
  value,
  detail,
  helper,
  progress,
  sparkline = false,
}: {
  icon: typeof BarChart3;
  tone: 'lime' | 'violet' | 'blue' | 'amber';
  label: string;
  value: string;
  detail: string;
  helper?: string;
  progress?: number;
  sparkline?: boolean;
}) {
  const tones = {
    lime: 'bg-lime/10 text-lime-deep',
    violet: 'bg-violet-500/10 text-violet-600',
    blue: 'bg-blue-500/10 text-blue-600',
    amber: 'bg-amber-500/10 text-amber-600',
  };
  return (
    <Card className="border-line/10 rounded-2xl border shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <span className={`${tones[tone]} grid size-11 place-items-center rounded-full`}>
            <Icon className="size-5" />
          </span>
          <div>
            <p className="text-content-muted text-sm">{label}</p>
            <p className="font-display mt-1 text-2xl font-semibold">{value}</p>
          </div>
        </div>
        <div className="mt-6 flex items-end justify-between gap-3">
          <div>
            <p
              className={
                helper ? 'text-lime-deep text-sm font-semibold' : 'text-content-muted text-sm'
              }
            >
              {detail}
            </p>
            {helper ? <p className="text-content-muted mt-1 text-xs">{helper}</p> : null}
          </div>
          {sparkline ? (
            <svg viewBox="0 0 100 32" className="h-9 w-24" aria-hidden>
              <path
                d="M2 26 C20 24, 24 15, 40 21 S62 26, 75 12 S88 20, 98 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-lime-deep"
              />
            </svg>
          ) : null}
        </div>
        {progress !== undefined ? (
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-violet-500/10">
            <div className="h-full rounded-full bg-violet-500" style={{ width: `${progress}%` }} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function RevenueFact({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof BarChart3;
  tone: 'lime' | 'violet' | 'blue';
}) {
  const toneClass = {
    lime: 'bg-lime/10 text-lime-deep',
    violet: 'bg-violet-500/10 text-violet-600',
    blue: 'bg-blue-500/10 text-blue-600',
  };
  return (
    <div className="sm:border-line/10 flex items-center justify-between gap-3 sm:border-r sm:pr-3 sm:last:border-0">
      <div>
        <p className="text-content-muted text-xs">{label}</p>
        <p className="font-display mt-1 font-semibold">{value}</p>
        <p className="text-content-muted text-xs">{detail}</p>
      </div>
      <span className={`${toneClass[tone]} grid size-9 place-items-center rounded-full`}>
        <Icon className="size-4" />
      </span>
    </div>
  );
}
