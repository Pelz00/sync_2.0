/**
 * Pagination - accessible numbered pagination. Server-driven: each link
 * navigates to a URL with the new `?page=` param. No client state.
 */
import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  /** 1-based current page. */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Function that takes a page number and returns its href. */
  getHref: (page: number) => string;
  className?: string;
}

export function Pagination({ page, totalPages, getHref, className }: PaginationProps) {
  if (totalPages <= 1) return null;
  const prev = Math.max(1, page - 1);
  const next = Math.min(totalPages, page + 1);

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      <PageLink href={getHref(prev)} disabled={page === 1} aria-label="Previous page">
        <ChevronLeft className="h-4 w-4" />
      </PageLink>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <PageLink key={p} href={getHref(p)} active={p === page} aria-label={`Page ${p}`}>
          {p}
        </PageLink>
      ))}
      <PageLink href={getHref(next)} disabled={page === totalPages} aria-label="Next page">
        <ChevronRight className="h-4 w-4" />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  active,
  disabled,
  children,
  ...rest
}: { href: string; active?: boolean; disabled?: boolean; children: React.ReactNode } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>) {
  const cls = cn(
    'inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm transition-colors',
    active ? 'bg-ink text-cream' : 'text-ink hover:bg-ink/5',
    disabled && 'pointer-events-none opacity-40',
  );
  if (disabled) {
    return (
      <span className={cls} aria-disabled="true">
        {children}
      </span>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
