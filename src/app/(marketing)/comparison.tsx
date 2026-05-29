/**
 * Comparison — "the old way vs Sync" value-prop contrast. Sharpens why Sync
 * exists: trekking + fake agents + 20% fees vs verified + escrow + 5%.
 */
import { Check, X } from 'lucide-react';
import { Reveal } from './reveal';

const OLD_WAY = [
  'Trek street to street asking “any room?”',
  'Trust an agent you’ve never met',
  'Pay 10–20% agent commission',
  'Photos that don’t match reality',
  'Cash up front, no protection',
];

const SYNC_WAY = [
  'Filter verified rooms from your phone',
  'Every landlord ID-checked & visited',
  'One flat 5% verified-listing fee',
  'Photos shot by the Sync team',
  'Paystack escrow until you move in',
];

export function Comparison() {
  return (
    <section className="px-6 pt-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-lime-deep">Why Sync</p>
          <h2 className="font-display text-section text-ink mt-2">The old way vs syncing.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* Old way */}
          <Reveal>
            <div className="border-ink/10 h-full rounded-2xl border border-dashed bg-transparent p-7">
              <p className="font-mono text-muted text-xs tracking-wider uppercase">The old way</p>
              <ul className="mt-6 flex flex-col gap-4">
                {OLD_WAY.map((item) => (
                  <li key={item} className="text-muted flex items-start gap-3 text-sm">
                    <span className="border-muted/40 text-muted mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border">
                      <X className="h-3 w-3" />
                    </span>
                    <span className="line-through decoration-muted/40">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Sync way */}
          <Reveal delay={0.1}>
            <div className="bg-ink text-cream h-full rounded-2xl p-7">
              <p className="font-mono text-lime text-xs tracking-wider uppercase">With Sync</p>
              <ul className="mt-6 flex flex-col gap-4">
                {SYNC_WAY.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="bg-lime text-ink mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
