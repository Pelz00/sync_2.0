"use client";
import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ROOM_TYPES, AMENITIES, VERIFIED_BY, EMPTY_FILTERS,
  type SearchFilters, type RoomType, type Amenity, type VerifiedBy,
} from "../data";

interface FilterSidebarProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

// ─── Slider constants — must match data.ts range inputs ───────────────────────
const PRICE_MIN = 50;
const PRICE_MAX = 450;
const PRICE_RANGE = PRICE_MAX - PRICE_MIN; // 400

export default function FilterSidebar({
  filters, onChange, mobileOpen, onMobileClose,
}: FilterSidebarProps) {

  function setPriceMin(v: number) {
    onChange({ ...filters, priceMin: Math.min(v, filters.priceMax - 10) });
  }
  function setPriceMax(v: number) {
    onChange({ ...filters, priceMax: Math.max(v, filters.priceMin + 10) });
  }

  function toggle<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
  }

  function clearAll() {
    onChange(EMPTY_FILTERS);
  }

  const activeCount =
    filters.roomTypes.length +
    filters.amenities.length +
    filters.verifiedBy.length;

  // Convert value → % position along the track
  function pct(v: number) {
    return ((v - PRICE_MIN) / PRICE_RANGE) * 100;
  }

  const Panel = (
    <div className="flex flex-col h-full">

      {/* Sidebar header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#6abf3f]" />
          <span className="text-sm font-bold text-[#1a1a1a] tracking-wide uppercase">Filters</span>
          {activeCount > 0 && (
            <span className="text-[0.6rem] font-bold bg-[#6abf3f] text-white rounded-full w-5 h-5 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button onClick={clearAll} className="text-xs text-[#6abf3f] font-semibold hover:underline transition">
              Clear all
            </button>
          )}
          {onMobileClose && (
            <button onClick={onMobileClose} className="lg:hidden p-1 rounded-md hover:bg-gray-100">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Price range */}
      <FilterSection label="Price Range">
        <div className="px-1">
          {/* Track */}
          <div className="relative h-2 bg-[#e8e4d8] rounded-full mb-6">
            {/* Filled segment between thumbs */}
            <div
              className="absolute h-full bg-gradient-to-r from-[#6abf3f] to-[#4da82a] rounded-full pointer-events-none"
              style={{
                left:  `${pct(filters.priceMin)}%`,
                right: `${100 - pct(filters.priceMax)}%`, }} />

            {/* Min thumb — native input, pointer-events-auto so it's draggable */}
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={10}
              value={filters.priceMin}
              onChange={e => setPriceMin(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              style={{ zIndex: filters.priceMin >= filters.priceMax - 10 ? 5 : 3 }} />

            {/* Max thumb */}
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={10}
              value={filters.priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              style={{ zIndex: 4 }} />

            {/* Visual thumb min */}
            <div
              className="absolute top-1/2 w-4 h-4 bg-white border-2 border-[#6abf3f] rounded-full shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${pct(filters.priceMin)}%` }} />
            {/* Visual thumb max */}
            <div
              className="absolute top-1/2 w-4 h-4 bg-white border-2 border-[#6abf3f] rounded-full shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${pct(filters.priceMax)}%` }} />
          </div>

          {/* Labels */}
          <div className="flex justify-between">
            <span className="text-xs font-semibold text-[#1a1a1a] bg-[#f0ede4] px-2.5 py-1 rounded-lg">
              ₦{filters.priceMin}k
            </span>
            <span className="text-xs font-semibold text-[#1a1a1a] bg-[#f0ede4] px-2.5 py-1 rounded-lg">
              ₦{filters.priceMax}k
            </span>
          </div>
        </div>
      </FilterSection>

      {/* Room type */}
      <FilterSection label="Room Type">
        <div className="flex flex-col gap-2">
          {ROOM_TYPES.map(type => (
            <CheckItem
              key={type}
              label={type}
              checked={filters.roomTypes.includes(type)}
              onChange={() => onChange({ ...filters, roomTypes: toggle(filters.roomTypes, type) as RoomType[] })}
            />
          ))}
        </div>
      </FilterSection>

      {/* Amenities */}
      <FilterSection label="Amenities">
        <div className="flex flex-col gap-2">
          {AMENITIES.map(item => (
            <CheckItem
              key={item}
              label={item}
              checked={filters.amenities.includes(item)}
              onChange={() => onChange({ ...filters, amenities: toggle(filters.amenities, item) as Amenity[] })}
            />
          ))}
        </div>
      </FilterSection>

      {/* Verified by */}
      <FilterSection label="Verified By">
        <div className="flex flex-col gap-2">
          {VERIFIED_BY.map(item => (
            <CheckItem
              key={item}
              label={item}
              checked={filters.verifiedBy.includes(item)}
              onChange={() => onChange({ ...filters, verifiedBy: toggle(filters.verifiedBy, item) as VerifiedBy[] })}
            />
          ))}
        </div>
      </FilterSection>

    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[220px] flex-shrink-0 sticky top-[130px] self-start max-h-[calc(100vh-160px)] overflow-y-auto pr-2 pb-8">
        {Panel}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />
          <div className="relative bg-white w-[280px] h-full overflow-y-auto p-6 shadow-2xl">
            {Panel}
          </div>
        </div>
      )}
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-5 border-b border-[#ece9e0] pb-5 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full mb-3 group" >
        <span className="text-[0.65rem] font-bold tracking-widest uppercase text-[#9a9a8a] group-hover:text-[#1a1a1a] transition-colors">
          {label}
        </span>
        <ChevronDown
          size={14}
          className="text-[#9a9a8a] transition-transform duration-200"
          style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }} />
      </button>
      {open && children}
    </div>
  );
}

function CheckItem({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded-[4px] border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
          checked
            ? "bg-[#6abf3f] border-[#6abf3f] scale-105"
            : "border-[#c8c4b4] group-hover:border-[#6abf3f]" }`} >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.2 5.5L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className={`text-sm transition-colors ${checked ? "text-[#1a1a1a] font-medium" : "text-[#5a5a4a] group-hover:text-[#1a1a1a]"}`}>
        {label}
      </span>
    </label>
  );
}