"use client";
import { useState } from "react";
import { Heart, MapPin, Star, ArrowRight, Wifi, Zap, Droplets, Shield, ChevronRight, DoorOpen } from "lucide-react";
import type { Listing, BadgeType } from "../data";
import Image from "next/image";

// ─── Constants ────────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<BadgeType, string> = {
  "Top rated": "bg-[#6abf3f] text-white",
  "Verified": "bg-[#1a1a1a] text-white",
  "Female only": "bg-pink-500 text-white",
  "Best value": "bg-amber-500 text-white",
  "New": "bg-blue-500 text-white",
};

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi size={11} />,
  "24h light": <Zap size={11} />,
  "Borehole water": <Droplets size={11} />,
  "CCTV": <Shield size={11} />,
};

// ─── Availability pill helper ─────────────────────────────────────────────────

/**
 * RoomCount
 * Colour logic:
 *   0 rooms  → red "Fully booked"
 *   1–3 → amber "Almost full"
 *   4+ → green "X / Y available"
 */
function RoomCount({ available, total }: { available: number; total: number }) {
  if (available === 0) {
    return (
      <span className="flex items-center gap-1 text-[0.65rem] font-semibold text-red-600 bg-red-50 border border-red-200 rounded-full px-2.5 py-0.5">
        <DoorOpen size={10} />
        Fully booked
      </span>
    );
  }
  if (available <= 3) {
    return (
      <span className="flex items-center gap-1 text-[0.65rem] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
        <DoorOpen size={10} />
        {available}/{total} left
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[0.65rem] font-semibold text-[#4da82a] bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">
      <DoorOpen size={10} />
      {available}/{total} available
    </span>
  );
}

// ─── Shared prop type ─────────────────────────────────────────────────────────

interface CardProps {
  listing: Listing;
  saved: boolean;
  setSaved: (v: boolean) => void;
}

// ─── Public component ─────────────────────────────────────────────────────────

interface ListingCardProps {
  listing: Listing;
  view: "List" | "Grid";
}

export default function ListingCard({ listing, view }: ListingCardProps) {
  const [saved, setSaved] = useState(false);
  if (view === "Grid") return <GridCard listing={listing} saved={saved} setSaved={setSaved} />;
  return <ListCard listing={listing} saved={saved} setSaved={setSaved} />;
}

// ─── List card ────────────────────────────────────────────────────────────────

function ListCard({ listing, saved, setSaved }: CardProps) {
  return (
    <div className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-[#ece9e0] hover:border-[#6abf3f] hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative md:w-47.5 sm:w-55 shrink-0 overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={200}
          height={200} />
        {listing.badge && (
          <span className={`absolute top-3 left-3 text-[0.65rem] font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[listing.badge]}`}>
            {listing.badge}
          </span>
        )}
        <span className="absolute bottom-2 left-2 text-[0.6rem] text-white/80 bg-black/30 backdrop-blur-sm rounded-md px-2 py-0.5">
          4–6 photos
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 min-w-0">
        {/* Name + rating */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-[#1a1a1a] text-base leading-tight group-hover:text-[#4da82a] transition-colors line-clamp-1">
            {listing.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 bg-[#f8f6f0] rounded-lg px-2 py-0.5">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-[#1a1a1a]">{listing.rating}</span>
            <span className="text-xs text-[#9a9a8a]">({listing.reviewCount})</span>
          </div>
        </div>

        {/* Location + availability row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1 min-w-0">
            <MapPin size={11} className="text-[#6abf3f] shrink-0" />
            <span className="text-xs text-[#7a7a6a] truncate">{listing.distance} · {listing.area}</span>
          </div>
          <RoomCount available={listing.roomsAvailable} total={listing.roomsTotal} />
        </div>

        {/* Amenity chips */}
        <div className="flex flex-wrap gap-1.5 mb-auto">
          {listing.amenities.slice(0, 4).map(a => (
            <span key={a} className="flex items-center gap-1 text-[0.65rem] border border-[#e0ddd4] text-[#5a5a4a] rounded-full px-2.5 py-0.5">
              {AMENITY_ICONS[a]}
              {a}
            </span>
          ))}
        </div>

        {/* Price + CTAs */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f0ede4]">
          <div>
            <span className="text-xl font-black text-[#1a1a1a]">₦{listing.price}k</span>
            <span className="text-xs text-[#9a9a8a] ml-1">/ session</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={e => { e.stopPropagation(); setSaved(!saved); }}
              className={`p-2 rounded-xl border cursor-pointer transition-all duration-200 ${
                saved
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "border-[#e0ddd4] text-[#9a9a8a] hover:border-red-200 hover:text-red-400" }`} >
              <Heart size={15} className={saved ? "fill-red-500" : ""} />
            </button>
            <button
              disabled={listing.roomsAvailable === 0}
              className="flex items-center gap-1.5 bg-[#6abf3f] hover:bg-[#5aaf2f] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200" >
              View hostel <ArrowRight size={12} className="hidden md:flex" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grid card ────────────────────────────────────────────────────────────────

function GridCard({ listing, saved, setSaved }: CardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#ece9e0] hover:border-[#6abf3f] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={200}
          height={200} />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        {listing.badge && (
          <span className={`absolute top-3 left-3 text-[0.65rem] font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[listing.badge]}`}>
            {listing.badge}
          </span>
        )}
        <button
          onClick={e => { e.stopPropagation(); setSaved(!saved); }}
          className={`absolute top-3 right-3 p-1.5 rounded-xl cursor-pointer backdrop-blur-sm transition-all duration-200 ${
            saved ? "bg-red-500 text-white" : "bg-white/80 text-[#9a9a8a] hover:text-red-400" }`} >
          <Heart size={14} className={saved ? "fill-white" : ""} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-0.5">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-white">{listing.rating}</span>
          <span className="text-xs text-white/70">({listing.reviewCount})</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-[#1a1a1a] text-sm leading-tight group-hover:text-[#4da82a] transition-colors mb-1 line-clamp-1">
          {listing.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <MapPin size={10} className="text-[#6abf3f] shrink-0" />
          <span className="text-xs text-[#7a7a6a] truncate">{listing.distance} · {listing.area}</span>
        </div>

        {/* Availability */}
        <div className="mb-3 w-fit">
          <RoomCount available={listing.roomsAvailable} total={listing.roomsTotal}/>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {listing.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-[0.6rem] border border-[#e0ddd4] text-[#5a5a4a] rounded-full px-2 py-0.5">
              {a}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-black text-[#1a1a1a]">₦{listing.price}k</span>
            <span className="text-[0.6rem] text-[#9a9a8a] ml-0.5">/ session</span>
          </div>
          <button
            disabled={listing.roomsAvailable === 0}
            className="flex items-center gap-1 bg-[#6abf3f] hover:bg-[#5aaf2f] text-white text-xs font-bold px-3 py-1.5 cursor-pointer rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
            View <ChevronRight size={11}/>
          </button>
        </div>
      </div>
    </div>
  );
}
