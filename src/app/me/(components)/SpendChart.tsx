/**
 * SpendChart - monthly spend bar chart for the student insights page. Mirrors
 * the vendor revenue chart (recharts + rounded bars, theme-token colours), with
 * the current month highlighted in lime. Static mock data for now.
 */
'use client';

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { month: 'Jan', amount: 28_500 },
  { month: 'Feb', amount: 31_200 },
  { month: 'Mar', amount: 22_800 },
  { month: 'Apr', amount: 41_000 },
  { month: 'May', amount: 36_400 },
  { month: 'Jun', amount: 48_900 },
];

type SpendDatum = { month: string; amount: number };
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

type TooltipPayload = { active?: boolean; payload?: { payload: SpendDatum }[] };

const CustomTooltip = ({ active, payload }: TooltipPayload) => {
  if (!active || !payload?.length) return null;
  const { month, amount } = payload[0].payload;
  const isLatest = month === 'Jun';
  return (
    <div className="border-line/10 bg-panel rounded-lg border px-3 py-2 shadow-lg">
      <p className="text-content-muted mb-1 font-mono text-[11px] tracking-wide uppercase">
        {month}
      </p>
      <p
        className="font-display text-base font-semibold"
        style={{ color: isLatest ? 'var(--color-accent-fg)' : 'var(--color-content)' }}
      >
        ₦{amount.toLocaleString()}
      </p>
    </div>
  );
};

export function SpendChart() {
  const total = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="border-line/10 shadow-card bg-panel w-full rounded-xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-content-muted font-mono text-[11px] tracking-wide">
          6-MONTH TOTAL · ₦{total.toLocaleString()}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-content flex items-center gap-1.5 text-xs">
            <span className="bg-foreground inline-block size-2.5 rounded-sm" />
            Past months
          </span>
          <span className="text-accent-fg flex items-center gap-1.5 text-xs">
            <span className="bg-lime inline-block size-2.5 rounded-sm" />
            This month
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
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
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--color-content)', fontSize: 13 }}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="amount" shape={<RoundedBar />} isAnimationActive={false}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={i === data.length - 1 ? 'var(--color-lime)' : 'var(--color-content)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
