/**
 * SearchBar - global search input. URL-driven (no client state); submits to
 * `/search?q=...`. Drop into headers and the around-you hero.
 */
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '../ui';

interface SearchBarProps {
  /** Initial query value (controlled by URL). */
  defaultValue?: string;
  placeholder?: string;
  /** Submit target. Defaults to `/search`. */
  action?: string;
  className?: string;
}

export function SearchBar({
  defaultValue = '',
  placeholder = 'Search hostels, food, events…',
  action = '/search',
  className,
}: SearchBarProps) {
  return (
    <form
      action={action}
      method="get"
      role="search"
      className={cn(
        'border-line/10 bg-panel flex h-12 w-full items-center gap-2 rounded-full border px-4',
        'focus-within:border-line',
        className,
      )}
    >
      <Search className="text-content-muted h-4 w-4 shrink-0" aria-hidden="true" />
      <Input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="placeholder:text-content-muted h-full w-full border-0 bg-transparent text-sm outline-none! ring-0!"
        aria-label="Search Sync"
      />
    </form>
  );
}
