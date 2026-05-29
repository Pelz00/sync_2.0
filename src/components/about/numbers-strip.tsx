/**
 * NumbersStrip - full-width cream-deep band with 4 headline stats
 * (Bricolage number + mono caption). Semantic <dl>/<dt>/<dd>. Stacks 2x2
 * on mobile, inline on desktop.
 */
import { Reveal } from '@/components/shared/reveal';

const STATS = [
  { value: '3-7d → 1hr', caption: 'search time, before vs. on Sync' },
  { value: '412', caption: 'verified spots at launch' },
  { value: '5%', caption: 'capped Sync fee - half of agent rates' },
  { value: '100%', caption: 'vendors verified in person before listing' },
];

export function NumbersStrip() {
  return (
    <section aria-labelledby="numbers-heading" className="bg-surface-deep mt-20 w-full px-6 py-16 md:py-20">
      <h2 id="numbers-heading" className="sr-only">
        Sync by the numbers
      </h2>
      <Reveal>
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.caption}>
              <dt className="font-display text-foreground text-[30px] font-bold leading-none tracking-tight md:text-[40px]">
                {s.value}
              </dt>
              <dd className="font-mono text-content-muted mt-3 text-[11px] uppercase leading-tight tracking-wider">
                {s.caption}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
