'use client';
import { mockContacts, mockCustomers, mockMessages } from '@/mock/chat';
import { useState } from 'react';
import { ChatList } from './chat-list';
import { ChatWindow } from './chat-window';
import { ChatCustomerPanel } from './chat-panel';

export default function ChatComponent() {
  const [selectedId, setSelectedId] = useState(mockContacts[0].id);

  const selectedContact = mockContacts.find((c) => c.id === selectedId) ?? mockContacts[0];
  const selectedMessages = mockMessages[selectedId] ?? [];
  const selectedCustomer = mockCustomers[selectedId];

  return (
    <div className="border-ink/5 flex h-[calc(100vh-4rem)] overflow-hidden rounded-xl border bg-white">
      <ChatList contacts={mockContacts} selectedId={selectedId} onSelect={setSelectedId} />
      <ChatWindow
        contact={selectedContact}
        messages={selectedMessages}
        linkedOrder={selectedCustomer?.recentOrders[0]}
        onSend={(msg) => console.log(msg)}
      />
      <ChatCustomerPanel
        customer={selectedCustomer}
        onViewProfile={() => {}}
        onViewAllOrders={() => {}}
      />
    </div>
  );
}
