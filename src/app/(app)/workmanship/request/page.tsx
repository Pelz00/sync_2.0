/**
 * ROUTE: /workmanship/request
 * ACCESS: authenticated student
 * PURPOSE: Multi-step request flow - students describe the job; verified tradespeople quote; student accepts and pays into escrow.
 * BUILT HERE: <Stepper>, photo upload, description <Textarea>, budget range, address.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Post a job' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/workmanship/request</p>
      <h1 className="font-display text-section text-content">Post a job</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
