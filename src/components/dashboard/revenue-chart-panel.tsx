'use client';

/**
 * RevenueChartPanel - wraps RevenueBarChart with the period dropdown
 * ("Weekly" / "Daily" / "Monthly" / …). Owns the period state and re-fetches
 * data on change. RoleDashboard renders this instead of building the Card +
 * chart itself, so the dropdown's behaviour stays in one place across roles.
 *
 * `initialData` / `initialPeriod` let the server-rendered first paint match
 * whatever RoleDashboard already fetched for "weekly" (no flash of an empty
 * chart on load); switching periods after that fetches client-side.
 */
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { RevenueBarChart, type RevenueDatum } from './revenue-bar-chart';
import { REVENUE_PERIODS, getPeriodConfig, type RevenuePeriod } from './revenue-period';
import { fetchRevenueMock } from './fetch-revenue-mock';

interface RevenueChartPanelProps {
  initialData: RevenueDatum[];
  initialPeriod?: RevenuePeriod;
  /**
   * Swap this for the real API call once the backend endpoint exists, e.g.
   *   (period) => fetch(`/api/vendor/revenue?period=${period}`).then(r => r.json())
   * Defaults to the bundled mock so the dropdown is usable today.
   */
  fetchRevenue?: (period: RevenuePeriod) => Promise<RevenueDatum[]>;
}

export function RevenueChartPanel({
  initialData,
  initialPeriod = 'weekly',
  fetchRevenue = fetchRevenueMock,
}: RevenueChartPanelProps) {
  const [period, setPeriod] = useState<RevenuePeriod>(initialPeriod);
  const [data, setData] = useState<RevenueDatum[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click.
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // Skip re-fetching on first mount — initialData already covers initialPeriod.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchRevenue(period)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [period, fetchRevenue]);

  const config = getPeriodConfig(period);
  const currentLabel = REVENUE_PERIODS.find((p) => p.value === period)?.label ?? 'Weekly';

  return (
    <Card className="border-line/5 mb-4 h-full border bg-transparent">
      <CardHeader>
        <CardTitle className="text-content-muted flex items-center justify-between font-mono tracking-wide">
          <p>{config.title}</p>
          <div ref={menuRef} className="relative">
            <Button
              variant="outline"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="text-content-muted mt-2 flex items-center gap-1 border-transparent font-light"
            >
              {currentLabel}
              <ChevronDown className="size-3.75" />
            </Button>
            {open && (
              <ul
                role="listbox"
                className="border-line/10 bg-panel absolute right-0 z-10 mt-1 w-36 overflow-hidden rounded-lg border shadow-lg"
              >
                {REVENUE_PERIODS.map((p) => (
                  <li key={p.value} role="option" aria-selected={p.value === period}>
                    <button
                      type="button"
                      onClick={() => {
                        setPeriod(p.value);
                        setOpen(false);
                      }}
                      className={`hover:bg-line/10 block w-full px-3 py-2 text-left font-mono text-sm ${
                        p.value === period ? 'text-accent-fg' : 'text-content'
                      }`}
                    >
                      {p.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RevenueBarChart data={data} unit={config.unit} loading={loading} />
      </CardContent>
    </Card>
  );
}
