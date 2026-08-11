'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Avatar,
  AvatarFallback,
  Button,
  Badge,
  toast,
} from '@/components/ui';
import { GraduationCap, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { StatusBadge } from '../shared/status-badge';
import { formatDate, initials, type Tenant } from '@/lib/landlord-data';

export function TenantSheet({ tenant }: { tenant: Tenant }) {
  const router = useRouter();
  const [reminderSent, setReminderSent] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col gap-6 overflow-y-auto rounded! sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tenant profile</SheetTitle>
          <SheetDescription>Booking and payment history</SheetDescription>
        </SheetHeader>

        <div className="flex items-center gap-3">
          <Avatar className="size-14">
            <AvatarFallback>{initials(tenant.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="font-display text-lead">{tenant.name}</span>
            {tenant.studentVerified ? (
              <Badge variant="accent" className="w-fit gap-1">
                <ShieldCheck className="size-3" />
                Student verified
              </Badge>
            ) : (
              <Badge variant="muted" className="w-fit">
                Unverified
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div className="text-content-muted flex items-center gap-2">
            <GraduationCap className="size-4 shrink-0" />
            <span>{tenant.school}</span>
          </div>
          <div className="text-content-muted flex items-center gap-2">
            <Mail className="size-4 shrink-0" />
            <span className="truncate">{tenant.email}</span>
          </div>
          <div className="text-content-muted flex items-center gap-2">
            <Phone className="size-4 shrink-0" />
            <span>{tenant.phone}</span>
          </div>
        </div>

        <div className="border-line/10 border-t" />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-content-muted text-xs">Current property</span>
            <span className="text-sm font-medium">{tenant.property}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-content-muted text-xs">Payment</span>
            <StatusBadge status={tenant.paymentStatus} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-content-muted text-xs">Move-in</span>
            <span className="text-sm font-medium">{formatDate(tenant.moveIn)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-content-muted text-xs">Lease ends</span>
            <span className="text-sm font-medium">{formatDate(tenant.leaseEnd)}</span>
          </div>
        </div>

        <div className="border-line/10 border-t" />

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Booking history</span>
          <div className="flex flex-col gap-2">
            {tenant.bookingHistory.map((b, i) => (
              <div key={i} className="border-line/10 flex items-center justify-between rounded-lg border p-3 text-sm">
                <span className="font-medium">{b.property}</span>
                <span className="text-content-muted">{b.period}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1"
            disabled={reminderSent}
            onClick={() => {
              setReminderSent(true);
              toast.success(`Reminder sent to ${tenant.name}`);
            }}
          >
            {reminderSent ? 'Reminder sent' : 'Send payment reminder'}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/landlord/inbox?tenantId=${encodeURIComponent(tenant.id)}`)}
          >
            Message
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
