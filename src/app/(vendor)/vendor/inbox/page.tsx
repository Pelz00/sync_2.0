/**
 * ROUTE: /vendor/inbox
 * ACCESS: authenticated vendor
 * PURPOSE: Vendor side of the messaging module. Same realtime channels as students; threaded by listing/order.
 * BUILT HERE: Conversation list + thread + composer.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import { ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import ChatComponent from './(components)/chat-component';

export const metadata: Metadata = { title: 'Inbox' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <ChatComponent />
    </section>
  );
}
