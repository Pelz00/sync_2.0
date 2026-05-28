/**
 * ROUTE: /me/notifications
 * ACCESS: authenticated student
 * PURPOSE: Notification inbox with preferences toggle. Realtime updates via Supabase channels.
 * BUILT HERE: Notification list, mark-all-read, per-channel <Switch> preferences.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Notifications' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/me/notifications</p>
      <h1 className="font-display text-section text-ink">Notifications</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
