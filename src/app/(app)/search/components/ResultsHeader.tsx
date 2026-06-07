"use client";
import { LayoutGrid, List, ChevronDown } from "lucide-react";
import { SORT_OPTIONS, type SortOption, type ViewMode } from "../data";

interface ResultsHeaderProps {
  count: number;
  area: string;
  campus: string;
  radius: string;
  sort: SortOption;
  view: ViewMode;
  onSortChange: (s: SortOption) => void;
  onViewChange: (v: ViewMode) => void;
}

export default function ResultsHeader({
  count, area, campus, radius,
  sort, view, onSortChange, onViewChange,
}: ResultsHeaderProps) {
  return (
    <div className="flex items-start justify-between py-5 gap-3 flex-wrap">
      {/* Left: count + subtitle */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] leading-tight">
          {count} hostels{" "}
          <span className="text-[#6abf3f] italic" style={{ fontFamily: "ui-sans-serif, sans-serif" }}>
            near you
          </span>
        </h2>
        <p className="text-xs text-[#9a9a8a] mt-1 font-medium">
          {area} · {campus} · within {radius}
        </p>
      </div>

      {/* Right: sort + view */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sort}
            onChange={e => onSortChange(e.target.value as SortOption)}
            className="appearance-none text-xs font-semibold border-2 border-[#e0ddd4] hover:border-[#6abf3f] bg-white rounded-xl px-4 py-2 pr-7 text-[#3a3a2a] cursor-pointer transition-colors outline-none! ring-0!">
            {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9a9a8a] text-xs" />
        </div>

        {/* Grid / List toggle */}
        <div className="flex items-center bg-white border-2 border-[#e0ddd4] rounded-xl overflow-hidden">
          {(["Grid", "List"] as ViewMode[]).map(v => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 transition-all duration-200 ${
                view === v
                  ? "bg-[#1a1a1a] text-white"
                  : "text-[#9a9a8a] hover:text-[#1a1a1a] hover:bg-[#f7f4ec]" }`} >
              {v === "Grid" ? <LayoutGrid size={14} /> : <List size={14} />}
              <span className="hidden sm:inline">{v}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
