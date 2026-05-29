/**
 * AboutCta - closing section. Centered two-line display (with a lime
 * Highlight echoing the hero), two buttons, and a mono signature line.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Highlight } from '@/components/shared/highlight';
import { Reveal } from '@/components/shared/reveal';

export function AboutCta() {
  return (
    <section aria-labelledby="about-cta-heading" className="bg-surface px-6 py-24 md:py-32">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2
          id="about-cta-heading"
          className="font-display text-foreground text-[44px] font-bold leading-[0.98] tracking-[-0.035em] md:text-[64px] md:leading-[0.96] md:tracking-[-0.04em]"
        >
          Stop walking.
          <br />
          <span className="italic">
            Start <Highlight>Syncing.</Highlight>
          </span>
        </h2>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/hostels">
              Find your spot <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/for-vendors">List your business</Link>
          </Button>
        </div>

        <p className="font-mono text-content-muted mt-10 text-[11px] uppercase tracking-wider">
          - The Sync team · A Raavon Limited product
        </p>
      </Reveal>
    </section>
  );
}
