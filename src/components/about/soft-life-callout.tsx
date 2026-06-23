/**
 * SoftLifeCallout - the page's single contrast moment. Inverts to a constant
 * ink surface with cream text (fixed in both themes), generous padding. The
 * brand's "soft life" thesis.
 */
import { Reveal } from '@/components/shared/reveal';

export function SoftLifeCallout() {
  return (
    <section
      aria-labelledby="softlife-heading"
      className="bg-ink text-cream mt-20 w-full px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow text-lime">What we&rsquo;re building towards</p>
          <h2
            id="softlife-heading"
            className="font-display mt-5 text-[44px] font-bold leading-[0.98] tracking-[-0.035em] md:text-[60px] md:leading-[0.96] md:tracking-[-0.04em] lg:text-[68px]"
          >
            This is what <em className="text-lime">soft life</em> means to us.
          </h2>
          <div className="text-cream/80 mt-7 flex max-w-[720px] flex-col gap-5 text-justify text-[18px] leading-relaxed">
            <p>
              Not luxury. Not flexing. Just <em>life that doesn&rsquo;t fight you.</em> Life that
              doesn&rsquo;t make you sweat for what should be ordinary. Life that gives you back
              your Saturday.
            </p>
            <p>
              Soft life for <em>everyone</em> - the 200-level fresher who just arrived, the
              400-level student running between deadlines, the mama-put cook who&rsquo;s been
              feeding the street for twelve years and deserves to be found.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
