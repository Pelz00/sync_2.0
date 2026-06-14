"use client";
import { useState } from "react";
import type { CategorySlice } from "../data";

const CX = 145; const CY = 145; const R = 105;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: +(cx + r * Math.cos(rad)).toFixed(2), y: +(cy + r * Math.sin(rad)).toFixed(2) };
}

function slicePath(cx: number, cy: number, r: number, a1: number, a2: number) {
  const s = polar(cx, cy, r, a1);
  const e = polar(cx, cy, r, a2);
  return `M${cx},${cy} L${s.x},${s.y} A${r},${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${e.x},${e.y} Z`;
}

export function CategoryPieChart({ data }: { data: CategorySlice[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  // Each slice starts at the cumulative sweep of the ones before it (no mutable
  // cursor) so this stays a pure render computation.
  const sweeps = data.map(d => (d.pct / 100) * 360);
  const slices = data.map((d, i) => {
    const sweep = sweeps[i];
    const start = sweeps.slice(0, i).reduce((a, b) => a + b, 0);
    const end = start + sweep - 0.8; // small gap
    const mid = start + (end - start) / 2;
    const lp = polar(CX, CY, R + 32, mid);
    const lp2 = polar(CX, CY, R + 16, mid);
    return { ...d, start, end, mid, lp, lp2 };
  });

  return (
    <div className="rounded-2xl border border-line/15 shadow-sm p-5">
      <h3 className="text-sm font-bold  mb-3">Sales by Category</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Pie */}
        <div className="shrink-0">
          <svg viewBox="0 0 290 290" width="260" height="260">
            {slices.map(s => {
              const isHov = hovered === s.label;
              const mid = s.start + (s.end - s.start) / 2;
              const ox = isHov ? Math.cos(((mid - 90) * Math.PI) / 180) * 8 : 0;
              const oy = isHov ? Math.sin(((mid - 90) * Math.PI) / 180) * 8 : 0;
              return (
                <g key={s.label} transform={`translate(${ox.toFixed(2)},${oy.toFixed(2)})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(s.label)}
                  onMouseLeave={() => setHovered(null)}>
                  <path
                    d={slicePath(CX, CY, R, s.start, s.end)}
                    fill={s.color}
                    opacity={hovered && !isHov ? 0.55 : 1}
                    className="transition-all duration-150" />
                  {/* Label line */}
                  <line
                    x1={polar(CX, CY, R - 4, s.mid).x} y1={polar(CX, CY, R - 4, s.mid).y}
                    x2={s.lp2.x} y2={s.lp2.y}
                    stroke={s.color} strokeWidth="1.2" opacity="0.5" />
                  <text x={s.lp.x} y={s.lp.y - 4} textAnchor="middle"
                    fontSize="9.5" fill={s.color} fontFamily="system-ui" fontWeight="700">
                    {s.label}
                  </text>
                  <text x={s.lp.x} y={s.lp.y + 8} textAnchor="middle"
                    fontSize="9" className="fill-content" fontFamily="system-ui" opacity="0.8">
                    {s.pct}%
                  </text>
                </g>
              );
            })}

            {/* Centre text on hover */}
            {hovered && (() => {
              const s = slices.find(sl => sl.label === hovered)!;
              return (
                <>
                  <circle cx={CX} cy={CY} r={42} fill="white" />
                  <text x={CX} y={CY - 6} textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="system-ui">{s.label}</text>
                  <text x={CX} y={CY + 14} textAnchor="middle" fontSize="22" fill={s.color} fontFamily="system-ui" fontWeight="900">{s.pct}%</text>
                </>
              );
            })()}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 w-full">
          {slices.map(s => (
            <div key={s.label}
              className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all ${
                hovered === s.label ? "bg-surface scale-[1.01]" : "hover:bg-gray-50/60"
              }`}
              onMouseEnter={() => setHovered(s.label)}
              onMouseLeave={() => setHovered(null)} >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                <span className="text-sm text-gray-600 font-medium">{s.label}</span>
              </div>
              <span className="text-sm font-bold text-gray-400">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
