import type { Tenant } from '@/lib/landlord-data';

/** Booking occupancy is derived from active tenants, never saved on a property. */
export function getRoomsBooked(propertyId: string, tenants: Tenant[]): number {
  return tenants.filter((tenant) => tenant.propertyId === propertyId).length;
}
