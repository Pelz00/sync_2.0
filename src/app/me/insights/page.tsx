/**
 * ROUTE: /me/insights
 * ACCESS: authenticated student
 * PURPOSE: Spending + usage analytics for the student - a vendor-dashboard-style
 * view (KPI cards, monthly spend chart, spend-by-category breakdown, activity
 * summary). Helps students see what they're buying and using over time.
 */
import type { Metadata } from 'next';
import {
  BedDouble,
  CalendarDays,
  PiggyBank,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { SpendChart } from '../(components)/SpendChart';
import { studentBookings, studentEvents, studentTickets } from '@/mock/student';

export const metadata: Metadata = { title: 'Insights' };

interface Stat {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
}

const insightsStats: Stat[] = [
  { label: 'SPENT THIS SESSION', value: '₦312,500', sub: 'since Sep 2025', icon: Wallet },
  { label: 'AVG / MONTH', value: '₦34,800', sub: 'last 6 months', icon: TrendingUp },
  { label: 'TOP CATEGORY', value: 'Hostel', sub: '64% of spend', icon: BedDouble },
  { label: 'SAVED VIA SYNC', value: '₦18,200', sub: 'across deals', icon: PiggyBank },
];

const spendByCategory = [
  { label: 'Hostel', amount: 200_000, pct: 64 },
  { label: 'Food', amount: 58_000, pct: 19 },
  { label: 'Events & tickets', amount: 28_500, pct: 9 },
  { label: 'Laundry', amount: 16_000, pct: 5 },
  { label: 'Beauty', amount: 10_000, pct: 3 },
];

function naira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

export default function Page() {
  const activeBookings = studentBookings.filter(
    (b) => b.status === 'active' || b.status === 'ending_soon',
  ).length;
  const eventsAttended = studentEvents.filter((e) => e.status === 'attended').length;
  const validTickets = studentTickets.filter((t) => t.status === 'valid').length;

  return (
    <section className="flex flex-col gap-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {insightsStats.map(({ label, value, sub, icon: Icon }) => (
          <Card key={label} className="border-line/10 border bg-transparent">
            <CardHeader>
              <CardTitle className="text-content-muted flex items-center gap-2 font-mono text-xs tracking-wide">
                <Icon className="size-4 shrink-0" />
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent className="font-body">
              <p className="text-content text-2xl font-bold">{value}</p>
              <p className="text-content-muted mt-1 text-xs">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Spend chart + category breakdown */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <h2 className="text-content-muted mb-3 font-mono text-sm tracking-wide">
            MONTHLY SPEND . LAST 6 MONTHS
          </h2>
          <SpendChart />
        </div>

        <div className="w-full shrink-0 lg:w-80">
          <h2 className="text-content-muted mb-3 font-mono text-sm tracking-wide">WHERE IT WENT</h2>
          <Card className="border-line/10 flex flex-col gap-4 border bg-transparent p-5">
            {spendByCategory.map((c) => (
              <div key={c.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-content">{c.label}</span>
                  <span className="text-content-muted">{naira(c.amount)}</span>
                </div>
                <div className="bg-ink/10 h-2 w-full overflow-hidden rounded-full">
                  <div className="bg-lime h-full rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Activity summary */}
      <section>
        <h2 className="text-content-muted mb-3 font-mono text-sm tracking-wide">
          ACTIVITY SUMMARY
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'Active bookings', value: activeBookings, icon: BedDouble },
            { label: 'Events attended', value: eventsAttended, icon: CalendarDays },
            { label: 'Tickets held', value: validTickets, icon: PiggyBank },
          ].map(({ label, value, icon: Icon }) => (
            <Card
              key={label}
              className="border-line/10 flex flex-row items-center gap-3 border bg-transparent p-5"
            >
              <span className="bg-lime/15 text-accent-fg flex size-10 shrink-0 items-center justify-center rounded-xl">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-content text-xl font-bold">{value}</p>
                <p className="text-content-muted text-xs">{label}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}
