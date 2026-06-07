'use client';

import * as React from 'react';
import { Eye, MousePointerClick, ShoppingBag, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// ── icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP = {
  Eye,
  MousePointerClick,
  ShoppingBag,
  TrendingUp,
} as const;

type IconKey = keyof typeof ICON_MAP;

// ── types ─────────────────────────────────────────────────────────────────────
export interface StatCardProps {
  label: string;
  /** Already-formatted display value, e.g. "36,700" or "₦1,027,950" */
  value: string;
  icon: IconKey;
  iconBg: string;
  iconColor: string;
  className?: string;
}

// ── component ─────────────────────────────────────────────────────────────────
export function PromotionStatCard({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  className,
}: StatCardProps) {
  const Icon = ICON_MAP[icon];

  return (
    <Card className={cn('flex-1 min-w-[160px]', className)}>
      <CardContent className="pt-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-content-muted">
            {label}
          </span>
          <span className={cn('flex h-9 w-9 items-center justify-center rounded-full', iconBg)}>
            <Icon className={cn('h-4 w-4', iconColor)} />
          </span>
        </div>
        <p className="font-display text-2xl font-bold text-content">{value}</p>
      </CardContent>
    </Card>
  );
}

// ── stats row ─────────────────────────────────────────────────────────────────
export interface PromotionStatsRowProps {
  totalViews: number;
  totalClicks: number;
  conversions: number;
  revenueGenerated: number;
}

/** Formats numbers with commas and optional currency prefix. */
function fmt(n: number, currency = false) {
  const formatted = n.toLocaleString('en-NG');
  return currency ? `₦${formatted}` : formatted;
}

export function PromotionStatsRow({
  totalViews,
  totalClicks,
  conversions,
  revenueGenerated,
}: PromotionStatsRowProps) {
  const stats: StatCardProps[] = [
    {
      label: 'Total Views',
      value: fmt(totalViews),
      icon: 'Eye',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
    },
    {
      label: 'Total Clicks',
      value: fmt(totalClicks),
      icon: 'MousePointerClick',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
    },
    {
      label: 'Conversions',
      value: fmt(conversions),
      icon: 'ShoppingBag',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
    },
    {
      label: 'Revenue Generated',
      value: fmt(revenueGenerated, true),
      icon: 'TrendingUp',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((s) => (
        <PromotionStatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
