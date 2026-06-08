'use client';

import { useState, useRef, useEffect } from 'react';
import { CalendarDays, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Invoice } from './types';

interface DateRange {
  from: string;
  to: string;
}

interface Props {
  data: Invoice[];
  search: string;
  onSearchChange: (v: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onExportAll: () => void;
  onExportFiltered: () => void;
}

export function BillingHistoryToolbar({
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  onExportAll,
  onExportFiltered,
}: Props) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [localRange, setLocalRange] = useState<DateRange>(dateRange);
  const popoverRef = useRef<HTMLDivElement>(null);

  const hasDateFilter = Boolean(dateRange.from || dateRange.to);

  // Close popover on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function applyDateRange() {
    onDateRangeChange(localRange);
    setPopoverOpen(false);
  }

  function clearDateRange() {
    const empty = { from: '', to: '' };
    setLocalRange(empty);
    onDateRangeChange(empty);
    setPopoverOpen(false);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-panel p-4 shadow-card">
      {/* Left: search + date filter */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search invoices…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="!border-line/20 w-48 !ring-0 focus-visible:!ring-0"
        />

        {/* Date range popover trigger */}
        <div className="relative" ref={popoverRef}>
          <Button
            variant="outline"
            size="sm"
            className={`gap-2 ${hasDateFilter ? 'border-violet-400 bg-violet-50 text-violet-700' : ''}`}
            onClick={() => {
              setLocalRange(dateRange);
              setPopoverOpen((p) => !p);
            }}
          >
            <CalendarDays className="h-4 w-4" />
            {hasDateFilter
              ? `${dateRange.from || '…'} → ${dateRange.to || '…'}`
              : 'Date Range'}
            {hasDateFilter && (
              <X
                className="ml-1 h-3 w-3 opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  clearDateRange();
                }}
              />
            )}
          </Button>

          {/* Popover */}
          {popoverOpen && (
            <div className="absolute left-0 top-full z-30 mt-2 w-72 rounded-xl border border-line/10 bg-panel p-4 shadow-pop">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-content-muted">
                Filter by date
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-content-muted">From</label>
                  <Input
                    type="date"
                    value={localRange.from}
                    onChange={(e) => setLocalRange((r) => ({ ...r, from: e.target.value }))}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-content-muted">To</label>
                  <Input
                    type="date"
                    value={localRange.to}
                    onChange={(e) => setLocalRange((r) => ({ ...r, to: e.target.value }))}
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={clearDateRange}>
                  Clear
                </Button>
                <Button
                  size="sm"
                  className="bg-violet-600 text-white hover:bg-violet-700"
                  onClick={applyDateRange}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: export buttons */}
      <div className="flex items-center gap-2">
        {hasDateFilter && (
          <Button variant="outline" size="sm" onClick={onExportFiltered} className="gap-2">
            <Download className="h-4 w-4" />
            Export Filtered
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={onExportAll} className="gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>
    </div>
  );
}
