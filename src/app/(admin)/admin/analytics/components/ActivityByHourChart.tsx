"use client";
import { useState } from "react";
import type { HourPoint } from "../data";

const W = 580; const H = 220;
const P = { top: 16, right: 16, bottom: 40, left: 44 };
const CW = W - P.left - P.right;
const CH = H - P.top - P.bottom;

export function ActivityByHourChart({ data }: { data: HourPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const maxVal = Math.max(...data.map(d => d.users));
  const yMax = Math.ceil(maxVal / 200) * 200;
  const yTicks = Array.from({ length: 5 }, (_, i) => i * (yMax / 4));

  function xPos(i: number) { return P.left + (i / (data.length - 1)) * CW; }
  function yPos(v: number) { return P.top + CH - (v / yMax) * CH; }

  const pathD = data.map((d, i) => `${i === 0 ? "M" : "L"}${xPos(i).toFixed(1)},${yPos(d.users).toFixed(1)}`).join(" ");
  const areaD = `${pathD} L${xPos(data.length-1).toFixed(1)},${(P.top+CH).toFixed(1)} L${P.left},${(P.top+CH).toFixed(1)} Z`;

  const hov  = hovered !== null ? data[hovered] : null;
  const hovX = hovered !== null ? xPos(hovered) : 0;
  const tipX = hovered !== null ? Math.min(Math.max(hovX - 44, P.left), W - P.right - 90) : 0;

  // Show every 3rd label
  const step = 3;

  return (
    <div className="rounded-2xl border border-line/15 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold">User Activity by Hour</h3>
        <span className="text-xs font-semibold text-[#5a9e00] bg-lime-50 px-2.5 py-1 rounded-full">
          Peak: 6 PM
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 300 }}
          onMouseLeave={() => setHovered(null)}>
          <defs>
            <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#90d505" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#90d505" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y grid */}
          {yTicks.map(t => {
            const y = yPos(t);
            return (
              <g key={t}>
                <line x1={P.left} x2={W - P.right} y1={y} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                <text x={P.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#bbb" fontFamily="system-ui">
                  {t === 0 ? "0" : t}
                </text>
              </g>
            );
          })}

          {/* Area + line */}
          <path d={areaD} fill="url(#actGrad)" />
          <path d={pathD} fill="none" stroke="#90d505" strokeWidth="2.5"
            strokeLinejoin="round" strokeLinecap="round" />

          {/* Hover target columns */}
          {data.map((_, i) => {
            const colW = CW / data.length;
            return (
              <rect key={i}
                x={xPos(i) - colW / 2} y={P.top}
                width={colW} height={CH}
                fill="transparent" className="cursor-crosshair"
                onMouseEnter={() => setHovered(i)}
              />
            );
          })}

          {/* Dots */}
          {data.map((d, i) => (
            <circle key={i}
              cx={xPos(i)} cy={yPos(d.users)}
              r={hovered === i ? 6 : 3.5}
              fill={hovered === i ? "#90d505" : "white"}
              stroke="#90d505" strokeWidth="2"
              className="pointer-events-none transition-all duration-100"
            />
          ))}

          {/* Hover guide + tooltip */}
          {hov && hovered !== null && (
            <g>
              <line x1={hovX} x2={hovX} y1={P.top} y2={P.top + CH}
                stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
              <rect x={tipX} y={yPos(hov.users) - 42} width={90} height={32} rx="7"
                fill="white" stroke="#e5e7eb" strokeWidth="1"
                filter="drop-shadow(0 2px 6px rgba(0,0,0,0.08))" />
              <text x={tipX + 45} y={yPos(hov.users) - 28} textAnchor="middle"
                fontSize="10" fill="#9ca3af" fontFamily="system-ui">{hov.hour}</text>
              <text x={tipX + 45} y={yPos(hov.users) - 15} textAnchor="middle"
                fontSize="11" fill="#90d505" fontFamily="system-ui" fontWeight="700">
                {hov.users} users
              </text>
            </g>
          )}

          {/* X axis labels */}
          {data.map((d, i) => i % step === 0 && (
            <text key={i} x={xPos(i)} y={H - P.bottom + 18} textAnchor="middle"
              fontSize="10" fill={hovered === i ? "#5a8a00" : "#bbb"} fontFamily="system-ui"
              fontWeight={hovered === i ? "700" : "400"}>
              {d.hour}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
