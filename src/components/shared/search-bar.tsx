/**
 * SearchBar — global search input. URL-driven (no client state); submits to
 * `/search?q=...`. Drop into headers and the around-you hero.
 */
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        'border-ink/10 bg-white flex h-12 w-full items-center gap-2 rounded-full border px-4',
        'focus-within:border-ink',
        className,
      )}
    >
      <Search className="text-muted h-4 w-4 shrink-0" aria-hidden="true" />
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="placeholder:text-muted h-full w-full border-0 bg-transparent text-sm outline-none"
        aria-label="Search Sync"
      />
    </form>
  );
}
