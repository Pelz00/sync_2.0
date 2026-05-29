/**
 * Testimonials - social-proof rail of student quotes with avatars + ratings.
 * The trust layer the landing was missing. Static for now; could later pull
 * from a curated reviews table.
 */
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Reveal } from './reveal';

const TESTIMONIALS = [
  {
    quote:
      'Booked my room from my phone without a single agent. Paid into escrow, moved in, money released. That easy.',
    name: 'Aisha O.',
    detail: '300L · KWASU',
    rating: 5,
  },
  {
    quote:
      'I found a verified self-contain 6 minutes from class and saved the 20% an agent wanted. Wild.',
    name: 'Tunde A.',
    detail: '200L · KWASU',
    rating: 5,
  },
  {
    quote:
      "Around you is my home screen now - got Fresher's Night tickets and ordered food the same night.",
    name: 'Zainab M.',
    detail: '100L · KWASU',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="px-6 pt-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-accent-fg">Loved by students</p>
          <h2 className="font-display text-section text-foreground mt-2">Don&rsquo;t take our word for it.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="bg-panel shadow-card flex h-full flex-col gap-4 rounded-2xl p-6">
                <div aria-label={`${t.rating} out of 5`} className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="fill-lime text-lime h-4 w-4" strokeWidth={1.5} />
                  ))}
                </div>
                <blockquote className="text-foreground flex-1 text-[15px] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {t.name
                        .split(' ')
                        .map((p) => p[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground text-sm font-medium">{t.name}</p>
                    <p className="text-content-muted text-xs">{t.detail}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
