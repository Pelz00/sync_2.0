'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { RevenueDataPoint } from './types';

type ChartVariant = 'area' | 'bar';
type ChartPeriod = '3M' | '6M' | '1Y';

interface RevenueChartProps {
  title?: string;
  data: RevenueDataPoint[];
  variant?: ChartVariant;
  showPeriodSelector?: boolean;
  onPeriodChange?: (p: ChartPeriod) => void;
  activePeriod?: ChartPeriod;
  height?: number;
  accentColor?: string;
  baseColor?: string;
}

type AreaTooltipPayload = { active?: boolean; payload?: { payload: RevenueDataPoint }[] };

function AreaTooltipContent({ active, payload }: AreaTooltipPayload) {
  if (!active || !payload?.length) return null;
  const { label, revenue } = payload[0].payload;
  return (
    <div className="rounded-lg border border-line/10 bg-panel px-3 py-2 shadow-lg">
      <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-content-muted">{label}</p>
      <p className="font-display text-base font-semibold text-content">₦{revenue.toLocaleString()}</p>
    </div>
  );
}

type BarShapeProps = { x?: number; y?: number; width?: number; height?: number; fill?: string };
const RoundedBar = ({ x = 0, y = 0, width = 0, height = 0, fill }: BarShapeProps) => {
  const r = Math.min(5, width / 2);
  return (
    <path
      d={`M${x},${y + r} Q${x},${y} ${x + r},${y} H${x + width - r} Q${x + width},${y} ${x + width},${y + r} V${y + height} H${x} Z`}
      fill={fill}
    />
  );
};

export function RevenueChart({
  title = 'Monthly Revenue',
  data,
  variant = 'area',
  showPeriodSelector = true,
  onPeriodChange,
  activePeriod = '1Y',
  height = 220,
  accentColor = 'var(--color-lime, #CAFF4D)',
  baseColor = 'var(--color-content, #0f0f0f)',
}: RevenueChartProps) {
  const [period, setPeriod] = useState<ChartPeriod>(activePeriod);

  const handlePeriod = (p: ChartPeriod) => {
    setPeriod(p);
    onPeriodChange?.(p);
  };

  return (
    <div className="bg-panel shadow-card rounded-xl border border-line/10 p-5 w-full">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-base font-medium text-content">{title}</span>
        {showPeriodSelector && (
          <div className="flex items-center gap-1 rounded-lg bg-surface-deep p-1">
            {(['3M', '6M', '1Y'] as ChartPeriod[]).map((p) => (
              <button
                key={p}
                onClick={() => handlePeriod(p)}
                className={`rounded-md px-3 py-1 font-mono text-[11px] uppercase tracking-wide transition-colors ${
                  period === p
                    ? 'bg-violet-600 text-white'
                    : 'text-content-muted hover:text-content'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        {variant === 'area' ? (
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(139,92,246)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="rgb(139,92,246)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line, #e5e5e5)" strokeOpacity={0.4} vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-content-muted, #888)', fontSize: 12 }}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-content-muted, #888)', fontSize: 11 }}
              tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
              width={48}
            />
            <Tooltip content={<AreaTooltipContent />} cursor={{ stroke: 'rgb(139,92,246)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="rgb(139,92,246)"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
              dot={false}
              activeDot={{ r: 5, fill: 'rgb(139,92,246)', stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </AreaChart>
        ) : (
          <BarChart data={data} barCategoryGap="30%" margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-content-muted, #888)', fontSize: 11 }}
              tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
              width={48}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => {
                const month = payload.value.split(' ')[0];
                const isFirst = payload.value.endsWith('W1');
                return isFirst ? (
                  <text x={Number(x)} y={Number(y) + 12} fill="var(--color-content, #0f0f0f)" fontSize={12} textAnchor="middle">
                    {month}
                  </text>
                ) : <g />;
              }}
              interval={0}
            />
            <Tooltip content={<AreaTooltipContent />} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="revenue" shape={<RoundedBar />} isAnimationActive={false}>
              {data.map((_, i) => (
                <Cell key={i} fill={i === data.length - 1 ? accentColor : baseColor} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
