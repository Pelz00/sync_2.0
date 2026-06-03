'use client';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, LayoutGrid, List } from 'lucide-react';

interface ListingFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  searchValue: string;
  onSearchChange: (val: string) => void;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

const STATUS_OPTIONS = ['All Status', 'Active', 'Draft', 'Out of Stock'];

export function ListingFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  searchValue,
  onSearchChange,
  view,
  onViewChange,
}: ListingFiltersProps) {
  return (
    <div className="bg-panel shadow-card flex flex-col gap-4 rounded-xl p-4">
      {/* Search + category pills */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="text-muted absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
          <Input
            placeholder="Search listings..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 !ring-0 !outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                selectedCategory === cat
                  ? 'bg-lime-500 text-white'
                  : 'border-line/15 text-ink hover:bg-ink/5 border',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Status filter + view toggle */}
      <div className="flex items-center justify-between">
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border-line/15 text-ink bg-panel rounded-lg border px-3 py-2 text-sm focus:outline-none"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="border-line/15 flex items-center gap-1 rounded-lg border p-1">
          <button
            onClick={() => onViewChange('grid')}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              view === 'grid' ? 'bg-lime-500 text-white' : 'text-muted hover:bg-ink/5',
            )}
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              view === 'list' ? 'bg-lime-500 text-white' : 'text-muted hover:bg-ink/5',
            )}
          >
            <List className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
