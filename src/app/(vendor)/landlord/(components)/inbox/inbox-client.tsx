'use client';

import { useMemo, useRef, useState } from 'react';
import { MessageSquare, Send, Check, ArrowLeft, Inbox } from 'lucide-react';
import {
  Card,
  Button,
  Input,
  Avatar,
  AvatarFallback,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Tabs,
  TabsList,
  TabsTrigger,
  toast,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  inquiries as seedInquiries,
  properties,
  quickReplies,
  tenants,
  type ChatMessage,
  type Inquiry,
} from '@/lib/landlord-data';

export function InboxClient({ tenantId }: { tenantId?: string }) {
  const tenant = tenants.find((candidate) => candidate.id === tenantId);
  const tenantInquiryId = tenant ? `tenant-${tenant.id}` : null;
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    if (!tenant || !tenantInquiryId) return seedInquiries;

    return [
      {
        id: tenantInquiryId,
        studentName: tenant.name,
        studentInitials: tenant.name
          .split(' ')
          .map((part) => part[0])
          .join(''),
        propertyId: tenant.propertyId,
        propertyName: tenant.property,
        preview: 'Start a conversation',
        unread: false,
        time: 'Now',
        thread: [],
      },
      ...seedInquiries,
    ];
  });
  const [selectedId, setSelectedId] = useState<string | null>(tenantInquiryId ?? seedInquiries[0]?.id ?? null);
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [draft, setDraft] = useState('');
  const nextMessageId = useRef(1);

  const filtered = useMemo(
    () =>
      inquiries.filter((i) => {
        const byProperty = propertyFilter === 'all' || i.propertyId === propertyFilter;
        const byRead = readFilter === 'all' || (readFilter === 'unread' ? i.unread : !i.unread);
        return byProperty && byRead;
      }),
    [inquiries, propertyFilter, readFilter],
  );

  const selected = inquiries.find((i) => i.id === selectedId) ?? null;

  const openInquiry = (id: string) => {
    setSelectedId(id);
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, unread: false } : i)));
  };

  const send = (body: string) => {
    if (!body.trim() || !selected) return;
    const msg: ChatMessage = {
      id: `landlord-${nextMessageId.current++}`,
      from: 'landlord',
      body: body.trim(),
      time: 'Now',
    };
    setInquiries((prev) =>
      prev.map((i) => (i.id === selected.id ? { ...i, thread: [...i.thread, msg], preview: msg.body } : i)),
    );
    setDraft('');
  };

  return (
    <Card className="grid min-h-[32rem] overflow-hidden p-0 md:grid-cols-[20rem_1fr]">
      {/* Inbox list */}
      <div className={cn('border-line/10 flex flex-col border-r', selected ? 'hidden md:flex' : 'flex')}>
        <div className="border-line/10 flex flex-col gap-3 border-b p-3">
          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All properties</SelectItem>
              {properties.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Tabs value={readFilter} onValueChange={setReadFilter}>
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread
              </TabsTrigger>
              <TabsTrigger value="read" className="flex-1">
                Read
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 p-8 text-center">
              <Inbox className="text-content-muted size-6" />
              <p className="text-sm font-medium">No inquiries</p>
              <p className="text-content-muted text-xs">No messages match this filter yet.</p>
            </div>
          ) : (
            <ul className="flex flex-col">
              {filtered.map((i) => (
                <li key={i.id}>
                  <button
                    type="button"
                    onClick={() => openInquiry(i.id)}
                    className={cn(
                      'border-line/10 hover:bg-ink/5 flex w-full items-start gap-3 border-b p-3 text-left transition-colors',
                      selectedId === i.id && 'bg-surface-deep',
                    )}
                  >
                    <Avatar className="size-9">
                      <AvatarFallback>{i.studentInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn('truncate text-sm', i.unread ? 'font-semibold' : 'font-medium')}>
                          {i.studentName}
                        </span>
                        <span className="text-content-muted shrink-0 text-[11px]">{i.time}</span>
                      </div>
                      <span className="text-lime-deep truncate text-xs">{i.propertyName}</span>
                      <span className={cn('truncate text-xs', i.unread ? 'text-content' : 'text-content-muted')}>
                        {i.preview}
                      </span>
                    </div>
                    {i.unread ? <span className="bg-lime-deep mt-1.5 block size-2 shrink-0 rounded-full" /> : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Thread */}
      <div className={cn('flex flex-col', selected ? 'flex' : 'hidden md:flex')}>
        {!selected ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <MessageSquare className="text-content-muted size-6" />
            <p className="text-sm font-medium">Select a conversation</p>
            <p className="text-content-muted text-xs">Choose an inquiry from the list to view the thread.</p>
          </div>
        ) : (
          <>
            <div className="border-line/10 flex items-center gap-3 border-b p-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSelectedId(null)}
                aria-label="Back to inbox"
              >
                <ArrowLeft />
              </Button>
              <Avatar className="size-9">
                <AvatarFallback>{selected.studentInitials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">{selected.studentName}</span>
                <span className="text-lime-deep text-xs">{selected.propertyName}</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-3">
                {selected.thread.map((m) => (
                  <div key={m.id} className={cn('flex flex-col gap-1', m.from === 'landlord' ? 'items-end' : 'items-start')}>
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-3.5 py-2 text-sm',
                        m.from === 'landlord' ? 'bg-ink text-cream rounded-br-sm' : 'bg-surface-deep text-content rounded-bl-sm',
                      )}
                    >
                      {m.body}
                    </div>
                    <span className="text-content-muted flex items-center gap-1 px-1 text-[11px]">
                      {m.time}
                      {m.from === 'landlord' ? <Check className="size-3" /> : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-line/10 flex flex-wrap gap-2 border-t px-4 py-3">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="border-line/15 bg-surface-deep text-content-muted hover:border-lime-deep/40 hover:text-content rounded-full border px-3 py-1 text-xs transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              className="border-line/10 flex items-center gap-2 border-t p-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (draft.trim()) {
                  send(draft);
                  toast.success('Reply sent');
                }
              }}
            >
              <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a reply…" />
              <Button type="submit" size="icon" aria-label="Send reply">
                <Send />
              </Button>
            </form>
          </>
        )}
      </div>
    </Card>
  );
}
