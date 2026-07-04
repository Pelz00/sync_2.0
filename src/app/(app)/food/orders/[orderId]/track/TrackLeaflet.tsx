'use client'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, Polyline } from 'react-leaflet'

const VENDOR_COORD: [number, number] = [8.4799, 4.5418]
const DELIVERY_COORD: [number, number] = [8.4875, 4.6810]

const VENDOR_ICON = L.divIcon({
    className: 'amap-pin-wrap',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    html: `<div style="
        width:36px;height:36px;border-radius:50%;
        background:#c5ff4a;border:3px solid #0e0e12;
        display:flex;align-items:center;justify-content:center;
        font-size:18px;transform:translate(-50%,-50%);
        box-shadow:0 2px 8px rgba(0,0,0,0.25);">🍽️</div>`,
})

const DELIVERY_ICON = L.divIcon({
    className: 'amap-pin-wrap',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    html: `<div class="amap-you"><span class="amap-you__dot"></span><span class="amap-you__label">You</span></div>`,
})

const MID: [number, number] = [
    (VENDOR_COORD[0] + DELIVERY_COORD[0]) / 2,
    (VENDOR_COORD[1] + DELIVERY_COORD[1]) / 2,
]

export default function TrackLeaflet() {
    return (
        <MapContainer
            center={MID}
            zoom={14}
            scrollWheelZoom={false}
            zoomControl={false}
            className="h-full w-full"
            style={{ height: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline
                positions={[VENDOR_COORD, DELIVERY_COORD]}
                pathOptions={{ color: '#c5ff4a', weight: 4, opacity: 0.85, dashArray: '8 6' }}
            />
            <Marker position={VENDOR_COORD} icon={VENDOR_ICON} />
            <Marker position={DELIVERY_COORD} icon={DELIVERY_ICON} />
        </MapContainer>
    )
}