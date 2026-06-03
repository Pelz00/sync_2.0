'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Input } from '@/components/ui';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatContact } from '@/modules/vendor/types';

interface ChatListProps {
  contacts: ChatContact[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ChatList({ contacts, selectedId, onSelect }: ChatListProps) {
  return (
    <div className="border-ink/5 flex h-full w-72 shrink-0 flex-col border-r">
      <div className="p-4">
        <h2 className="font-display text-ink mb-3 text-base font-semibold">Messages</h2>
        <div className="relative">
          <Search className="text-muted absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
          <Input
            placeholder="Search conversations..."
            className="pl-8 text-xs !ring-0 !outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0"
          />
        </div>
      </div>

      <div className="flex flex-col overflow-y-auto">
        {contacts.map((contact) => {
          const initials = contact.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2);
          const isSelected = contact.id === selectedId;

          return (
            <button
              key={contact.id}
              onClick={() => onSelect(contact.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-left transition-colors',
                isSelected
                  ? 'bg-ink/5 border-ink border-l-2'
                  : 'hover:bg-ink/3 border-l-2 border-transparent',
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="size-9">
                  <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-ink truncate text-sm font-medium">{contact.name}</p>
                  <span className="text-muted shrink-0 text-[11px]">{contact.timeAgo}</span>
                </div>
                <p className="text-muted truncate text-xs">{contact.lastMessage}</p>
              </div>

              {contact.unreadCount ? (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                  {contact.unreadCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
