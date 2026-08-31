import { properties as seedProperties, type Property } from '@/mock/StatsCard';

const STORAGE_KEY = 'sync.landlord.properties';
const CHANGE_EVENT = 'sync-landlord-properties-change';
let cachedProperties: Property[] | undefined;

type EditableProperty = Omit<Property, 'roomsBooked'>;

function withoutRoomsBooked({ ...property }: Property): EditableProperty {
  delete (property as Partial<Property>).roomsBooked;
  return property as EditableProperty;
}

function withDisplayRoomsBooked(property: EditableProperty): Property {
  return { ...property, roomsBooked: 0 };
}

function repairProperty(property: EditableProperty): EditableProperty {
  const seed = seedProperties.find((item) => item.id === property.id);
  const hasValue = (value: string | undefined) =>
    Boolean(value && value.trim() && value !== 'null');

  return {
    ...property,
    name: hasValue(property.name) ? property.name : (seed?.name ?? 'Untitled property'),
    address: hasValue(property.address) ? property.address : seed?.address,
  };
}

export function normalizeProperty(property: EditableProperty): EditableProperty {
  const roomsTotal = Math.max(1, Math.floor(property.roomsTotal));

  return {
    ...property,
    roomsTotal,
  };
}

export function getStoredProperties(): Property[] {
  if (cachedProperties) return cachedProperties;
  if (typeof window === 'undefined') {
    cachedProperties = seedProperties.map((property) =>
      withDisplayRoomsBooked(normalizeProperty(withoutRoomsBooked(property))),
    );
    return cachedProperties;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const properties = saved ? (JSON.parse(saved) as Property[]) : seedProperties;
    const editableProperties = properties.map(withoutRoomsBooked);
    cachedProperties = editableProperties.map((property) =>
      withDisplayRoomsBooked(normalizeProperty(repairProperty(property))),
    );
    if (saved) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(editableProperties));
    }
  } catch {
    cachedProperties = seedProperties.map((property) =>
      withDisplayRoomsBooked(normalizeProperty(withoutRoomsBooked(property))),
    );
  }

  return cachedProperties;
}

export function persistProperties(properties: Property[]) {
  cachedProperties = properties.map((property) =>
    withDisplayRoomsBooked(normalizeProperty(repairProperty(withoutRoomsBooked(property)))),
  );
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(cachedProperties.map(withoutRoomsBooked)),
  );
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeToProperties(callback: () => void) {
  const handleChange = () => {
    cachedProperties = undefined;
    callback();
  };
  window.addEventListener(CHANGE_EVENT, handleChange);
  window.addEventListener('storage', handleChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handleChange);
    window.removeEventListener('storage', handleChange);
  };
}

export function saveProperty(property: EditableProperty) {
  const properties = getStoredProperties();
  const index = properties.findIndex((item) => item.id === property.id);
  const next = withDisplayRoomsBooked(normalizeProperty(property));

  if (index === -1) properties.unshift(next);
  else properties[index] = next;

  persistProperties(properties);
}

export function removeProperty(id: string) {
  persistProperties(getStoredProperties().filter((property) => property.id !== id));
}
