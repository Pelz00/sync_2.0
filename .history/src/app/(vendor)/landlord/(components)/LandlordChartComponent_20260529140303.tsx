'use client';

import { BarChart, Bar, XAxis, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Feb', revenue: 3200 },
  { week: '', revenue: 4100 },
  { week: '', revenue: 3700 },
  { week: 'Mar', revenue: 5200 },
  { week: '', revenue: 4600 },
  { week: '', revenue: 5600 },
  { week: '', revenue: 5100 },
  { week: 'Apr', revenue: 6300 },
  { week: '', revenue: 6000 },
  { week: '', revenue: 6800 },
  { week: '', revenue: 6500 },
  { week: 'May', revenue: 7800 },
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

export function LandlordChartComponent() {
  return (
    <div className="border-ink/10 shadow-card w-full rounded-xl border bg-white p-5">
      {/* Header */}
      {/* <div className="mb-6 flex items-center justify-between">
        <span className="text-muted font-mono text-xs tracking-widest uppercase">
          Revenue · Last 12 Weeks
        </span>
        <span className="font-display text-ink cursor-pointer text-sm select-none">Weekly ▾</span>
      </div> */}

      {/* Chart */}
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
            tick={{ fill: '#1a1a1a', fontSize: 13, fontFamily: 'inherit' }}
            interval={0}
          />
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
