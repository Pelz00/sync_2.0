/**
 * ROUTE: /workmanship
 * ACCESS: authenticated student
 * PURPOSE: Trades directory + entrypoint to post a request. Browse verified tradespeople by skill.
 * BUILT HERE: Skill <Chip>s, tradesperson cards, prominent CTA to /workmanship/request.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Trades' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/workmanship</p>
      <h1 className="font-display text-section text-content">Trades</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
