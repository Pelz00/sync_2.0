'use client';

import { useCallback, useSyncExternalStore } from 'react';
import {
  getStoredProperties,
  removeProperty,
  saveProperty,
  subscribeToProperties,
} from '@/lib/landlord-properties';
import { properties as seedProperties, type Property } from '@/mock/StatsCard';

export function useLandlordProperties() {
  const properties = useSyncExternalStore(
    subscribeToProperties,
    getStoredProperties,
    () => seedProperties,
  );
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const save = useCallback((property: Property) => {
    saveProperty(property);
  }, []);

  const remove = useCallback((id: string) => {
    removeProperty(id);
  }, []);

  return { properties, hydrated, save, remove };
}
