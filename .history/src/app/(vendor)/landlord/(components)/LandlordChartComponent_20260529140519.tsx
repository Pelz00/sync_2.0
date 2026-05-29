'use client';

import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { week: 'Feb W1', revenue: 3200 },
  { week: 'Feb W2', revenue: 4100 },
  { week: 'Feb W3', revenue: 3700 },
  { week: 'Mar W1', revenue: 5200 },
  { week: 'Mar W2', revenue: 4600 },
  { week: 'Mar W3', revenue: 5600 },
  { week: 'Mar W4', revenue: 5100 },
  { week: 'Apr W1', revenue: 6300 },
  { week: 'Apr W2', revenue: 6000 },
  { week: 'Apr W3', revenue: 6800 },
  { week: 'Apr W4', revenue: 6500 },
  { week: 'May W1', revenue: 7800 },
];

const RoundedBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  const r = 6;
  return (
    <path
      d={`M${x},${y + r} Q${x},${y} ${x + r},${y} H${x + width - r} Q${x + width},${y} ${x + width},${y + r} V${y + height} H${x} Z`}
      fill={fill}
    />
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const { week, revenue } = payload[0].payload;
  const isLatest = week === 'May W1';

  return (
    <div className="border-ink/10 rounded-lg border bg-white px-3 py-2 shadow-lg">
      <p className="text-muted mb-1 font-mono text-[11px] tracking-wide uppercase">{week}</p>
      <p
        className="font-display text-base font-semibold"
        style={{ color: isLatest ? '#7ab800' : '#1a1a1a' }}
      >
        ₦{revenue.toLocaleString()}
      </p>
    </div>
  );
};

export function LandlordChartComponent() {
  return (
    <div className="border-ink/10 shadow-card w-full rounded-xl border bg-white p-5">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          barCategoryGap="30%"
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tick={({ x, y, payload }) => {
              // Only render tick label if it contains a month name (no "W")
              const month = payload.value.split(' ')[0];
              const isFirst =
                ['Feb', 'Mar', 'Apr', 'May'].includes(month) && payload.value.endsWith('W1');
              return isFirst ? (
                <text x={x} y={y + 12} fill="#1a1a1a" fontSize={13} textAnchor="middle">
                  {month}
                </text>
              ) : (
                <g />
              );
            }}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="revenue" shape={<RoundedBar />} isAnimationActive={false}>
            {data.map((_, i) => (
              <Cell key={i} fill={i === data.length - 1 ? '#CAFF4D' : '#1a1a1a'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
