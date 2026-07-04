'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, LayoutGrid, List } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  allSelected: boolean;
  someSelected: boolean;
  selectedCount: number;
  onToggleSelectAll: () => void;
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
  allSelected,
  someSelected,
  selectedCount,
  onToggleSelectAll,
}: ListingFiltersProps) {
  return (
    <div className="bg-panel shadow-card border-line/5 rounded-xl border p-5">
      {/* Top Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side */}
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Select All */}
          <div className="border-line/10 bg-background flex shrink-0 items-center gap-3 rounded-lg border px-3 py-2">
            <Checkbox
              checked={allSelected ? true : someSelected ? 'indeterminate' : false}
              onCheckedChange={onToggleSelectAll}
            />

            <span className="text-sm font-medium">
              {selectedCount > 0 ? `${selectedCount} selected` : 'Select All'}
            </span>
          </div>

          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="text-muted absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search listings..."
              className="h-11 pl-10"
            />
          </div>
        </div>

        {/* View Toggle */}
        <div className="border-line/10 flex w-fit items-center rounded-lg border bg-transparent p-1">
          <button
            type="button"
            onClick={() => onViewChange('grid')}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
            className={cn(
              'rounded-md p-2 transition-all',
              view === 'grid'
                ? 'bg-lime-500 text-white shadow-sm'
                : 'text-muted-foreground hover:bg-background',
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onViewChange('list')}
            aria-label="List view"
            aria-pressed={view === 'list'}
            className={cn(
              'rounded-md p-2 transition-all',
              view === 'list'
                ? 'bg-lime-500 text-white shadow-sm'
                : 'text-muted-foreground hover:bg-background',
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Status */}
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="h-10 w-full lg:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Categories */}
        <div className="-mx-1 flex flex-1 gap-2 overflow-x-auto px-1 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              aria-pressed={selectedCategory === cat}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200',
                selectedCategory === cat
                  ? 'border-lime-500 bg-lime-500 text-white shadow-sm'
                  : 'border-line/10 bg-background text-muted-foreground hover:border-border hover:bg-lime-500 hover:text-white',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
