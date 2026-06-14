"use client";
import { useState } from "react";
import type { RevenuePoint } from "./data";

interface RevenueChartProps {
  data: RevenuePoint[];
}

const W = 580;
const H = 220;
const PADDING = { top: 20, right: 20, bottom: 36, left: 60 };
const CHART_W = W - PADDING.left - PADDING.right;
const CHART_H = H - PADDING.top - PADDING.bottom;

export function RevenueChart({ data }: RevenueChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const maxVal = Math.max(...data.map(d => d.revenue));
  const yMax = Math.ceil(maxVal / 20000) * 20000;
  const yTicks = [0, 20000, 40000, 60000, 80000].filter(t => t <= yMax + 10000);

  const barWidth = CHART_W / data.length;
  const barPad = barWidth * 0.25;

  return (
    <div className="bg-panel rounded-2xl border border-line/15 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-content">Revenue Overview</h3>
        <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full font-medium">₦ NGN</span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 280 }}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#90d505" />
              <stop offset="100%" stopColor="#6aaf00" />
            </linearGradient>
            <linearGradient id="barHov" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b0f020" />
              <stop offset="100%" stopColor="#90d505" />
            </linearGradient>
          </defs>

          {/* Y grid lines + labels */}
          {yTicks.map(tick => {
            const y = PADDING.top + CHART_H - (tick / yMax) * CHART_H;
            return (
              <g key={tick}>
                <line x1={PADDING.left} x2={W - PADDING.right} y1={y} y2={y}
                  stroke="#f0f0f0" strokeWidth="1" />
                <text x={PADDING.left - 8} y={y + 4} textAnchor="end"
                  fontSize="10" fill="#aaa" fontFamily="system-ui">
                  {tick === 0 ? "0" : `${tick / 1000}k`}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((d, i) => {
            const x = PADDING.left + i * barWidth + barPad / 2;
            const bw = barWidth - barPad;
            const bh = (d.revenue / yMax) * CHART_H;
            const y = PADDING.top + CHART_H - bh;
            const isHov = hovered === i;

            return (
              <g key={d.month}>
                <rect
                  x={x} y={y} width={bw} height={bh} rx="5"
                  fill={isHov ? "url(#barHov)" : "url(#barGrad)"}
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)} />
                {/* Month label */}
                <text
                  x={x + bw / 2} y={H - PADDING.bottom + 16}
                  textAnchor="middle" fontSize="11"
                  fill={isHov ? "#5a9e00" : "#999"} fontFamily="system-ui" fontWeight={isHov ? "700" : "400"} >
                  {d.month}
                </text>

                {/* Tooltip */}
                {isHov && (
                  <g>
                    <rect x={x + bw / 2 - 42} y={y - 36} width={84} height={28} rx="6" fill="white"
                      stroke="#e5e7eb" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))" />
                    <text x={x + bw / 2} y={y - 26} textAnchor="middle" fontSize="10" fill="#999" fontFamily="system-ui">{d.month}</text>
                    <text x={x + bw / 2} y={y - 14} textAnchor="middle" fontSize="11" fill="#90d505" fontFamily="system-ui" fontWeight="700">
                      ₦{d.revenue.toLocaleString()}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
