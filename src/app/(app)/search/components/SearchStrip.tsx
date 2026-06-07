"use client";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui";

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

export default function SearchStrip({ query, onQueryChange, onSearch, activeFilters, onRemoveFilter, onClearAll, onMobileFilterOpen,
}: SearchStripProps) {

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") onSearch();
  }

  return (
    <div className="md:sticky top-0 z-30 bg-[#f7f4ec]/95 backdrop-blur-md border-b border-[#e8e4d8]">
      <div className="max-w-275 mx-auto px-4 sm:px-6 pt-3 pb-2">

        {/* ── Search pill ── */}
        <div className="flex flex-col md:flex-row items-stretch bg-white border border-[#73d764] rounded-xl overflow-hidden shadow-sm">

          {/* Area */}
          <div className="flex flex-col justify-center px-4 py-2.5 flex-1 border-r border-[#f0ede4] min-w-0">
            <label className="text-[0.55rem] tracking-widest uppercase text-[#9a9a8a] mb-0.5 select-none">
              Area / Campus
            </label>
            <Input
              type="text"
              value={query.area}
              onChange={e => onQueryChange({ ...query, area: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="e.g. UNILORIN PS"
              className="text-sm font-semibold text-[#1a1a1a] bg-transparent outline-none! ring-0! placeholder:text-[#c8c4b4] w-full" />
          </div>

          {/* Budget */}
          <div className="flex flex-col justify-center px-4 md:py-2.5 flex-1 border-r border-[#f0ede4]">
            <label className="text-[0.55rem] tracking-widest uppercase text-[#9a9a8a] mb-0.5 select-none">
              Budget
            </label>
            <Input
              type="text"
              value={query.budget}
              onChange={e => onQueryChange({ ...query, budget: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="e.g. ₦100k–₦250k"
              className="text-sm font-semibold text-[#1a1a1a] bg-transparent outline-none! ring-0! placeholder:text-[#c8c4b4] w-full" />
          </div>

          {/* Room type */}
          <div className="flex flex-col justify-center px-4 py-2.5 flex-1">
            <label className="text-[0.55rem] tracking-widest uppercase text-[#9a9a8a] mb-0.5 select-none">
              Room Type
            </label>
            <Input
              type="text"
              value={query.roomType}
              onChange={e => onQueryChange({ ...query, roomType: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Self-contain"
              className="text-sm font-semibold text-[#1a1a1a] bg-transparent outline-none! ring-0! placeholder:text-[#c8c4b4] w-full" />
          </div>

          {/* Mobile: open filter drawer */}

          {/* Search button */}
          <button
            onClick={onSearch}
            className="flex items-center justify-center text-[16px] gap-2 bg-[#6abf3f] hover:bg-[#5aaf2f] active:scale-95 transition-all text-white font-bold md:text-sm w-[90%] md:w-fit m-auto mb-2 px-5 py-2.5 md:py-4 h-fit self-end cursor-pointer sm:px-8 md:m-1.5 rounded-lg whitespace-nowrap" >
            <Search size={14} className="hidden sm:block" />
            Search
          </button>
        </div>

        {/* ── Active filter chips ── */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5 pb-1 flex-wrap">
            <span className="text-[0.6rem] tracking-widest uppercase text-[#9a9a8a] mr-0.5">
              Active:
            </span>

            {activeFilters.map(chip => (
              <span
                key={chip}
                className="flex items-center gap-1.5 text-xs font-semibold bg-[#1a1a1a] text-white rounded-full pl-3 pr-1.5 py-1" >
                {chip}
                <button
                  onClick={() => onRemoveFilter(chip)}
                  className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  aria-label={`Remove ${chip}`} >
                  <X size={10} />
                </button>
              </span>
            ))}

            <button
              onClick={onClearAll}
              className="text-xs text-[#6abf3f] font-semibold hover:underline underline-offset-2 transition ml-1" >
              Clear all
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
