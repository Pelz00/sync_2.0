/**
 * MarketingHeader - public top bar.
 *
 * Layout: logo on the left, the full module nav + auth/CTA cluster on the
 * right. On mobile the nav + auth collapse into the hamburger (MobileMenu),
 * which is pinned to the right. Persistent services dock below (on /around)
 * mirrors all modules.
 *
 * Logo: two stacked dots (ink + lime-deep) + Sync wordmark.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './mobile-menu';
import { SITE } from '@/config/site';

// Full module nav from the hi-fi guide.
const NAV_LINKS = [
  { href: '/around', label: 'Around you' },
  { href: '/hostels', label: 'Hostels' },
  { href: '/events', label: 'Events' },
  { href: '/food', label: 'Food' },
  { href: '/beauty', label: 'Beauty' },
  { href: '/workmanship', label: 'Workmanship' },
  { href: '/hotspots', label: 'Hot spots' },
];

export function MarketingHeader() {
  return (
    <header className="bg-cream/90 border-ink/5 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-6">
        {/* Logo - left */}
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Sync home">
          <span aria-hidden="true" className="flex items-center gap-1">
            <span className="bg-ink block h-2 w-2 rounded-full" />
            <span className="bg-lime-deep block h-1.5 w-1.5 rounded-full" />
          </span>
          <span className="font-display text-card text-ink">{SITE.name}</span>
        </Link>

        {/* Right cluster - nav + auth (desktop) / hamburger (mobile) */}
        <div className="flex items-center gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-5 text-sm lg:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-ink hover:text-lime-deep transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup?role=vendor&category=landlord">
                List a property <ArrowRight />
              </Link>
            </Button>
          </div>
          {/* Hamburger - mobile only, far right */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
