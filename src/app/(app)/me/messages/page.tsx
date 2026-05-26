/**
 * ROUTE: /me/messages
 * ACCESS: authenticated student
 * PURPOSE: Student↔vendor conversations. Realtime via Supabase channels (modules/messaging).
 * BUILT HERE: Conversation list, message thread, composer.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Messages' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/me/messages</p>
      <h1 className="font-display text-section text-ink">Messages</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
