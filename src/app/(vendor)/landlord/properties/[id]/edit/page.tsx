'use client';

import { useParams } from 'next/navigation';
import { PropertyForm } from '../../../(components)/properties/property-form';
import { useLandlordProperties } from '@/hooks/use-landlord-properties';
import { getMergedProperties, useLandlordMockStore } from '@/store/landlord-mock-store';

export default function EditPropertyPage() {
  const { id } = useParams<{ id: string }>();
  const { properties, hydrated } = useLandlordProperties();
  const propertyOverrides = useLandlordMockStore((state) => state.propertyOverrides);
  const tenants = useLandlordMockStore((state) => state.tenants);
  const mockDataHydrated = useLandlordMockStore((state) => state.hasHydrated);
  const property = getMergedProperties(propertyOverrides, tenants, properties).find(
    (item) => item.id === id,
  );

  if (!hydrated || !mockDataHydrated) return null;

  return (
    <div className="max-w-3xl">
      {property ? <PropertyForm property={property} /> : <p>Property not found.</p>}
    </div>
  );
}
