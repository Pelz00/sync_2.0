/**
 * AboutHero - opening spread of the /about brand essay. Eyebrow, two-line
 * display headline ("Stop walking. / Start Syncing." with a lime Highlight
 * on "Syncing."), and a single lead question. No CTA - let it breathe.
 */
import { Highlight } from '@/components/shared/highlight';
import { Reveal } from '@/components/shared/reveal';

export function AboutHero() {
  return (
    <section aria-labelledby="about-hero-heading" className="bg-surface px-6 pb-12 pt-16 md:pt-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow text-accent-fg">Our story · Raavon Limited · Est. 2026</p>
          <h1
            id="about-hero-heading"
            className="font-display text-foreground mt-6 text-[44px] font-bold leading-[0.98] tracking-[-0.035em] md:text-[60px] md:leading-[0.96] md:tracking-[-0.04em] lg:text-[68px]"
          >
            Stop walking.
            <br />
            <span className="italic">
              Start <Highlight>Syncing.</Highlight>
            </span>
          </h1>
          <p className="text-foreground/80 text-lead mt-6 max-w-[640px]">
            It started with a question we couldn&rsquo;t stop asking:{' '}
            <em>why does finding a room take seven days?</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
