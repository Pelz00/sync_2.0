'use client';

import * as React from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function calendarDays(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(first).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<Date | null>(null);
  const today = new Date();
  const [viewMonth, setViewMonth] = React.useState(today.getMonth());
  const [viewYear, setViewYear] = React.useState(today.getFullYear());
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  }

  function handleDayClick(day: Date) {
    const d = startOfDay(day);
    if (!value.from || (value.from && value.to)) {
      onChange({ from: d, to: null });
    } else {
      if (d < value.from) onChange({ from: d, to: value.from });
      else onChange({ from: value.from, to: d });
    }
  }

  function isInRange(day: Date) {
    if (!value.from) return false;
    const end = value.to ?? hovered;
    if (!end) return false;
    const [s, e] = value.from <= end ? [value.from, end] : [end, value.from];
    return day > s && day < e;
  }

  function formatLabel() {
    if (!value.from && !value.to) return 'Pick a date range';
    const fmt = (d: Date) =>
      d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
    if (value.from && !value.to) return `${fmt(value.from)} → …`;
    return `${fmt(value.from!)} → ${fmt(value.to!)}`;
  }

  function clearRange(e: React.MouseEvent) {
    e.stopPropagation();
    onChange({ from: null, to: null });
  }

  const cells = calendarDays(viewYear, viewMonth);

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Trigger */}
      <Button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="border-line/20 text-content hover:bg-surface-deep bg-panel flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors"
      >
        <CalendarDays className="text-content-muted h-3.5 w-3.5 shrink-0" />
        <span className={cn(!value.from && 'text-content-muted')}>{formatLabel()}</span>
        {(value.from || value.to) && (
          <X
            className="text-content-muted hover:text-content ml-1 h-3 w-3 shrink-0"
            onClick={clearRange}
          />
        )}
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="border-line/10 bg-panel shadow-card absolute right-0 z-50 mt-2 w-72 rounded-xl border p-4">
          {/* Month nav */}
          <div className="mb-3 flex items-center justify-between">
            <Button
              type="button"
              onClick={prevMonth}
              className="hover:bg-surface-deep rounded-md p-1 transition-colors"
            >
              <ChevronLeft className="text-content-muted h-4 w-4" />
            </Button>
            <span className="font-display text-content text-sm font-semibold">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <Button
              type="button"
              onClick={nextMonth}
              className="hover:bg-surface-deep rounded-md p-1 transition-colors"
            >
              <ChevronRight className="text-content-muted h-4 w-4" />
            </Button>
          </div>

          {/* Day labels */}
          <div className="mb-1 grid grid-cols-7 text-center">
            {DAYS.map((d) => (
              <span key={d} className="text-content-muted font-mono text-[10px] uppercase">
                {d}
              </span>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7 gap-y-0.5 text-center">
            {cells.map((day, i) => {
              if (!day) return <span key={`e-${i}`} />;
              const isFrom = value.from && isSameDay(day, value.from);
              const isTo = value.to && isSameDay(day, value.to);
              const inRange = isInRange(day);
              const isToday = isSameDay(day, today);

              return (
                <Button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => setHovered(day)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    'relative mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors',
                    isFrom || isTo
                      ? 'bg-lime-500 font-semibold text-white'
                      : inRange
                        ? 'bg-lime-100 text-lime-800'
                        : isToday
                          ? 'font-semibold text-lime-600'
                          : 'text-content hover:bg-surface-deep',
                  )}
                >
                  {day.getDate()}
                </Button>
              );
            })}
          </div>

          {/* Footer hint */}
          <p className="text-content-muted mt-3 text-center font-mono text-[10px] tracking-wide uppercase">
            {!value.from ? 'Select start date' : !value.to ? 'Select end date' : 'Range selected'}
          </p>
        </div>
      )}
    </div>
  );
}
