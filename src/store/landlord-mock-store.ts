'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  bookingRequests as seedBookingRequests,
  properties as seedProperties,
  tenants as seedTenants,
  type BookingRequest,
  type Property,
  type Tenant,
} from '@/lib/landlord-data';
import { getRoomsBooked } from '@/lib/landlord-derived';

type PropertyOverride = {
  availability?: 'available' | 'occupied' | 'review';
};

type LandlordMockStore = {
  tenants: Tenant[];
  bookingRequests: BookingRequest[];
  propertyOverrides: Record<string, PropertyOverride>;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  approveRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
  resetMockData: () => void;
};

const freshTenants = () =>
  seedTenants.map((tenant) => ({ ...tenant, bookingHistory: [...tenant.bookingHistory] }));
const freshBookingRequests = () => seedBookingRequests.map((request) => ({ ...request }));

function addOneYear(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  date.setUTCFullYear(date.getUTCFullYear() + 1);
  return date.toISOString().slice(0, 10);
}

function bookingPeriod(moveIn: string, leaseEnd: string) {
  const formatter = new Intl.DateTimeFormat('en-NG', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return `${formatter.format(new Date(`${moveIn}T00:00:00.000Z`))} – ${formatter.format(
    new Date(`${leaseEnd}T00:00:00.000Z`),
  )}`;
}

/** Layers booking changes over the static property fixtures without mutating them. */
export function getMergedProperties(
  propertyOverrides: Record<string, PropertyOverride>,
  tenants: Tenant[],
  sourceProperties: Property[] = seedProperties,
) {
  return sourceProperties.map((property) => {
    const roomsBooked = getRoomsBooked(property.id, tenants);
    const availability =
      roomsBooked >= property.roomsTotal
        ? 'occupied'
        : propertyOverrides[property.id]?.availability;

    return {
      ...property,
      roomsBooked,
      ...(availability ? { availability } : {}),
    };
  });
}

export const useLandlordMockStore = create<LandlordMockStore>()(
  persist(
    (set, get) => ({
      tenants: freshTenants(),
      bookingRequests: freshBookingRequests(),
      propertyOverrides: {},
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      approveRequest: (requestId) => {
        const request = get().bookingRequests.find((item) => item.id === requestId);
        if (!request) return;

        const moveIn = request.requestedMoveIn;
        const leaseEnd = addOneYear(moveIn);
        const baseProperty = seedProperties.find((property) => property.id === request.propertyId);
        const nextRoomsBooked = getRoomsBooked(request.propertyId, get().tenants) + 1;
        const availability =
          baseProperty && nextRoomsBooked >= baseProperty.roomsTotal ? 'occupied' : 'available';

        const tenant: Tenant = {
          id: `tenant-${request.id}`,
          name: request.name,
          email: `${request.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '.')
            .replace(/\.$/, '')}@example.edu.ng`,
          phone: '+234 800 000 0000',
          school: 'University of Ilorin',
          studentVerified: request.studentVerified,
          propertyId: request.propertyId,
          property: request.property,
          moveIn,
          leaseEnd,
          paymentStatus: 'due',
          bookingHistory: [{ property: request.property, period: bookingPeriod(moveIn, leaseEnd) }],
        };

        set((state) => ({
          tenants: [...state.tenants, tenant],
          bookingRequests: state.bookingRequests.filter((item) => item.id !== requestId),
          propertyOverrides: {
            ...state.propertyOverrides,
            [request.propertyId]: { availability },
          },
        }));
      },
      declineRequest: (requestId) =>
        set((state) => ({
          bookingRequests: state.bookingRequests.filter((request) => request.id !== requestId),
        })),
      resetMockData: () =>
        set({
          tenants: freshTenants(),
          bookingRequests: freshBookingRequests(),
          propertyOverrides: {},
        }),
    }),
    {
      name: 'sync-landlord-mock-v1',
      partialize: ({ tenants, bookingRequests, propertyOverrides }) => ({
        tenants,
        bookingRequests,
        propertyOverrides,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
