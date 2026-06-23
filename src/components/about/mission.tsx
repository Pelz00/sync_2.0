/**
 * Mission - 03 "The Mission". Heading with italic accent, then three short
 * stanzas each set off with a thin lime left-border. Staggered reveal.
 */
import { Reveal } from '@/components/shared/reveal';

const STANZAS = [
  <>
    By the time you think <em>&ldquo;I need braids on Saturday,&rdquo;</em> your stylist is three
    taps away.
  </>,
  <>
    By the time you say <em>&ldquo;my tap is leaking,&rdquo;</em> three verified plumbers are
    already sending quotes.
  </>,
  <>
    By the time you check your phone for tonight&rsquo;s plans, the night is already organised - in
    your radius, around your hostel, in your budget.
  </>,
];

export function Mission() {
  return (
    <section aria-labelledby="mission-heading" className="bg-surface px-6 pt-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow text-accent-fg">03 · The mission</p>
          <h2
            id="mission-heading"
            className="font-display text-section text-foreground mt-2"
          >
            We&rsquo;re not building another platform.{' '}
            <em>We&rsquo;re rewriting how Nigerian students live around their campus.</em>
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          {STANZAS.map((stanza, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="border-lime text-foreground/85 max-w-[640px] border-l-4 pl-5 text-[18px] leading-relaxed">
                {stanza}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
