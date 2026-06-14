"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { TimeRange } from "../data";

const OPTIONS: TimeRange[] = ["Last 7 days", "Last 30 days", "Last 90 days", "Last year"];

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (v: TimeRange) => void;
}

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="bg-panel flex items-center gap-2 border border-line/10 rounded-xl px-4 py-2 text-sm font-semibold text-gray-500 transition-colors shadow-sm" >
        {value}
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-10 z-20 bg-panel border border-line/15 rounded-xl shadow-xl py-1.5 w-40 overflow-hidden">
          {OPTIONS.map(o => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              className={`flex items-center justify-between w-full px-4 py-2 text-sm transition-colors ${
                o === value
                  ? "text-[#5a9e00] font-bold bg-lime-50"
                  : " hover:bg-gray-50 font-medium"
              }`} >
              {o}
              {o === value && <span className="text-[#90d505] text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
