'use client';

import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type TooltipContentProps,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Chip } from '@/components/ui';
import { monthlyEarnings, yearlyEarnings, formatNaira } from '@/lib/landlord-data';

function ChartTooltip({ active, payload }: TooltipContentProps) {
  const value = payload?.[0]?.value;
  if (!active || typeof value !== 'number') return null;
  return (
    <div className="border-line/10 bg-panel shadow-pop rounded-lg border px-3 py-2 text-xs">
      <span className="font-medium">{formatNaira(value)}</span>
    </div>
  );
}

export function EarningsChart() {
  const [range, setRange] = useState<'monthly' | 'yearly'>('monthly');
  const data = range === 'monthly' ? monthlyEarnings : yearlyEarnings;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle>Earnings summary</CardTitle>
          <CardDescription>Rent collected across all properties.</CardDescription>
        </div>
        <div className="flex gap-2">
          <Chip selected={range === 'monthly'} onClick={() => setRange('monthly')}>
            Monthly
          </Chip>
          <Chip selected={range === 'yearly'} onClick={() => setRange('yearly')}>
            Yearly
          </Chip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-lime-deep)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-lime-deep)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--color-line)" strokeOpacity={0.08} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: 'var(--color-content-muted)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={52}
              tick={{ fill: 'var(--color-content-muted)', fontSize: 12 }}
              tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={ChartTooltip} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--color-lime-deep)"
              strokeWidth={2}
              fill="url(#fillAmount)"
            />
          </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
