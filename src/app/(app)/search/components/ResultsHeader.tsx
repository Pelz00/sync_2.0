"use client";

import { LayoutGrid, List } from "lucide-react";
import { SORT_OPTIONS, type SortOption, type ViewMode } from "../data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
  count, area, campus, radius, sort, view, onSortChange, onViewChange,
}: ResultsHeaderProps) {
  return (
    <div className="flex items-start justify-between py-4 gap-3 flex-wrap bg-surface transition-colors duration-300">
      <div>
        <h2 className="text-xl sm:text-3xl font-display font-bold text-content tracking-tight leading-tight">
          {count} hostels{" "}
          <span className="text-green-600 font-bold italic">
            near you
          </span>
        </h2>
        <p className="text-xs font-medium text-content-muted/80 mt-1">
          {area || "All Areas"} · {campus} · within {radius}
        </p>
      </div>

      {/* Right control layer row interactions container */}
      <div className="flex items-center gap-2 flex-wrap">
        <Select value={sort} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-[160px] h-9 text-xs font-semibold border-line/15 bg-panel text-content focus:ring-lime/40 rounded-full shadow-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-panel border-line/15 text-content rounded-md shadow-pop">
            {SORT_OPTIONS.map((option) => (
              <SelectItem 
                key={option} 
                value={option}
                className="text-xs font-medium focus:bg-surface-deep focus:text-content cursor-pointer" >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Semantic Custom Grid / List Layout Filter View Toggle Segment Frame */}
        <div className="flex items-center bg-panel border border-line/15 rounded-full p-0.5 shadow-xs overflow-hidden h-9">
          {(["Grid", "List"] as ViewMode[]).map((mode) => {
            const isActive = view === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => onViewChange(mode)}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-bold px-3 h-full rounded-full transition-all duration-150 cursor-pointer select-none",
                  isActive
                    ? "bg-surface-deep text-content border border-line/10 shadow-xs"
                    : "text-content-muted/60 hover:text-content hover:bg-surface-deep/40"
                )}
              >
                {mode === "Grid" ? <LayoutGrid size={13} /> : <List size={13} />}
                <span className="hidden sm:inline font-mono text-[11px] font-semibold">{mode}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}