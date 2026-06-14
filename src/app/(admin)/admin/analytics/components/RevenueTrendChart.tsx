"use client";
import { useState } from "react";
import type { TrendPoint } from "../data";

const W = 1100; const H = 210;
const P = { top: 20, right: 48, bottom: 44, left: 58 };
const CW = W - P.left - P.right;
const CH = H - P.top - P.bottom;

function nice(max: number, steps: number) {
  const raw  = max / steps;
  const mag  = Math.pow(10, Math.floor(Math.log10(raw)));
  const nice = [1,2,5,10].map(f => f * mag).find(v => v >= raw) ?? mag * 10;
  return nice * steps;
}

export function RevenueTrendChart({ data }: { data: TrendPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const maxRev  = Math.max(...data.map(d => d.revenue));
  const maxOrd  = Math.max(...data.map(d => d.orders));
  const revMax  = nice(maxRev, 4);
  const ordMax  = nice(maxOrd, 4);
  const revStep = revMax / 4;
  const ordStep = ordMax / 4;

  function xPos(i: number) { return P.left + (i / Math.max(data.length - 1, 1)) * CW; }
  function yRev(v: number) { return P.top + CH - (v / revMax) * CH; }
  function yOrd(v: number) { return P.top + CH - (v / ordMax) * CH; }

  const revPath = data.map((d, i) => `${i === 0 ? "M" : "L"}${xPos(i).toFixed(1)},${yRev(d.revenue).toFixed(1)}`).join(" ");
  const ordPath = data.map((d, i) => `${i === 0 ? "M" : "L"}${xPos(i).toFixed(1)},${yOrd(d.orders).toFixed(1)}`).join(" ");
  const revArea = `${revPath} L${xPos(data.length-1).toFixed(1)},${(P.top+CH).toFixed(1)} L${P.left},${(P.top+CH).toFixed(1)} Z`;
  const ordArea = `${ordPath} L${xPos(data.length-1).toFixed(1)},${(P.top+CH).toFixed(1)} L${P.left},${(P.top+CH).toFixed(1)} Z`;

  // Label density based on dataset size
  const labelStep = data.length <= 7 ? 1 : data.length <= 30 ? 5 : data.length <= 90 ? 14 : 21;

  const hov = hovered !== null ? data[hovered] : null;
  const hovX = hovered !== null ? xPos(hovered) : 0;
  const tipW = 120;
  const tipX = Math.min(Math.max(hovX - tipW / 2, P.left), W - P.right - tipW);

  return (
    <div className="bg-panel rounded-2xl border border-line/15 shadow-sm p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold">Revenue &amp; Orders Trend</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <div className="w-5 h-0.5 bg-[#90d505] rounded" /> Revenue (₦)
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <div className="w-5 h-0.5 bg-blue-500 rounded" /> Orders
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 420 }}
          onMouseLeave={() => setHovered(null)}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#90d505" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#90d505" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y grid lines + left labels (revenue) */}
          {Array.from({ length: 5 }, (_, i) => i * revStep).map(t => {
            const y = yRev(t);
            return (
              <g key={`rev-${t}`}>
                <line x1={P.left} x2={W - P.right} y1={y} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                <text x={P.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#bbb" fontFamily="system-ui">
                  {t === 0 ? "0" : t >= 1000 ? `${(t/1000).toFixed(0)}k` : t}
                </text>
              </g>
            );
          })}

          {/* Right y axis (orders) */}
          {Array.from({ length: 5 }, (_, i) => i * ordStep).map(t => {
            const y = yOrd(t);
            return (
              <text key={`ord-${t}`} x={W - P.right + 6} y={y + 4} textAnchor="start"
                fontSize="10" fill="#93c5fd" fontFamily="system-ui">
                {t === 0 ? "0" : t >= 1000 ? `${(t/1000).toFixed(0)}k` : t}
              </text>
            );
          })}

          {/* Area fills */}
          <path d={revArea} fill="url(#revGrad)" />
          <path d={ordArea} fill="url(#ordGrad)" />

          {/* Lines */}
          <path d={revPath} fill="none" stroke="#90d505" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          <path d={ordPath} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {/* Invisible hover target columns */}
          {data.map((_, i) => {
            const colW = CW / data.length;
            return (
              <rect key={i}
                x={xPos(i) - colW / 2} y={P.top}
                width={colW} height={CH}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHovered(i)}
              />
            );
          })}

          {/* Hover vertical + dots + tooltip */}
          {hov && hovered !== null && (
            <g>
              <line x1={hovX} x2={hovX} y1={P.top} y2={P.top + CH}
                stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,3" />
              <circle cx={hovX} cy={yRev(hov.revenue)} r="5" fill="#90d505" stroke="white" strokeWidth="2.5" />
              <circle cx={hovX} cy={yOrd(hov.orders)}  r="5" fill="#3b82f6" stroke="white" strokeWidth="2.5" />
              {/* Tooltip box */}
              <rect x={tipX} y={P.top + 2} width={tipW} height={46} rx="8"
                fill="white" stroke="#e5e7eb" strokeWidth="1"
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.10))" />
              <text x={tipX + tipW/2} y={P.top + 16} textAnchor="middle"
                fontSize="10" fill="#9ca3af" fontFamily="system-ui">{hov.date}</text>
              <text x={tipX + 10} y={P.top + 32} fontSize="11" fill="#90d505" fontFamily="system-ui" fontWeight="700">
                ₦{hov.revenue.toLocaleString()}
              </text>
              <text x={tipX + tipW - 10} y={P.top + 32} textAnchor="end" fontSize="11" fill="#3b82f6" fontFamily="system-ui" fontWeight="700">
                {hov.orders} ord
              </text>
            </g>
          )}

          {/* X axis labels */}
          {data.map((d, i) => i % labelStep === 0 && (
            <text key={i} x={xPos(i)} y={H - P.bottom + 18} textAnchor="middle"
              fontSize="10" fill={hovered === i ? "#5a8a00" : "#bbb"} fontFamily="system-ui"
              fontWeight={hovered === i ? "700" : "400"}>
              {d.date}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
