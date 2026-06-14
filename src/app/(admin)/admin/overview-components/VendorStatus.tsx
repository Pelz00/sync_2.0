"use client";
import { useState } from "react";
import type { VendorStatusData } from "./data";

interface VendorStatusProps {
  data: VendorStatusData;
}

const SEGMENTS = [
  { key: "active" as const, label: "Active", color: "#90d505", hoverColor: "#a8e800" },
  { key: "pending" as const, label: "Pending", color: "#f97316", hoverColor: "#fb923c" },
  { key: "suspended" as const, label: "Suspended", color: "#ef4444", hoverColor: "#f87171" },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

export function VendorStatus({ data }: VendorStatusProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const total = data.active + data.pending + data.suspended;
  const values = { active: data.active, pending: data.pending, suspended: data.suspended };

  const cx = 80; const cy = 80; const r = 58; const strokeW = 18;

  // Build segments. Compute each arc's start as the cumulative sweep of the ones
  // before it (no mutable cursor) so this stays a pure render computation.
  const START = -90; // start from top
  const sweeps = SEGMENTS.map(seg => (values[seg.key] / total) * 360);
  const arcs = SEGMENTS.map((seg, i) => {
    const sweep = sweeps[i];
    const start = START + sweeps.slice(0, i).reduce((a, b) => a + b, 0);
    const end = start + sweep - 2; // 2deg gap
    return { ...seg, start, end, value: values[seg.key], pct: sweep / 360 };
  });

  const hovered = arcs.find(a => a.key === hoveredKey);

  return (
    <div className="bg-panel rounded-2xl border border-line/15 shadow-sm p-5 flex flex-col">
      <h3 className="text-sm font-bold text-content mb-4">Vendor Status</h3>

      <div className="flex flex-col items-center">
        {/* Donut */}
        <div className="relative mb-4">
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth={strokeW} />

            {/* Segments */}
            {arcs.map(arc => (
              <path
                key={arc.key}
                d={arcPath(cx, cy, r, arc.start, arc.end)}
                fill="none"
                stroke={hoveredKey === arc.key ? arc.hoverColor : arc.color}
                strokeWidth={hoveredKey === arc.key ? strokeW + 4 : strokeW}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredKey(arc.key)}
                onMouseLeave={() => setHoveredKey(null)}
              />
            ))}

            {/* Centre label */}
            {hovered ? (
              <>
                <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="#6b7280" fontFamily="system-ui">
                  {hovered.label}
                </text>
                <text x={cx} y={cy + 10} textAnchor="middle" fontSize="16" fill={hovered.color} fontFamily="system-ui" fontWeight="800">
                  {hovered.value.toLocaleString()}
                </text>
              </>
            ) : (
              <>
                <text x={cx} y={cy - 4} textAnchor="middle" fontSize="10" fontFamily="system-ui" className="fill-content font-bold uppercase tracking-wider">Total</text>
                <text x={cx} y={cy + 12} textAnchor="middle" fontSize="18" fontFamily="system-ui" fontWeight="900" className="fill-content font-display font-bold tracking-tight">
                  {total.toLocaleString()}
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="w-full flex flex-col gap-2">
          {arcs.map(arc => (
            <div
              key={arc.key}
              className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 ${
                hoveredKey === arc.key ? "bg-gray-50" : "hover:bg-gray-50/60"
              }`}
              onMouseEnter={() => setHoveredKey(arc.key)}
              onMouseLeave={() => setHoveredKey(null)} >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: arc.color }} />
                <span className="text-sm text-gray-600 font-medium">{arc.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{(arc.pct * 100).toFixed(0)}%</span>
                <span className="text-sm font-bold text-gray-800">{arc.value.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
