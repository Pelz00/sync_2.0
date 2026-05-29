/**
 * MarketingFooter - rich dark footer for the public route group. Multi-column
 * link grid, brand tagline, social, a disclaimer block, and an animated
 * morphing ambient glow behind it. Merges seamlessly with the dark CTA above.
 */
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SITE } from '@/config/site';

const PRODUCT = [
  { href: '/hostels', label: 'Hostels' },
  { href: '/food', label: 'Food' },
  { href: '/events', label: 'Events' },
  { href: '/beauty', label: 'Beauty' },
  { href: '/workmanship', label: 'Trades' },
  { href: '/hotspots', label: 'Hot spots' },
];
const COMPANY = [
  { href: '/about', label: 'About' },
  { href: '/for-vendors', label: 'For landlords' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/around', label: 'Around you' },
];
const LEGAL = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Cookie Policy' },
];
const SOCIALS = [
  { href: SITE.socials.x, label: 'X', initials: 'X' },
  { href: SITE.socials.instagram, label: 'Instagram', initials: 'IG' },
];

export function MarketingFooter() {
  return (
    <footer className="bg-ink text-cream relative isolate overflow-hidden">
      {/* Animated morphing ambient glow */}
      <div
        aria-hidden="true"
        className="morph-blob bg-lime/10 pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[34rem] w-[48rem] rounded-full blur-[150px]"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        {/* Top row: logo + operator + copyright */}
        <div className="border-cream/10 flex flex-col gap-4 border-b pb-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex items-center gap-1">
              <span className="bg-surface block h-2 w-2 rounded-full" />
              <span className="bg-lime block h-1.5 w-1.5 rounded-full" />
            </span>
            <span className="font-display text-card">{SITE.name}</span>
            <span className="text-cream/50 text-sm">
              Operated by <span className="text-cream/80">{SITE.legalName}</span>
            </span>
          </div>
          <p className="text-cream/50 text-xs">
            © {new Date().getFullYear()} {SITE.legalName}. Built for {SITE.launchMarket}.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid gap-12 pt-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <span className="bg-surface/5 text-lime flex h-10 w-10 items-center justify-center rounded-xl">
              <Sparkles className="h-5 w-5" />
            </span>
            <p className="text-cream/70 max-w-xs text-sm">{SITE.description}</p>

            <div>
              <p className="eyebrow text-cream/40">Get started</p>
              <Link
                href="/signup"
                className="hover:text-lime mt-3 inline-flex items-center gap-1 text-sm transition-colors"
              >
                Get Sync <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div>
              <p className="eyebrow text-cream/40 mb-3">Stay in touch</p>
              <div className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="border-cream/15 text-cream/80 hover:border-lime hover:text-lime flex h-9 min-w-9 items-center justify-center rounded-full border px-2 text-xs font-medium transition-colors"
                  >
                    {s.initials}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <FooterCol title="Product" items={PRODUCT} />
          <FooterCol title="Company" items={COMPANY} />
          <FooterCol title="Legal" items={LEGAL} />
        </div>

        {/* Disclaimer */}
        <div className="border-cream/10 mt-16 border-t pt-10">
          <p className="eyebrow text-cream/40">Disclaimer</p>
          <div className="text-cream/50 mt-4 flex flex-col gap-4 text-xs leading-relaxed md:max-w-4xl">
            <p>
              {SITE.name} is a marketplace operated by {SITE.legalName}. We verify every vendor -
              ID check, business proof, and an in-person visit - but listings, prices, and
              availability are provided by the vendors themselves. Always confirm details and
              inspect a property before paying.
            </p>
            <p>
              Payments are processed and held in escrow by Paystack, a CBN-licensed payment
              provider. {SITE.name} does not hold or custody student funds. Our 5% verified-listing
              fee is disclosed at checkout. By using {SITE.name} you agree to our Terms of Service
              and acknowledge that reliance on any information here is at your own risk.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-cream/10 text-cream/40 mt-12 flex flex-col gap-2 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            {SITE.name} - the verified marketplace for Nigerian student life. {SITE.url.replace('https://', '')}
          </p>
          <a href="https://www.raavon.com" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors">
            www.raavon.com
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow text-cream/40 mb-4">{title}</p>
      <ul className="flex flex-col gap-3 text-sm">
        {items.map(({ href, label }) => (
          <li key={label}>
            <Link href={href} className="text-cream/70 hover:text-lime transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
