/**
 * ROUTE: /
 * ACCESS: public
 * PURPOSE: Sync marketing landing page. The first impression for both
 *          students and prospective vendors. Hero → modules grid → trust
 *          (verification flow) → vendor CTA → footer.
 * BUILT HERE: Hero with eyebrow + headline + signup CTA, modules grid
 *             pulled from config/modules.ts, three-step verification
 *             explainer, vendor CTA band.
 */
import Link from 'next/link';
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MODULES } from '@/config/modules';
import { SITE } from '@/config/site';

export default function LandingPage() {
  return (
    <>
      <section className="px-6 pt-16 md:pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <Badge variant="accent" className="mx-auto">
            Now live in {SITE.launchMarket}
          </Badge>
          <h1 className="font-display text-section md:text-hero text-ink mt-6 leading-[1.05]">
            Your campus, in one app.
          </h1>
          <p className="text-lead text-muted mx-auto mt-6 max-w-2xl">
            Hostels, food, events, beauty, trades, laundry, and the lounges worth knowing —
            all from verified people, all in one place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/signup">
                Get Sync <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/how-it-works">How it works</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow text-lime-deep text-center">One app, eight services</p>
          <h2 className="font-display text-section text-ink mt-3 text-center">
            Everything you need around campus
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {MODULES.map(({ slug, label, tagline, icon: Icon }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group bg-white shadow-card hover:shadow-pop flex flex-col gap-3 rounded-xl p-5 transition-shadow"
              >
                <Icon className="text-lime-deep h-6 w-6" />
                <div>
                  <p className="font-display text-card text-ink">{label}</p>
                  <p className="text-muted mt-1 text-xs">{tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-deep px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-lime-deep">The Sync difference</p>
          <h2 className="font-display text-section text-ink mt-3">
            Every vendor is verified. Every payment is held in escrow.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: BadgeCheck,
                title: 'Auto ID check',
                body: 'NIN + BVN verified the moment a vendor signs up.',
              },
              {
                icon: ShieldCheck,
                title: 'Business proof',
                body: 'CAC docs, proof of address, business photos — reviewed by humans.',
              },
              {
                icon: Sparkles,
                title: 'In-person visit',
                body: 'A Sync rep visits every vendor before they go live. No exceptions.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex flex-col gap-3">
                <Icon className="text-lime-deep h-6 w-6" />
                <p className="font-display text-card text-ink">{title}</p>
                <p className="text-muted text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="bg-ink text-cream mx-auto flex max-w-5xl flex-col items-start gap-6 rounded-2xl p-10 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <p className="eyebrow text-lime">Are you a vendor?</p>
            <h2 className="font-display text-section mt-3">
              Sell to a verified student market.
            </h2>
            <p className="text-cream/70 mt-3 max-w-md text-sm">
              Get listed once you&rsquo;re verified. Keep what you earn, paid via Paystack.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/for-vendors">
              Start selling <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
