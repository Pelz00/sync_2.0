/**
 * OriginStory - 01 "The Question". Two columns on desktop (prose left,
 * editorial photo right), stacked on mobile. The week-of-walking problem
 * that started Sync, with brand phrases italicised.
 */
import Image from 'next/image';
import { Reveal } from '@/components/shared/reveal';

export function OriginStory() {
  return (
    <section aria-labelledby="origin-heading" className="bg-surface px-6 pt-20">
      <div className="mx-auto grid max-w-7xl items-start gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="eyebrow text-accent-fg">01 · The question</p>
          <h2 id="origin-heading" className="sr-only">
            The question
          </h2>
          <div className="text-foreground/80 mt-6 flex flex-col gap-5 text-justify text-[17px] leading-relaxed">
            <p>
              In every Nigerian university town, a fresher arrives with one bag and one mission -
              find somewhere to sleep before lectures start. What follows is a week of walking.
              Street by street. Gate by gate. Asking strangers. Trusting agents you&rsquo;ve never
              met. Paying <em>10 to 20 percent</em> of a year&rsquo;s rent to someone who barely
              showed you two hostels before disappearing.
            </p>
            <p>
              We thought: <em>that can&rsquo;t be it.</em>
            </p>
            <p>
              Then we kept asking. Where do you eat at 11pm? Who fixes your toilet on a Sunday?
              Whose nails are actually reliable? Where&rsquo;s the party tonight - and is the ticket
              even real? Every question got the same answer:{' '}
              <em>ask around, check WhatsApp, you&rsquo;ll figure it out.</em>
            </p>
            <p className="text-foreground">
              But <em>figuring it out</em> is not a system. <em>Figuring it out</em> is how students
              lose money, lose weekends, and lose trust.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-surface-deep relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/hostelariel.jpeg"
              alt="Student housing near KWASU, Malete"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
