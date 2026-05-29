/**
 * MarketingHeader - public top bar.
 *
 * Desktop (md+): 3-column grid - nav links split left & right around a
 * centered logo, with the auth/CTA cluster pinned to the far right.
 * Mobile (<md): logo on the left, hamburger (MobileMenu) on the right.
 *
 * Logo: two stacked dots (ink + lime-deep) + Sync wordmark.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MobileMenu } from './mobile-menu';
import { SITE } from '@/config/site';

// Full module nav from the hi-fi guide, split around the centered logo.
const LEFT_LINKS = [
  { href: '/around', label: 'Around you' },
  { href: '/hostels', label: 'Hostels' },
  { href: '/events', label: 'Events' },
  { href: '/food', label: 'Food' },
];

const RIGHT_LINKS = [
  { href: '/beauty', label: 'Beauty' },
  { href: '/workmanship', label: 'Workmanship' },
  { href: '/hotspots', label: 'Hot spots' },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-foreground hover:text-accent-fg transition-colors">
      {label}
    </Link>
  );
}

export function MarketingHeader() {
  return (
    <header className="bg-surface/90 border-line/5 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Left nav - desktop only */}
        <nav
          aria-label="Primary left"
          className="hidden items-center gap-5 text-sm md:flex md:justify-start"
        >
          {LEFT_LINKS.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </nav>

        {/* Logo - left on mobile, centered on desktop */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 md:justify-self-center"
          aria-label="Sync home"
        >
          <span aria-hidden="true" className="flex items-center gap-1">
            <span className="bg-foreground block h-2 w-2 rounded-full" />
            <span className="bg-accent-fg block h-1.5 w-1.5 rounded-full" />
          </span>
          <span className="font-display text-card text-foreground">{SITE.name}</span>
        </Link>

        {/* Right cluster - right nav + auth (desktop) / hamburger (mobile) */}
        <div className="flex items-center justify-end gap-6">
          <nav aria-label="Primary right" className="hidden items-center gap-5 text-sm md:flex">
            {RIGHT_LINKS.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
          </nav>
          <ThemeToggle className="hidden md:inline-flex" />
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
