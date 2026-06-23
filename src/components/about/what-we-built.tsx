/**
 * WhatWeBuilt - 02 "So we built Sync". Heading with italic accent, a row of
 * the 7 service-module chips (each links to its module), and the value
 * paragraph. Chips reuse the module registry + lucide icons.
 */
import Link from 'next/link';
import { MODULES } from '@/config/modules';
import { Reveal } from '@/components/shared/reveal';

const SERVICE_MODULES = MODULES.filter((m) => m.slug !== 'around');

export function WhatWeBuilt() {
  return (
    <section aria-labelledby="built-heading" className="bg-surface px-6 pt-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow text-accent-fg">02 · So we built Sync</p>
          <h2
            id="built-heading"
            className="font-display text-section text-foreground mt-2"
          >
            One platform. Every campus need.{' '}
            <em>Verified before it ever touches your screen.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
            {SERVICE_MODULES.map(({ slug, label, icon: Icon }) => (
              <li key={slug}>
                <Link
                  href={`/${slug}`}
                  className="border-line/15 text-foreground hover:bg-foreground/5 flex w-full items-center justify-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors"
                >
                  <Icon className="text-accent-fg h-4 w-4 shrink-0" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="text-foreground/80 mt-10 flex max-w-[640px] flex-col gap-5 text-justify text-[17px] leading-relaxed">
            <p>
              Sync is the layer between you and everything you&rsquo;re already trying to do -{' '}
              <em>faster, cleaner, and without the middleman who never earned his cut.</em> Hostels
              you can trust. Food that knows which hostel you live in before you finish typing the
              address. Stylists who come to your door. Plumbers who actually show up. Tickets that
              scan at the gate. Laundry that comes back folded.
            </p>
            <p className="font-display text-foreground text-xl font-semibold">
              You shouldn&rsquo;t have to walk for any of it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
