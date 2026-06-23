'use client';

/**
 * RevenueBarChart - the single revenue chart used by every dashboard variant
 * (vendor, landlord, …). One design; the role only supplies the `data`. This
 * replaces the old per-role copies (VendorChartComponent, LandlordChartComponent)
 * that had drifted apart.
 *
 * The last bar is highlighted as the "current" bucket (lime); everything
 * before is a "past" bucket (foreground). Pass `currentLabel` to highlight a
 * different bar.
 *
 * Label shape varies by period (see revenue-period.ts):
 *   daily   -> "May 14"      monthly/6m/yearly -> "May"
 *   weekly  -> "May W1"      all                -> "2024"
 *   3m      -> "May W1"
 * The `unit` prop controls how the X-axis groups/labels ticks and what noun
 * the legend uses ("Past weeks", "Past days", …) — it does not change the
 * data shape, only how this component reads `week` as a label.
 */
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface RevenueDatum {
  /** Bucket label. Shape depends on `unit` — see file header. */
  week: string;
  revenue: number;
}

/** Which bucket noun + axis grouping strategy to use for a given period's `unit`. */
type RevenueUnit = 'day' | 'week' | 'month' | 'year';

const UNIT_NOUN: Record<RevenueUnit, string> = {
  day: 'days',
  week: 'weeks',
  month: 'months',
  year: 'years',
};

interface RevenueBarChartProps {
  data: RevenueDatum[];
  /** Which bar counts as "current" (lime). Defaults to the last datum. */
  currentLabel?: string;
  height?: number;
  /** Controls axis tick grouping + legend noun. Defaults to 'week' (legacy behaviour). */
  unit?: RevenueUnit;
  /** Show a skeleton instead of the chart, e.g. while a new period is loading. */
  loading?: boolean;
}

type BarShapeProps = { x?: number; y?: number; width?: number; height?: number; fill?: string };

const RoundedBar = ({ x = 0, y = 0, width = 0, height = 0, fill }: BarShapeProps) => {
  const r = 6;
  return (
    <path
      d={`M${x},${y + r} Q${x},${y} ${x + r},${y} H${x + width - r} Q${x + width},${y} ${x + width},${y + r} V${y + height} H${x} Z`}
      fill={fill}
    />
  );
};

type TooltipPayload = { active?: boolean; payload?: { payload: RevenueDatum }[] };

function ChartTooltip({
  active,
  payload,
  currentLabel,
}: TooltipPayload & { currentLabel: string }) {
  if (!active || !payload?.length) return null;
  const { week, revenue } = payload[0].payload;
  const isCurrent = week === currentLabel;
  return (
    <div className="border-line/10 bg-panel rounded-lg border px-3 py-2 shadow-lg">
      <p className="text-content-muted mb-1 font-mono text-[11px] tracking-wide uppercase">
        {week}
      </p>
      <p
        className="font-display text-base font-semibold"
        style={{ color: isCurrent ? 'var(--color-accent-fg)' : 'var(--color-content)' }}
      >
        ₦{revenue.toLocaleString()}
      </p>
    </div>
  );
}

/**
 * Decides which ticks get a visible label, and what text to show, based on
 * the bucket unit:
 *  - week (and the "3m" weekly view): show the month prefix once per month,
 *    on its first week (legacy "W1" behaviour).
 *  - day: too many bars to label every one — show every ~5th tick's day.
 *  - month / year: every tick already has a unique, short label — show all.
 */
function shouldLabelTick(
  unit: RevenueUnit,
  label: string,
  index: number,
): { show: boolean; text: string } {
  if (unit === 'week') {
    const isFirstWeekOfMonth = label.endsWith('W1');
    return { show: isFirstWeekOfMonth, text: label.split(' ')[0] };
  }
  if (unit === 'day') {
    return { show: index % 5 === 0, text: label };
  }
  // month, year: one label per bar, every bar.
  return { show: true, text: label };
}

function ChartSkeleton({ height }: { height: number }) {
  return (
    <div className="border-line/10 shadow-card bg-panel w-full animate-pulse rounded-xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="bg-line/20 h-3 w-24 rounded" />
        <div className="bg-line/20 h-3 w-32 rounded" />
      </div>
      <div className="flex items-end gap-3" style={{ height }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="bg-line/20 flex-1 rounded-t-md"
            style={{ height: `${30 + ((i * 37) % 60)}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function RevenueBarChart({
  data,
  currentLabel,
  height = 220,
  unit = 'week',
  loading = false,
}: RevenueBarChartProps) {
  if (loading) return <ChartSkeleton height={height} />;

  const current = currentLabel ?? data[data.length - 1]?.week ?? '';
  const total = data.reduce((sum, d) => sum + d.revenue, 0);
  const noun = UNIT_NOUN[unit];

  return (
    <div className="border-line/10 shadow-card bg-panel w-full rounded-xl border p-5">
      {/* Legend + summary */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-content-muted font-mono text-[11px] tracking-wide">
          TOTAL · ₦{total.toLocaleString()}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-content flex items-center gap-1.5 text-xs">
            <span className="bg-foreground inline-block size-2.5 rounded-sm" />
            Past {noun}
          </span>
          <span className="text-accent-fg flex items-center gap-1.5 text-xs">
            <span className="bg-lime inline-block size-2.5 rounded-sm" />
            Current {noun.slice(0, -1)}
          </span>
        </div>
      </div>

      {data.length === 0 ? (
        <div
          className="text-content-muted flex items-center justify-center text-sm"
          style={{ height }}
        >
          No revenue data for this period yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            barCategoryGap="30%"
            margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
          >
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-content-muted)', fontSize: 11 }}
              tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
              width={45}
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload, index }) => {
                const { show, text } = shouldLabelTick(unit, payload.value, index);
                return show ? (
                  <text
                    x={Number(x)}
                    y={Number(y) + 12}
                    fill="var(--color-content)"
                    fontSize={13}
                    textAnchor="middle"
                  >
                    {text}
                  </text>
                ) : (
                  <g />
                );
              }}
              interval={0}
            />
            <Tooltip
              content={<ChartTooltip currentLabel={current} />}
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey="revenue" shape={<RoundedBar />} isAnimationActive={false}>
              {data.map((d, i) => (
                <Cell
                  key={i}
                  fill={d.week === current ? 'var(--color-lime)' : 'var(--color-content)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
