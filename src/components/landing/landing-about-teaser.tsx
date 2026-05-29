/**
 * LandingAboutTeaser - condensed About moment on the marketing landing page.
 * A cream-deep, full-bleed band that distils the /about brand essay into one
 * headline, two short paragraphs, and a stat stack, then links into /about.
 *
 * Two-column on desktop (copy left, vertical stat stack right), single column
 * on mobile. Italic accents carry the brand voice; the brand summary/tagline
 * closes the copy. Reveal wrappers are the only client islands.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { SITE } from '@/config/site';

/** The 3 most important stats, mirrored from the About page NumbersStrip. */
const STATS = [
  { value: '3-7d → 1hr', caption: 'search time, before vs. on Sync' },
  { value: '5%', caption: 'capped, half the agent fee' },
  { value: '100%', caption: 'vendors verified in person' },
];

export function LandingAboutTeaser() {
  return (
    <section
      aria-labelledby="landing-about-heading"
      className="bg-surface-deep mt-20 w-full px-6 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        {/* Left - eyebrow, headline, body, CTA */}
        <Reveal>
          <p className="eyebrow text-accent-fg">Why Sync exists</p>
          <h2
            id="landing-about-heading"
            className="font-display text-foreground mt-4 max-w-[640px] text-justify text-[32px] font-semibold leading-tight tracking-[-0.02em] md:text-[48px]"
          >
            We&rsquo;re not building another platform.{' '}
            <em>We&rsquo;re rewriting how Nigerian students live around their campus.</em>
          </h2>

          <div className="text-foreground/80 mt-7 flex max-w-[540px] flex-col gap-5 text-justify text-[17px] leading-relaxed">
            <p>
              A week of walking street to street to find a room. ₦40,000 to a stranger who showed
              you two hostels and disappeared. <em>Ask around</em> for food, plumbers, parties,
              stylists. Somehow is not a system.
            </p>
            <p>
              We built Sync so the things you need are already in your radius - verified, escrowed,
              and half the price of the old game. <em>Soft life, for everyone.</em>
            </p>
            <p className="text-content-muted text-sm">{SITE.summary}</p>
          </div>

          <Link
            href="/about"
            className="text-accent-fg mt-8 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:gap-3"
          >
            Read our story <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {/* Right - vertical stat stack */}
        <Reveal delay={0.1}>
          <dl className="border-line/10 divide-line/10 flex flex-col divide-y border-t">
            {STATS.map((s) => (
              <div key={s.caption} className="flex items-baseline justify-between gap-4 py-5">
                <dt className="font-display text-foreground text-[28px] font-bold leading-none tracking-tight md:text-[34px]">
                  {s.value}
                </dt>
                <dd className="font-mono text-content-muted max-w-[180px] text-right text-[11px] uppercase leading-tight tracking-wider">
                  {s.caption}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
