'use client';

import { Check, X, CalendarClock, ShieldCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  Button,
  Avatar,
  AvatarFallback,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  toast,
} from '@/components/ui';
import { PageHeader } from '../(components)/shared/page-header';
import { TenantsTable } from '../(components)/bookings/tenants-table';
import { formatNaira, formatDate, initials } from '@/lib/landlord-data';
import { useLandlordMockStore } from '@/store/landlord-mock-store';

function VerifiedTag({ verified }: { verified: boolean }) {
  return verified ? (
    <Badge variant="accent" className="gap-1">
      <ShieldCheck className="size-3" />
      Verified
    </Badge>
  ) : (
    <Badge variant="muted">Unverified</Badge>
  );
}

export default function BookingsPage() {
  const requests = useLandlordMockStore((state) => state.bookingRequests);
  const tenants = useLandlordMockStore((state) => state.tenants);
  const approveRequest = useLandlordMockStore((state) => state.approveRequest);
  const declineRequest = useLandlordMockStore((state) => state.declineRequest);
  const resetMockData = useLandlordMockStore((state) => state.resetMockData);
  const hasHydrated = useLandlordMockStore((state) => state.hasHydrated);

  function resolve(id: string, accept: boolean, name: string) {
    if (accept) {
      approveRequest(id);
      toast.success(`Booking request from ${name} approved`);
    } else {
      declineRequest(id);
      toast.info(`Booking request from ${name} declined`);
    }
  }

  return (
    <div className="flex flex-col gap-5">

      {!hasHydrated ? null : (
        <Tabs defaultValue="requests">
          <TabsList>
            <TabsTrigger value="requests">
              Requests {requests.length > 0 ? `(${requests.length})` : ''}
            </TabsTrigger>
            <TabsTrigger value="tenants">Current tenants</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="mt-4 flex flex-col gap-4">
            {requests.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
                  <CalendarClock className="text-content-muted size-8" />
                  <p className="font-medium">No pending requests</p>
                  <p className="text-content-muted text-sm">
                    New booking requests will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              requests.map((req) => (
                <Card key={req.id}>
                  <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-11">
                        <AvatarFallback>{initials(req.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{req.name}</span>
                          <VerifiedTag verified={req.studentVerified} />
                        </div>
                        <span className="text-content-muted text-sm">
                          Wants <span className="text-content">{req.property}</span> · move-in{' '}
                          {formatDate(req.requestedMoveIn)}
                        </span>
                        <span className="text-content-muted text-xs">
                          Requested {req.submitted}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end lg:flex-row lg:items-center">
                      <span className="font-display mr-auto font-semibold sm:mr-0">
                        {formatNaira(req.amount)}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => resolve(req.id, false, req.name)}
                        >
                          <X className="size-4" />
                          Decline
                        </Button>
                        <Button size="sm" onClick={() => resolve(req.id, true, req.name)}>
                          <Check className="size-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="tenants" className="mt-4">
            <TenantsTable tenants={tenants} />
          </TabsContent>
        </Tabs>
      )}

      {hasHydrated ? (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-content-muted"
            onClick={() => {
              resetMockData();
              toast.success('Demo data reset');
            }}
          >
            Reset demo data
          </Button>
        </div>
      ) : null}
    </div>
  );
}
