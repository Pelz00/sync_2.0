'use client';

/**
 * RevenueBarChart - the single revenue chart used by every dashboard variant
 * (vendor, landlord, …). One design; the role only supplies the `data`. This
 * replaces the old per-role copies (VendorChartComponent, LandlordChartComponent)
 * that had drifted apart.
 *
 * The last bar is highlighted as the "current week" (lime); everything before is
 * a "past week" (foreground). Pass `currentLabel` to highlight a different bar.
 */
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface RevenueDatum {
  /** Bucket label, e.g. "May W1". The month prefix (before the space) is shown on the axis. */
  week: string;
  revenue: number;
}

interface RevenueBarChartProps {
  data: RevenueDatum[];
  /** Which bar counts as "current" (lime). Defaults to the last datum. */
  currentLabel?: string;
  height?: number;
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

function ChartTooltip({ active, payload, currentLabel }: TooltipPayload & { currentLabel: string }) {
  if (!active || !payload?.length) return null;
  const { week, revenue } = payload[0].payload;
  const isCurrent = week === currentLabel;
  return (
    <div className="border-line/10 bg-panel rounded-lg border px-3 py-2 shadow-lg">
      <p className="text-content-muted mb-1 font-mono text-[11px] tracking-wide uppercase">{week}</p>
      <p
        className="font-display text-base font-semibold"
        style={{ color: isCurrent ? 'var(--color-accent-fg)' : 'var(--color-content)' }}
      >
        ₦{revenue.toLocaleString()}
      </p>
    </div>
  );
}

export function RevenueBarChart({ data, currentLabel, height = 220 }: RevenueBarChartProps) {
  const current = currentLabel ?? data[data.length - 1]?.week ?? '';
  const total = data.reduce((sum, d) => sum + d.revenue, 0);

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
            Past weeks
          </span>
          <span className="text-accent-fg flex items-center gap-1.5 text-xs">
            <span className="bg-lime inline-block size-2.5 rounded-sm" />
            Current week
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} barCategoryGap="30%" margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
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
            tick={({ x, y, payload }) => {
              const month = payload.value.split(' ')[0];
              const isFirst = payload.value.endsWith('W1');
              return isFirst ? (
                <text
                  x={Number(x)}
                  y={Number(y) + 12}
                  fill="var(--color-content)"
                  fontSize={13}
                  textAnchor="middle"
                >
                  {month}
                </text>
              ) : (
                <g />
              );
            }}
            interval={0}
          />
          <Tooltip content={<ChartTooltip currentLabel={current} />} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="revenue" shape={<RoundedBar />} isAnimationActive={false}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.week === current ? 'var(--color-lime)' : 'var(--color-content)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
