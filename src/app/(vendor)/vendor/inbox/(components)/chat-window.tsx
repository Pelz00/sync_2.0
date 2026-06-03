'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Input } from '@/components/ui';

import { MoreHorizontal, Paperclip, Send, Star, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatContact, ChatMessage, ChatOrder } from '@/modules/vendor/types';

interface ChatWindowProps {
  contact: ChatContact;
  messages: ChatMessage[];
  linkedOrder?: ChatOrder;
  onSend: (message: string) => void;
}

const statusVariant: Record<ChatOrder['status'], string> = {
  Processing: 'bg-amber-100 text-amber-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
  Pending: 'bg-ink/8 text-ink',
};

export function ChatWindow({ contact, messages, linkedOrder, onSend }: ChatWindowProps) {
  const initials = contact.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header */}
      <div className="border-ink/5 flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="size-9">
              <AvatarImage src={contact.avatarUrl} alt={contact.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {contact.isOnline && (
              <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-green-500 ring-2 ring-white" />
            )}
          </div>
          <div>
            <p className="text-ink text-sm font-semibold">{contact.name}</p>
            <p className="text-xs text-green-500">{contact.isOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="size-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Star className="size-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
        {/* Linked order pill */}
        {linkedOrder && (
          <div className="border-ink/10 mx-auto flex items-center gap-3 rounded-xl border bg-white px-4 py-2.5 shadow-sm">
            <div className="bg-ink/5 flex size-8 items-center justify-center rounded-lg">
              <Send className="text-muted size-3.5" />
            </div>
            <div>
              <p className="text-ink text-xs font-semibold">{linkedOrder.orderId}</p>
              <p className="text-muted text-xs">{linkedOrder.items}</p>
            </div>
            <span
              className={cn(
                'rounded-full px-2.5 py-0.5 text-xs font-medium',
                statusVariant[linkedOrder.status],
              )}
            >
              {linkedOrder.status}
            </span>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn('flex flex-col gap-1', message.isVendor ? 'items-end' : 'items-start')}
          >
            {!message.isVendor && (
              <Avatar className="size-6">
                <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                'max-w-xs rounded-2xl px-4 py-2.5 text-sm',
                message.isVendor
                  ? 'rounded-tr-sm bg-violet-600 text-white'
                  : 'text-ink border-ink/5 rounded-tl-sm border bg-white',
              )}
            >
              {message.content}
            </div>
            <span className="text-muted text-[11px]">{message.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-ink/5 border-t px-4 py-3">
        <div className="border-ink/10 flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
          <Button variant="ghost" size="icon" className="size-8 shrink-0">
            <Paperclip className="size-4" />
          </Button>
          <input
            placeholder="Type a message..."
            className="text-ink placeholder:text-muted flex-1 bg-transparent text-sm outline-none"
          />
          <Button size="icon" variant="ghost" className="size-8 shrink-0 text-violet-500">
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
