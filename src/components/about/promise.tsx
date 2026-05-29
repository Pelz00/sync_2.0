/**
 * Promise - 04 "The Promise". Three white cards, each a lucide icon (lime),
 * title, and paragraph. The non-negotiables: verification, escrow, capped fee.
 */
import { BadgeCheck, Percent, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/shared/reveal';

const PROMISES: { icon: LucideIcon; title: string; body: React.ReactNode }[] = [
  {
    icon: BadgeCheck,
    title: 'Every vendor, verified in person.',
    body: (
      <>
        ID, business proof, <em>and an in-person visit by a real person with a camera.</em> No tick
        from an algorithm. If we couldn&rsquo;t prove it, it&rsquo;s not on Sync.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: 'Every payment, held in escrow.',
    body: (
      <>
        Money moves through Paystack escrow - <em>released when the work is done,</em> not before.
        Refunds reverse the fee proportionally.
      </>
    ),
  },
  {
    icon: Percent,
    title: 'Every fee, half of the old game.',
    body: (
      <>
        The agent who took ₦40,000 to introduce you to a landlord? Replaced with 412 verified
        listings, real photos, and a <em>5% fee. Capped at ₦25,000.</em>
      </>
    ),
  },
];

export function Promise() {
  return (
    <section aria-labelledby="promise-heading" className="bg-surface px-6 pt-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-accent-fg">04 · The promise</p>
          <h2
            id="promise-heading"
            className="font-display text-foreground mt-4 text-[32px] font-semibold leading-tight tracking-[-0.02em] md:text-[44px]"
          >
            Three things we will never trade.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PROMISES.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Card className="bg-panel flex h-full flex-col gap-4 p-6">
                <span className="bg-lime text-ink flex h-11 w-11 items-center justify-center rounded-xl">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-card text-foreground leading-tight">{title}</h3>
                <p className="text-content-muted text-sm leading-relaxed">{body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
