"use client";
import { useState } from "react";
import type { VendorBar } from "../data";

export function TopVendorsChart({ data }: { data: VendorBar[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const maxVal = Math.max(...data.map(d => d.revenue));
  const sorted  = [...data].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="bg-panel rounded-2xl border border-line/15 shadow-sm p-5">
      <h3 className="text-sm font-bold text-content mb-5">Top Performing Vendors</h3>

      <div className="flex flex-col gap-4">
        {sorted.map((v, i) => {
          const pct = (v.revenue / maxVal) * 100;
          const isHov = hovered === v.name;

          return (
            <div key={v.name}
              className="flex items-center gap-3 cursor-pointer group"
              onMouseEnter={() => setHovered(v.name)}
              onMouseLeave={() => setHovered(null)} >
              {/* Rank */}
              <span className="text-xs font-black text-gray-300 w-4 shrink-0">{i + 1}</span>

              {/* Name */}
              <span className={`text-xs font-semibold w-28 shrink-0 truncate transition-colors ${
                isHov ? "text-[#5a9e00]" : "text-gray-500"
              }`}>
                {v.name}
              </span>

              {/* Bar */}
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    background: isHov
                      ? "linear-gradient(90deg,#b0f020,#90d505)"
                      : "linear-gradient(90deg,#90d505,#6aaf00)",
                  }} />
              </div>

              {/* Value */}
              <span className={`text-xs font-bold w-20 text-right shrink-0 transition-colors ${
                isHov ? "text-[#5a9e00]" : "text-content"
              }`}>
                ₦{(v.revenue / 1000).toFixed(0)}k
              </span>
            </div>
          );
        })}

        {/* X scale ticks */}
        <div className="flex items-center gap-3 mt-1">
          <span className="w-4 shrink-0" />
          <span className="w-28 shrink-0" />
          <div className="flex-1 flex justify-between">
            {[0, 150, 300, 450, 600].map(t => (
              <span key={t} className="text-[0.62rem] text-gray-300">{t === 0 ? "0" : `${t}k`}</span>
            ))}
          </div>
          <span className="w-20 shrink-0" />
        </div>
      </div>
    </div>
  );
}
