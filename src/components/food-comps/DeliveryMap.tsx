"use client"

import "leaflet/dist/leaflet.css"

import { MapContainer, Marker, TileLayer } from "react-leaflet"
import L from "leaflet"

interface DeliveryMapProps {
  lat: number
  lng: number
}

const marker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export default function DeliveryMap({
  lat,
  lng,
}: DeliveryMapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      scrollWheelZoom={false}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[lat, lng]}
        icon={marker}
      />
    </MapContainer>
  )
}