/**
 * ROUTE: /vendor/inbox
 * ACCESS: authenticated vendor
 * PURPOSE: Vendor side of the messaging module. Same realtime channels as students; threaded by listing/order.
 * BUILT HERE: Conversation list + thread + composer.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Inbox' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-accent-fg">/vendor/inbox</p>
      <h1 className="font-display text-section text-content">Inbox</h1>
      <p className="text-content-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
