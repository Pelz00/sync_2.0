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
import { ActiveModuleIndicator } from './active-module-indicator';
import { UserMenu } from './user-menu';
import { getCurrentUser, getFirstName } from '@/modules/auth/queries';
import { SITE } from '@/config/site';

// Module nav from the hi-fi guide, split around the centered logo. These are
// hidden in `dockMode` (e.g. /around) since the ServicesDock already lists them.
const LEFT_LINKS = [
  { href: '/around', label: 'Around you' },
  { href: '/hostels', label: 'Hostels' },
  { href: '/events', label: 'Events' },
  { href: '/food', label: 'Food' },
  { href: '/beauty', label: 'Beauty' },
];

const RIGHT_MODULE_LINKS = [
  { href: '/workmanship', label: 'Workmanship' },
  { href: '/hotspots', label: 'Hot spots' },
];

// Non-module links that stay in the header even in dockMode (not on the dock).
const EXTRA_LINKS = [{ href: '/about', label: 'About' }];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-foreground hover:text-accent-fg transition-colors">
      {label}
    </Link>
  );
}

interface MarketingHeaderProps {
  /**
   * When true (screens that also render the ServicesDock, e.g. /around), the
   * module nav is hidden to avoid duplicating the dock. The left side instead
   * shows just the active module (lime, with a live dot).
   */
  dockMode?: boolean;
}

export async function MarketingHeader({ dockMode = false }: MarketingHeaderProps) {
  const user = await getCurrentUser();
  const meta = user?.user_metadata ?? {};
  const name = (meta.full_name as string | undefined) || user?.email?.split('@')[0] || 'You';
  const initial = (getFirstName(user) ?? name).charAt(0).toUpperCase();
  const role = meta.role as string | undefined;

  return (
    <header className="bg-surface/90 border-line/5 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Left nav - desktop only. In dockMode: just the active module. */}
        <nav
          aria-label="Primary left"
          className="hidden items-center gap-5 text-sm md:flex md:justify-start"
        >
          {dockMode ? (
            <ActiveModuleIndicator />
          ) : (
            LEFT_LINKS.map((l) => <NavLink key={l.href} {...l} />)
          )}
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
            {!dockMode && RIGHT_MODULE_LINKS.map((l) => <NavLink key={l.href} {...l} />)}
            {EXTRA_LINKS.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
          </nav>
          <ThemeToggle className="hidden md:inline-flex" />
          {user ? (
            <UserMenu name={name} email={user.email ?? ''} initial={initial} role={role} />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-foreground hover:bg-foreground/10"
              >
                <Link href="/login">Sign in / Sign up</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup?role=vendor&category=landlord">
                  List a property <ArrowRight />
                </Link>
              </Button>
            </div>
          )}
          {/* Hamburger - mobile only, far right */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
