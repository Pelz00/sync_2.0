"use client";

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ROOM_TYPES, AMENITIES, VERIFIED_BY, EMPTY_FILTERS,
  type SearchFilters, type RoomType, type Amenity, type VerifiedBy,
} from "../data";
import { Input, Button, Checkbox } from "@/components/ui";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

// ─── Slider constants —  ───────────────────────
const PRICE_MIN = 50;
const PRICE_MAX = 450;
const PRICE_RANGE = PRICE_MAX - PRICE_MIN;

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

  function pct(v: number) {
    return ((v - PRICE_MIN) / PRICE_RANGE) * 100;
  }

  const Panel = (
    <div className="flex flex-col h-full bg-panel p-3 rounded-lg">

      {/* Sidebar header block header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-content" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-content">Filters</span>
          {activeCount > 0 && (
            <span className="text-[10px] font-mono font-bold bg-lime text-ink rounded-md min-w-[18px] h-[18px] px-1 flex items-center justify-center shadow-xs">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button 
              type="button"
              onClick={clearAll} 
              className="text-[10px] font-bold uppercase tracking-widest text-content hover:opacity-80 transition-opacity cursor-pointer">
              Clear all
            </button>
          )}
          {onMobileClose && (
            <Button 
              type="button"
              variant="ghost"
              size="icon"
              onClick={onMobileClose} 
              className="lg:hidden h-7 w-7 rounded-md border border-line/15 hover:bg-surface-deep text-content-muted transition-colors cursor-pointer">
              <X size={14} />
            </Button>
          )}
        </div>
      </div>

      {/* Input Sections */}
      <div className="flex-1 overflow-y-auto space-y-5 CustomScrollbar pr-1">
        
        {/* Price range dual range multi range element box slider layout */}
        <FilterSection label="Price Range">
          <div className="px-1 pt-1">
            <div className="relative h-1.5 bg-surface-deep border border-line/10 rounded-full mb-5">
              <div
                className="absolute h-full bg-lime rounded-full pointer-events-none"
                style={{
                  left:  `${pct(filters.priceMin)}%`,
                  right: `${100 - pct(filters.priceMax)}%`, }} />

              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={10}
                value={filters.priceMin}
                onChange={e => setPriceMin(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ zIndex: filters.priceMin >= filters.priceMax - 10 ? 5 : 3 }} />

              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={10}
                value={filters.priceMax}
                onChange={e => setPriceMax(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ zIndex: 4 }} />

              <div
                className="absolute top-1/2 w-3.5 h-3.5 bg-panel border-2 border-lime rounded-full shadow-sm -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${pct(filters.priceMin)}%` }} />
              <div
                className="absolute top-1/2 w-3.5 h-3.5 bg-panel border-2 border-lime rounded-full shadow-sm -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${pct(filters.priceMax)}%` }} />
            </div>

            {/* Price numeric pill label display indicators array */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-semibold text-content bg-surface-deep border border-line/15 px-2 py-0.5 rounded-md shadow-xs">
                ₦{filters.priceMin}k
              </span>
              <span className="text-xs font-mono font-semibold text-content bg-surface-deep border border-line/15 px-2 py-0.5 rounded-md shadow-xs">
                ₦{filters.priceMax}k
              </span>
            </div>
          </div>
        </FilterSection>

        {/* Room type list array selector block layout row check item elements */}
        <FilterSection label="Room Type">
          <div className="flex flex-col gap-2.5">
            {ROOM_TYPES.map(type => (
              <CheckItem
                key={type}
                label={type}
                checked={filters.roomTypes.includes(type)}
                onCheckedChange={() => onChange({ ...filters, roomTypes: toggle(filters.roomTypes, type) as RoomType[] })}
              />
            ))}
          </div>
        </FilterSection>

        {/* Amenities options checkboxes loop layout */}
        <FilterSection label="Amenities">
          <div className="flex flex-col gap-2.5">
            {AMENITIES.map(item => (
              <CheckItem
                key={item}
                label={item}
                checked={filters.amenities.includes(item)}
                onCheckedChange={() => onChange({ ...filters, amenities: toggle(filters.amenities, item) as Amenity[] })}
              />
            ))}
          </div>
        </FilterSection>

        {/* Verified by system matrix checkbox array loops listing item box config */}
        <FilterSection label="Verified By">
          <div className="flex flex-col gap-2.5">
            {VERIFIED_BY.map(item => (
              <CheckItem
                key={item}
                label={item}
                checked={filters.verifiedBy.includes(item)}
                onCheckedChange={() => onChange({ ...filters, verifiedBy: toggle(filters.verifiedBy, item) as VerifiedBy[] })}
              />
            ))}
          </div>
        </FilterSection>

      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-52 shrink-0 sticky top-[138px] self-start max-h-[calc(100vh-170px)] flex flex-col pb-4">
        {Panel}
      </aside>

      {/* Mobile structure */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300" onClick={onMobileClose} />
          <div className="relative bg-panel border-r border-line/15 w-[280px] h-full flex flex-col p-5 shadow-pop transition-transform duration-300">
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
    <div className="border-b border-line/15 pb-4 last:border-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full mb-2.5 group cursor-pointer" >
        <span className="text-[9px] uppercase tracking-widest font-bold text-content-muted/80 group-hover:text-content transition-colors">
          {label}
        </span>
        <ChevronDown
          size={14}
          className={cn(
            "text-content-muted/50 group-hover:text-content transition-transform duration-200 ease-out",
            !open && "-rotate-90"
          )} />
      </button>
      {open && children}
    </div>
  );
}

interface CheckItemProps {
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
}

function CheckItem({ label, checked, onCheckedChange }: CheckItemProps) {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="h-3.5 w-3.5 border-line/20 shadow-xs focus-visible:ring-lime data-[state=checked]:bg-lime data-[state=checked]:border-lime data-[state=checked]:text-ink"
      />
      <label
        htmlFor={label}
        className={cn(
          "text-xs transition-colors antialiased cursor-pointer font-normal",
          checked ? "text-content font-medium" : "text-content-muted/90 group-hover:text-content"
        )} >
        {label}
      </label>
    </div>
  );
}