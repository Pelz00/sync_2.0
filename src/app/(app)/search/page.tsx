"use client";
import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import SearchStrip, { type SearchQuery } from "./components/SearchStrip";
import FilterSidebar from "./components/FilterSidebar";
import ResultsHeader from "./components/ResultsHeader";
import ListingCard from "./components/ListingCard";
import { ALL_LISTINGS, DEFAULT_FILTERS, EMPTY_FILTERS,
  type SearchFilters, type SortOption, type ViewMode, type RoomType, type Amenity,
} from "./data";

const DEFAULT_QUERY: SearchQuery = {
  area: "UNILORIN PS",
  budget: "₦100k–₦250k",
  roomType: "Self-contain",
};

const EMPTY_QUERY: SearchQuery = {
  area: "",
  budget: "",
  roomType: "",
};

export default function SearchPage() {
  const [query, setQuery] = useState<SearchQuery>(DEFAULT_QUERY);
  const [submitted, setSubmitted] = useState<SearchQuery>(DEFAULT_QUERY);
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("Best match");
  const [view, setView] = useState<ViewMode>("List");
  const [mobileOpen, setMobile] = useState(false);

  // ── Commit search bar values → results ────────────────────────────────────
  function handleSearch() {
    setSubmitted(query);
  }

  // ── Remove a single chip ──────────────────────────────────────────────────
  function handleRemoveFilter(chip: string) {
    // Amenity chip: "+ Wi-Fi" etc.
    if (chip.startsWith("+ ")) {
      const amenity = chip.slice(2) as Amenity;
      setFilters(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }));
      return;
    }
    // Room type chip (from sidebar roomTypes)
    if (filters.roomTypes.includes(chip as RoomType)) {
      setFilters(prev => ({ ...prev, roomTypes: prev.roomTypes.filter(r => r !== chip) }));
      return;
    }
    // Search bar chips — clear both submitted and typed query
    if (chip === submitted.area) {
      setSubmitted(prev => ({ ...prev, area: "" }));
      setQuery(prev => ({ ...prev, area: "" }));
    }
    if (chip === submitted.budget) {
      setSubmitted(prev => ({ ...prev, budget: "" }));
      setQuery(prev => ({ ...prev, budget: "" }));
    }
    if (chip === submitted.roomType) {
      setSubmitted(prev => ({ ...prev, roomType: "" }));
      setQuery(prev => ({ ...prev, roomType: "" }));
    }
  }

  // ── Clear everything — inputs + sidebar filters ───────────────────────────
  function handleClearAll() {
    setQuery(EMPTY_QUERY);
    setSubmitted(EMPTY_QUERY);
    setFilters(EMPTY_FILTERS);
  }

  // ── Build active chips from ALL active state ──────────────────────────────
  const activeChips = useMemo(() => {
    const chips: string[] = [];
    if (submitted.area) chips.push(submitted.area);
    if (submitted.budget) chips.push(submitted.budget);
    if (submitted.roomType) chips.push(submitted.roomType);
    filters.roomTypes.forEach(r => {
      if (!chips.includes(r)) chips.push(r);
    });
    filters.amenities.forEach(a => chips.push(`+ ${a}`));
    return chips;
  }, [submitted, filters.roomTypes, filters.amenities]);

  // ── Filter + sort listings ────────────────────────────────────────────────
  const results = useMemo(() => {
    let list = ALL_LISTINGS.filter(l => {
      if (l.price < filters.priceMin || l.price > filters.priceMax) return false;
      if (filters.roomTypes.length && !filters.roomTypes.includes(l.roomType)) return false;
      if (filters.amenities.length && !filters.amenities.every(a => l.amenities.includes(a))) return false;
      if (filters.verifiedBy.includes("Sync team visit") && !l.verified) return false;
      if (submitted.area && !l.area.toLowerCase().includes(submitted.area.toLowerCase())) return false;
      if (submitted.roomType && !l.roomType.toLowerCase().includes(submitted.roomType.toLowerCase())) return false;
      return true;
    });

    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Highest rated") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [filters, sort, submitted]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <SearchStrip
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        activeFilters={activeChips}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
        onMobileFilterOpen={() => setMobile(true)}/>

      <div className="max-w-275 mx-auto px-4 sm:px-6 pb-16">
        <div className="flex gap-6">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            mobileOpen={mobileOpen}
            onMobileClose={() => setMobile(false)} />

          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <div className="flex lg:hidden items-center pt-4 pb-1">
              <button
                onClick={() => setMobile(true)}
                className="flex items-center gap-2 text-sm font-semibold border-2 border-[#e0ddd4] bg-white rounded-xl px-4 py-2 hover:border-[#6abf3f] transition-colors" >
                <SlidersHorizontal size={15} className="text-[#6abf3f]" />
                Filters
              </button>
            </div>

            <ResultsHeader
              count={results.length}
              area={submitted.area || "All areas"}
              campus="UNILORIN PS"
              radius="2km"
              sort={sort}
              view={view}
              onSortChange={setSort}
              onViewChange={setView} />

            {results.length === 0 ? (
              <EmptyState onReset={handleClearAll} />
            ) : view === "List" ? (
              <div className="flex flex-col gap-4">
                {results.map(l => <ListingCard key={l.id} listing={l} view="List" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map(l => <ListingCard key={l.id} listing={l} view="Grid" />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#f0ede4] flex items-center justify-center mb-4 text-3xl">🏠</div>
      <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">No hostels match your filters</h3>
      <p className="text-sm text-[#9a9a8a] mb-5 max-w-xs">
        Try adjusting your price range, room type, or amenities to see more options.
      </p>
      <button
        onClick={onReset}
        className="bg-[#6abf3f] hover:bg-[#5aaf2f] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all active:scale-95" >
        Reset filters
      </button>
    </div>
  );
}