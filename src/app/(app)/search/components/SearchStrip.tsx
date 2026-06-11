"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input, Button } from "@/components/ui";

export interface SearchQuery {
  area: string;
  budget: string;
  roomType: string;
}

interface SearchStripProps {
  query: SearchQuery;
  onQueryChange: (q: SearchQuery) => void;
  onSearch: () => void;
  activeFilters: string[];
  onRemoveFilter: (chip: string) => void;
  onClearAll: () => void;
  onMobileFilterOpen: () => void;
}

export default function SearchStrip({
  query,
  onQueryChange,
  onSearch,
  activeFilters,
  onRemoveFilter,
  onClearAll,
  onMobileFilterOpen,
}: SearchStripProps) {

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") onSearch();
  }

  return (
    <div className="md:sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-line/15 transition-colors duration-300">
      <div className="w-full mx-auto px-4 sm:px-6 pt-3.5 pb-2.5">

        {/* ── Search Bar Composite Strip Container ── */}
        <div className="flex flex-col md:flex-row items-stretch bg-panel border border-line/20 focus-within:border-lime/40 rounded-xl overflow-hidden shadow-sm transition-all">

          {/* Area Input Frame Area */}
          <div className="flex flex-col justify-center px-4 py-2 flex-1 border-b md:border-b-0 md:border-r border-line/15 min-w-0">
            <label className="text-[11px] uppercase tracking-widest font-bold text-content-muted/80 mb-0.5 select-none">
              Area / Campus
            </label>
            <Input
              type="text"
              value={query.area}
              onChange={e => onQueryChange({ ...query, area: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="e.g. UNILORIN PS"
              className="text-sm font-semibold text-content bg-transparent border-none! h-6 p-0 placeholder:text-content-muted/30 w-full transition-none" />
          </div>

          {/* Budget Input Frame Area */}
          <div className="flex flex-col justify-center px-4 py-2 flex-1 border-b md:border-b-0 md:border-r border-line/15 min-w-0">
            <label className="text-[11px] uppercase tracking-widest font-bold text-content-muted/80 mb-0.5 select-none">
              Budget
            </label>
            <Input
              type="text"
              value={query.budget}
              onChange={e => onQueryChange({ ...query, budget: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="e.g. ₦100k–₦250k"
              className="text-sm font-semibold text-content bg-transparent border-none! h-6 p-0 placeholder:text-content-muted/30 w-full transition-none" />
          </div>

          {/* Room type Input Frame Area */}
          <div className="flex flex-col justify-center px-4 py-2 flex-1 min-w-0">
            <label className="text-[11px] uppercase tracking-widest font-bold text-content-muted/80 mb-0.5 select-none">
              Room Type
            </label>
            <Input
              type="text"
              value={query.roomType}
              onChange={e => onQueryChange({ ...query, roomType: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Self-contain"
              className="text-sm font-semibold text-content bg-transparent border-none! h-6 p-0 placeholder:text-content-muted/30 w-full transition-none" />
          </div>

          {/* Commit Search Execution Button Group */}
          <div className="flex items-center p-2 bg-panel shrink-0">
            <Button
              type="button"
              onClick={onSearch}
              className="bg-lime text-ink font-semibold hover:opacity-90 transition-opacity h-9 w-full md:w-auto px-6 shadow-sm gap-2 whitespace-nowrap" >
              <Search size={13} className="hidden md:inline" />
              Search
            </Button>
          </div>
        </div>

        {/* ── Active Filters Applied State Chips Meta Matrix ── */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3 pb-0.5 flex-wrap">
            <span className="text-[11px] uppercase tracking-widest font-bold text-content-muted/80 mr-1 select-none">
              Active:
            </span>

            {activeFilters.map(chip => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 text-sm font-medium bg-surface-deep text-content border border-line/15 rounded-md pl-2.5 pr-1 py-1 shadow-xs" >
                {chip}
                <button
                  type="button"
                  onClick={() => onRemoveFilter(chip)}
                  className="w-4 h-4 flex items-center justify-center rounded-md hover:bg-content/10 text-content-muted transition-colors cursor-pointer"
                  aria-label={`Remove ${chip}`} >
                  <X size={11} />
                </button>
              </span>
            ))}

            <button
              type="button"
              onClick={onClearAll}
              className="text-[10px] font-bold uppercase tracking-widest text-content underline hover:opacity-80 transition-opacity ml-1.5 cursor-pointer" >
              Clear all
            </button>
          </div>
        )}

      </div>
    </div>
  );
}