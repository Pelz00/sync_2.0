'use client';

import { useState } from 'react';
import { Check, Clock3, Filter, RotateCcw, Search, ShieldCheck, X } from 'lucide-react';
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
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from '@/components/ui';
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
  const [query, setQuery] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const requests = useLandlordMockStore((state) => state.bookingRequests);
  const tenants = useLandlordMockStore((state) => state.tenants);
  const approveRequest = useLandlordMockStore((state) => state.approveRequest);
  const declineRequest = useLandlordMockStore((state) => state.declineRequest);
  const resetMockData = useLandlordMockStore((state) => state.resetMockData);
  const hasHydrated = useLandlordMockStore((state) => state.hasHydrated);

  const filteredRequests = requests.filter((request) => {
    const matchesQuery =
      !query ||
      request.name.toLowerCase().includes(query.toLowerCase()) ||
      request.property.toLowerCase().includes(query.toLowerCase());
    const matchesVerification =
      verificationFilter === 'all' ||
      (verificationFilter === 'verified' && request.studentVerified) ||
      (verificationFilter === 'unverified' && !request.studentVerified);
    return matchesQuery && matchesVerification;
  });

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
    <div className="flex flex-col gap-7 pb-8">
      <div>
        <h1 className="text-section text-content font-display">Bookings and Tenants</h1>
        <p className="text-content-muted mt-2 text-sm">
          Manage booking requests and tenants for your properties.
        </p>
      </div>
      {!hasHydrated ? null : (
        <Tabs defaultValue="requests">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <TabsList className="w-fit rounded-xl p-1">
              <TabsTrigger value="requests" className="h-11 rounded-lg px-5">
                Requests {requests.length > 0 ? `(${requests.length})` : ''}
              </TabsTrigger>
              <TabsTrigger value="tenants" className="h-11 rounded-lg px-5">
                Current tenants
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative min-w-0 sm:w-72">
                <Search className="text-content-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search requests..."
                  className="pl-9"
                />
              </div>
              <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                <SelectTrigger className="w-full sm:w-44">
                  <Filter className="size-4" />
                  <SelectValue placeholder="All requests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All requests</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="requests" className="mt-7 flex flex-col gap-5">
            {filteredRequests.length === 0 ? (
              <Card className="border-line/10 rounded-3xl border shadow-sm">
                <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
                  <Clock3 className="text-content-muted size-8" />
                  <p className="font-display font-medium">No booking requests found</p>
                  <p className="text-content-muted text-sm">
                    {query || verificationFilter !== 'all'
                      ? 'Try changing your search or filter.'
                      : 'New booking requests will appear here.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredRequests.map((req) => (
                <Card key={req.id} className="border-line/10 rounded-3xl border shadow-sm">
                  <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                      <Avatar className="bg-surface-deep size-16 shrink-0">
                        <AvatarFallback>{initials(req.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-lg font-semibold">{req.name}</span>
                          <VerifiedTag verified={req.studentVerified} />
                        </div>
                        <span className="text-content-muted text-sm">
                          Wants <span className="text-content font-medium">{req.property}</span> ·
                          move-in {formatDate(req.requestedMoveIn)}
                        </span>
                        <span className="text-content-muted flex items-center gap-1.5 text-sm">
                          <Clock3 className="size-4" /> Requested {req.submitted}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                      <div className="sm:mr-4">
                        <p className="font-display text-lg font-semibold">
                          {formatNaira(req.amount)}
                        </p>
                        <p className="text-content-muted text-sm">per session</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          size="md"
                          variant="outline"
                          onClick={() => resolve(req.id, false, req.name)}
                        >
                          <X className="size-4" />
                          Decline
                        </Button>
                        <Button size="md" onClick={() => resolve(req.id, true, req.name)}>
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

          <TabsContent value="tenants" className="mt-7">
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
            <RotateCcw className="size-4" />
            Reset demo data
          </Button>
        </div>
      ) : null}
    </div>
  );
}
