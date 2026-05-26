/**
 * MarketingHeader — top bar for the public marketing route group.
 * Sticks on scroll. Links to /about, /how-it-works, /for-vendors, /login, /signup.
 */
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SITE } from '@/config/site';

const links = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/for-vendors', label: 'For vendors' },
  { href: '/about', label: 'About' },
];

export function MarketingHeader() {
  return (
    <header className="bg-cream/90 border-ink/5 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="font-display text-card text-ink">
          {SITE.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm md:flex">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="text-ink hover:text-lime-deep transition-colors">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Get Sync</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
