'use client';

import * as React from 'react';
import { Star, Megaphone, Percent, Tag, Zap, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PromotionType } from './types';

// ── icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<PromotionType, LucideIcon> = {
  'Featured Listing': Star,
  'Sponsored Product': Megaphone,
  'Discount Campaign': Percent,
  'Coupon Campaign': Tag,
  'Flash Sale': Zap,
};

// ── types ─────────────────────────────────────────────────────────────────────
export interface PromotionTypeItem {
  type: PromotionType;
  description: string;
  iconBg: string;
  iconColor: string;
  active?: boolean;
}

export interface PromotionTypesGridProps {
  items?: PromotionTypeItem[];
  onSelect?: (type: PromotionType) => void;
  selectedType?: PromotionType | null;
}

// ── defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_ITEMS: PromotionTypeItem[] = [
  {
    type: 'Featured Listing',
    description: 'Appear at the top of category pages',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
  },
  {
    type: 'Sponsored Product',
    description: 'Promote individual items in search results',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    type: 'Discount Campaign',
    description: 'Run time-limited discounts on products',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
  {
    type: 'Coupon Campaign',
    description: 'Create shareable promo codes',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-400',
  },
  {
    type: 'Flash Sale',
    description: 'Limited-time lightning deals',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
  },
];

// ── component ─────────────────────────────────────────────────────────────────
export function PromotionTypesGrid({
  items = DEFAULT_ITEMS,
  onSelect,
  selectedType,
}: PromotionTypesGridProps) {
  return (
    <section>
      <h2 className="font-display text-content mb-3 text-base font-semibold">Promotion Types</h2>

      {/*
       * Responsive grid:
       *   mobile  (default) : 1 col  — each card full width
       *   sm  (≥640px)      : 2 cols — pairs nicely on phones in landscape / small tablets
       *   md  (≥768px)      : 3 cols — iPad Mini portrait
       *   lg  (≥1024px)     : 5 cols — desktop, all five side by side
       *
       * The last item on a 3-col grid with 5 items would be orphaned on the
       * left. `[&>*:last-child]:md:col-span-1` keeps it normal; we center it
       * only on the sm breakpoint (2-col, where 5th item would be alone).
       */}
      <div
        className={cn(
          'grid gap-3',
          'grid-cols-1', // mobile: 1 per row
          'sm:grid-cols-2', // small tablet / landscape phone: 2 per row
          'md:grid-cols-3', // iPad Mini portrait: 3 per row
          'lg:grid-cols-5', // desktop: all 5 in one row
        )}
      >
        {items.map((item, idx) => {
          const Icon = ICON_MAP[item.type];
          const isSelected = selectedType === item.type;

          // On sm (2-col) the 5th item is the only one in its row → center it
          const isLastOddOnSm = items.length % 2 !== 0 && idx === items.length - 1;
          // On md (3-col) the 5th item starts a new row but isn't alone → no special treatment needed

          return (
            <button
              key={item.type}
              type="button"
              onClick={() => onSelect?.(item.type)}
              className={cn(
                'group bg-panel shadow-card flex flex-col gap-3 rounded-xl border p-4 text-left',
                'transition-all hover:shadow-md',
                isSelected
                  ? 'border-violet-400 ring-2 ring-violet-200'
                  : 'border-line/10 hover:border-line/25',
                // On sm breakpoint only: center the lone last item
                isLastOddOnSm &&
                  'sm:col-span-2 sm:max-w-[calc(50%-6px)] sm:justify-self-start md:col-span-1 md:max-w-none',
              )}
            >
              <span
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  item.iconBg,
                )}
              >
                <Icon className={cn('h-5 w-5', item.iconColor)} />
              </span>
              <div>
                <p className="text-content text-sm font-semibold">{item.type}</p>
                <p className="text-content-muted mt-0.5 text-xs leading-snug">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
