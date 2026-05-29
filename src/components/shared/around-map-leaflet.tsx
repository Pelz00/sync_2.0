/**
 * AroundMapLeaflet - the real (Leaflet + OpenStreetMap) map for /around.
 *
 * Renders the actual streets around KWASU, Malete with custom distance pins per
 * nearby spot, a "you are here" marker, and the campus gate. Picking an area in
 * the ServicesDock location dropdown flies the map there (shared via
 * LocationContext). Client-only: loaded with `ssr: false` from <AroundMap>.
 */
'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import {
  AREA_COORDS,
  MAP_CAMPUS_POINT,
  MAP_VIEW,
  NEARBY_PINS,
  type NearbyCategory,
} from '@/mock/around';
import { useOptionalLocation } from '@/app/around/location-context';

/** Category label + dot colour (mirrored by the legend). */
const CATEGORY: Record<NearbyCategory, { label: string; color: string }> = {
  hostel: { label: 'Hostels', color: '#3f7d20' },
  food: { label: 'Food', color: '#ff8b5c' },
  event: { label: 'Events', color: '#7c5cff' },
  hotspot: { label: 'Hot spots', color: '#ff5c8b' },
  beauty: { label: 'Beauty', color: '#c45cff' },
  workmanship: { label: 'Workmanship', color: '#0e0e12' },
  laundry: { label: 'Laundry', color: '#1f9fb8' },
};

const escape = (s: string) => s.replace(/"/g, '&quot;');

function pinIcon(featured: boolean, name: string, distance: string, color: string) {
  return L.divIcon({
    className: 'amap-pin-wrap',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    html: `<div class="amap-pin${featured ? ' amap-pin--featured' : ''}">
      <span class="amap-pin__dot" style="background:${featured ? '#0e0e12' : color}"></span>
      <span class="amap-pin__text">
        <span class="amap-pin__name">${escape(name)}</span>
        <span class="amap-pin__dist">${escape(distance)}</span>
      </span>
    </div>`,
  });
}

const YOU_ICON = L.divIcon({
  className: 'amap-pin-wrap',
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  html: `<div class="amap-you"><span class="amap-you__dot"></span><span class="amap-you__label">You</span></div>`,
});

const CAMPUS_ICON = L.divIcon({
  className: 'amap-pin-wrap',
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  html: `<div class="amap-campus">${escape(MAP_CAMPUS_POINT.label)}</div>`,
});

/** Flies the map to the selected area whenever the location dropdown changes. */
function Recenter() {
  const map = useMap();
  const loc = useOptionalLocation();
  const area = loc?.area;
  useEffect(() => {
    if (!area) return;
    const coords = AREA_COORDS[area as keyof typeof AREA_COORDS];
    if (coords) map.flyTo(coords, MAP_VIEW.zoom, { duration: 0.8 });
  }, [area, map]);
  return null;
}

export default function AroundMapLeaflet() {
  const router = useRouter();
  return (
    <figure className="flex flex-col gap-4">
      <div className="border-line/10 relative isolate aspect-[4/5] w-full overflow-hidden rounded-2xl border sm:aspect-[16/10]">
        <MapContainer
          center={MAP_VIEW.center}
          zoom={MAP_VIEW.zoom}
          scrollWheelZoom={false}
          className="h-full w-full"
          style={{ height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Recenter />

          <Marker position={[MAP_CAMPUS_POINT.lat, MAP_CAMPUS_POINT.lng]} icon={CAMPUS_ICON} />
          <Marker position={MAP_VIEW.center} icon={YOU_ICON} />

          {NEARBY_PINS.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              icon={pinIcon(
                Boolean(pin.featured),
                pin.name,
                pin.distance,
                CATEGORY[pin.category].color,
              )}
              eventHandlers={{ click: () => router.push(pin.href) }}
            >
              <Tooltip direction="top" offset={[0, -4]}>
                {pin.name} · {pin.distance}
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {Object.entries(CATEGORY).map(([key, { label, color }]) => (
          <span key={key} className="text-content-muted inline-flex items-center gap-1.5 text-xs">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: color }}
            />
            {label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
