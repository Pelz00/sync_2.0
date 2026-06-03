'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Button } from '@/components/ui';

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatCustomer, ChatOrder } from '@/modules/vendor/types';

interface ChatCustomerPanelProps {
  customer: ChatCustomer;
  onViewProfile?: () => void;
  onViewAllOrders?: () => void;
}

const statusColor: Record<ChatOrder['status'], string> = {
  Processing: 'text-amber-500',
  Completed: 'text-green-500',
  Cancelled: 'text-red-500',
  Pending: 'text-muted',
};

export function ChatCustomerPanel({
  customer,
  onViewProfile,
  onViewAllOrders,
}: ChatCustomerPanelProps) {
  const initials = customer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="border-ink/5 flex h-full w-64 shrink-0 flex-col gap-5 border-l px-4 py-5">
      {/* Customer identity */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Avatar className="size-16">
          <AvatarImage src={customer.avatarUrl} alt={customer.name} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-ink font-display font-semibold">{customer.name}</p>
          <p className="text-muted text-xs">{customer.location}</p>
          <p className="text-muted text-xs">Customer since {customer.memberSince}</p>
        </div>
      </div>

      <div className="border-ink/5 border-t" />

      {/* Stats */}
      <div>
        <p className="text-muted mb-2 font-mono text-[10px] tracking-widest uppercase">
          Customer Stats
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-ink/3 rounded-lg p-3 text-center">
            <p className="text-ink text-xl font-bold">{customer.totalOrders}</p>
            <p className="text-muted text-xs">Orders</p>
          </div>
          <div className="bg-ink/3 rounded-lg p-3 text-center">
            <p className="text-ink text-lg font-bold">{customer.totalSpent}</p>
            <p className="text-muted text-xs">Spent</p>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="flex flex-col gap-2">
        <p className="text-muted font-mono text-[10px] tracking-widest uppercase">Recent Orders</p>
        {customer.recentOrders.map((order) => (
          <div
            key={order.orderId}
            className="border-ink/5 flex items-start justify-between border-b pb-2"
          >
            <div>
              <p className="text-xs font-semibold text-violet-600">{order.orderId}</p>
              <p className="text-muted text-xs">{order.items}</p>
            </div>
            <div className="text-right">
              <p className="text-ink text-xs font-semibold">{order.total}</p>
              <p className={cn('text-xs font-medium', statusColor[order.status])}>{order.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <Button variant="dark" size="sm" className="w-full rounded-lg" onClick={onViewProfile}>
          View Full Profile
        </Button>
        <Button variant="outline" size="sm" className="w-full rounded-lg" onClick={onViewAllOrders}>
          All Orders <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
