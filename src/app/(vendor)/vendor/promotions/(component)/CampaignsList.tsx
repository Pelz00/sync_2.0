'use client';

import * as React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Campaign, CampaignStatus } from './types';

// ── helpers ───────────────────────────────────────────────────────────────────
function fmt(n: number, currency = false) {
  const s = n.toLocaleString('en-NG');
  return currency ? `₦${s}` : s;
}

function formatDateRange(start: string, end: string) {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const s = new Date(start).toLocaleDateString('en-NG', opts);
  const e = new Date(end).toLocaleDateString('en-NG', opts);
  return `${s} – ${e}`;
}

// ── status badge ──────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<CampaignStatus, string> = {
  Active: 'bg-green-100 text-green-700',
  Ended: 'bg-surface-deep text-content-muted',
  Draft: 'bg-yellow-100 text-yellow-700',
  Paused: 'bg-orange-100 text-orange-700',
  Scheduled: 'bg-blue-100 text-blue-600',
};

function StatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
        STATUS_STYLES[status],
      )}
    >
      {status}
    </span>
  );
}

// ── budget bar ────────────────────────────────────────────────────────────────
function BudgetBar({ spent, total }: { spent: number; total: number }) {
  const pct = total === 0 ? 0 : Math.min((spent / total) * 100, 100);
  const isOver = pct >= 100;
  return (
    <div className="bg-surface-deep mt-1 h-1.5 w-full overflow-hidden rounded-full">
      <div
        className={cn('h-full rounded-full transition-all', isOver ? 'bg-coral' : 'bg-violet-500')}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── metric pill (mobile/tablet only) ─────────────────────────────────────────
function MetricPill({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className={cn('font-display text-sm font-bold', green ? 'text-green-600' : 'text-content')}
      >
        {value}
      </span>
      <span className="text-content-muted text-[10px]">{label}</span>
    </div>
  );
}

// ── campaign row ──────────────────────────────────────────────────────────────
export interface CampaignRowProps {
  campaign: Campaign;
  onView?: (campaign: Campaign) => void;
  onEdit?: (campaign: Campaign) => void;
  onDelete?: (campaign: Campaign) => void;
}

export function CampaignRow({ campaign, onView, onEdit, onDelete }: CampaignRowProps) {
  const hasActions = onView || onEdit || onDelete;

  return (
    /**
     * Layout strategy
     * ───────────────
     * mobile  (default)  : single column, everything stacked
     * tablet  (md)       : two-column: [name+meta | metrics grid]
     * desktop (lg)       : original single horizontal row
     */
    <div className="border-line/5 border-b py-5 last:border-0">
      {/* ── Desktop row (lg+) ───────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
        {/* Name + meta */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-content text-sm font-semibold">{campaign.name}</span>
            <StatusBadge status={campaign.status} />
          </div>
          <p className="text-content-muted mt-0.5 text-xs">
            {campaign.type} · {formatDateRange(campaign.startDate, campaign.endDate)}
          </p>
        </div>

        {/* Metrics */}
        <div className="flex shrink-0 gap-6 text-center">
          <MetricPill label="Views" value={fmt(campaign.views)} />
          <MetricPill label="Clicks" value={fmt(campaign.clicks)} />
          <MetricPill label="Sales" value={fmt(campaign.sales)} />
          <MetricPill label="Revenue" value={fmt(campaign.revenue, true)} green />
        </div>

        {/* Budget + actions */}
        <div className="flex min-w-[160px] shrink-0 flex-col items-end gap-1">
          <div className="flex w-full items-center justify-between">
            <span className="text-content-muted text-[11px]">Budget</span>
            <span className="text-content text-[11px] font-semibold">
              {fmt(campaign.budgetSpent, true)} / {fmt(campaign.budgetTotal, true)}
            </span>
          </div>
          <BudgetBar spent={campaign.budgetSpent} total={campaign.budgetTotal} />
          {hasActions && (
            <div className="mt-2 flex items-center gap-3">
              <ActionButtons
                campaign={campaign}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Tablet row (md – lg) ─────────────────────────────────────────────── */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:hidden">
        {/* Col 1: name, meta, budget */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-content text-sm font-semibold">{campaign.name}</span>
            <StatusBadge status={campaign.status} />
          </div>
          <p className="text-content-muted text-xs">
            {campaign.type} · {formatDateRange(campaign.startDate, campaign.endDate)}
          </p>
          {/* Budget */}
          <div className="mt-1">
            <div className="flex items-center justify-between">
              <span className="text-content-muted text-[11px]">Budget</span>
              <span className="text-content text-[11px] font-semibold">
                {fmt(campaign.budgetSpent, true)} / {fmt(campaign.budgetTotal, true)}
              </span>
            </div>
            <BudgetBar spent={campaign.budgetSpent} total={campaign.budgetTotal} />
          </div>
          {hasActions && (
            <div className="mt-1 flex items-center gap-3">
              <ActionButtons
                campaign={campaign}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          )}
        </div>

        {/* Col 2: metrics in 2x2 grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard label="Views" value={fmt(campaign.views)} />
          <MetricCard label="Clicks" value={fmt(campaign.clicks)} />
          <MetricCard label="Sales" value={fmt(campaign.sales)} />
          <MetricCard label="Revenue" value={fmt(campaign.revenue, true)} green />
        </div>
      </div>

      {/* ── Mobile card (< md) ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 md:hidden">
        {/* Name + status */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-content text-sm font-semibold">{campaign.name}</span>
          <StatusBadge status={campaign.status} />
        </div>
        <p className="text-content-muted text-xs">
          {campaign.type} · {formatDateRange(campaign.startDate, campaign.endDate)}
        </p>

        {/* Metrics: 4 cols on one row */}
        <div className="divide-line/10 border-line/10 bg-surface-deep/40 grid grid-cols-4 divide-x rounded-lg border py-3">
          <MetricPill label="Views" value={fmt(campaign.views)} />
          <MetricPill label="Clicks" value={fmt(campaign.clicks)} />
          <MetricPill label="Sales" value={fmt(campaign.sales)} />
          <MetricPill label="Revenue" value={fmt(campaign.revenue, true)} green />
        </div>

        {/* Budget */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-content-muted text-[11px]">Budget</span>
            <span className="text-content text-[11px] font-semibold">
              {fmt(campaign.budgetSpent, true)} / {fmt(campaign.budgetTotal, true)}
            </span>
          </div>
          <BudgetBar spent={campaign.budgetSpent} total={campaign.budgetTotal} />
        </div>

        {/* Actions */}
        {hasActions && (
          <div className="flex items-center gap-3">
            <ActionButtons
              campaign={campaign}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ── shared sub-components ─────────────────────────────────────────────────────

/** Small bordered metric tile used on the tablet layout */
function MetricCard({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="border-line/10 bg-surface-deep/40 flex flex-col gap-0.5 rounded-lg border p-3">
      <span
        className={cn(
          'font-display text-base font-bold',
          green ? 'text-green-600' : 'text-content',
        )}
      >
        {value}
      </span>
      <span className="text-content-muted text-[10px]">{label}</span>
    </div>
  );
}

function ActionButtons({
  campaign,
  onView,
  onEdit,
  onDelete,
}: Pick<CampaignRowProps, 'campaign' | 'onView' | 'onEdit' | 'onDelete'>) {
  return (
    <>
      {onView && (
        <button
          type="button"
          aria-label="View campaign"
          onClick={() => onView(campaign)}
          className="text-content-muted hover:text-content transition-colors"
        >
          <Eye className="h-4 w-4" />
        </button>
      )}
      {onEdit && (
        <button
          type="button"
          aria-label="Edit campaign"
          onClick={() => onEdit(campaign)}
          className="text-content-muted hover:text-content transition-colors"
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          aria-label="Delete campaign"
          onClick={() => onDelete(campaign)}
          className="text-content-muted transition-colors hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </>
  );
}

// ── campaigns list ────────────────────────────────────────────────────────────
export interface CampaignsListProps {
  campaigns: Campaign[];
  statusFilter?: CampaignStatus | 'all';
  onStatusFilterChange?: (value: CampaignStatus | 'all') => void;
  onView?: (campaign: Campaign) => void;
  onEdit?: (campaign: Campaign) => void;
  onDelete?: (campaign: Campaign) => void;
  isLoading?: boolean;
}

const STATUS_OPTIONS: Array<CampaignStatus | 'all'> = [
  'all',
  'Active',
  'Scheduled',
  'Paused',
  'Ended',
  'Draft',
];

export function CampaignsList({
  campaigns,
  statusFilter: externalFilter,
  onStatusFilterChange,
  onView,
  onEdit,
  onDelete,
  isLoading,
}: CampaignsListProps) {
  const [internalFilter, setInternalFilter] = React.useState<CampaignStatus | 'all'>('all');

  const activeFilter = externalFilter ?? internalFilter;
  const handleFilterChange = (val: CampaignStatus | 'all') => {
    setInternalFilter(val);
    onStatusFilterChange?.(val);
  };

  const filtered =
    activeFilter === 'all' ? campaigns : campaigns.filter((c) => c.status === activeFilter);

  return (
    <section>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-content text-base font-semibold">All Campaigns</h2>
        <Select
          value={activeFilter}
          onValueChange={(v) => handleFilterChange(v as CampaignStatus | 'all')}
        >
          <SelectTrigger className="h-9 w-[140px] text-sm">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s === 'all' ? 'All Status' : s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Card */}
      <div className="border-line/5 bg-panel shadow-card rounded-xl border">
        {isLoading ? (
          <div className="text-content-muted flex h-40 items-center justify-center text-sm">
            Loading campaigns…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-content-muted flex h-40 items-center justify-center text-sm">
            No campaigns found.
          </div>
        ) : (
          <div className="divide-line/5 divide-y px-5">
            {filtered.map((c) => (
              <CampaignRow
                key={c.id}
                campaign={c}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
