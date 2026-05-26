/**
 * MarketingFooter — public footer with brand line, product links, legal,
 * and social. Used by the (marketing) route group.
 */
import Link from 'next/link';
import { SITE } from '@/config/site';

const PRODUCT = [
  { href: '/hostels', label: 'Hostels' },
  { href: '/food', label: 'Food' },
  { href: '/events', label: 'Events' },
  { href: '/beauty', label: 'Beauty' },
  { href: '/workmanship', label: 'Trades' },
];
const COMPANY = [
  { href: '/about', label: 'About' },
  { href: '/for-vendors', label: 'For vendors' },
  { href: '/how-it-works', label: 'How it works' },
];

export function MarketingFooter() {
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-section">{SITE.name}</p>
          <p className="text-cream/70 mt-3 max-w-sm text-sm">{SITE.description}</p>
          <p className="text-cream/50 mt-6 text-xs">
            © {new Date().getFullYear()} {SITE.legalName}. Built for {SITE.launchMarket}.
          </p>
        </div>
        <FooterCol title="Product" items={PRODUCT} />
        <FooterCol title="Company" items={COMPANY} />
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow text-lime mb-4">{title}</p>
      <ul className="flex flex-col gap-2 text-sm">
        {items.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-cream/80 hover:text-lime transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
