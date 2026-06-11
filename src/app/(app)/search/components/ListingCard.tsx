"use client";

import { useState } from "react";
import { Heart, MapPin, Star, ArrowRight, Wifi, Zap, Droplets, Shield, ChevronRight, DoorOpen } from "lucide-react";
import type { Listing, BadgeType } from "../data";
import Image from "next/image";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<BadgeType, string> = {
  "Top rated": "bg-lime text-ink border-line/10",
  "Verified": "bg-surface-deep text-content border-line/15",
  "Female only": "bg-pink-200 text-pink-500 border-pink-500/20 dark:text-pink-400",
  "Best value": "bg-amber-100 text-amber-600 border-amber-500/20 dark:text-amber-400",
  "New": "bg-blue-100 text-blue-600 border-blue-500/20 dark:text-blue-400",
};

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi size={11} />,
  "24h light": <Zap size={11} />,
  "Borehole water": <Droplets size={11} />,
  "CCTV": <Shield size={11} />,
};

// ─── Availability pill helper ─────────────────────────────────────────────────

function RoomCount({ available, total }: { available: number; total: number }) {
  if (available === 0) {
    return (
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-coral bg-coral/10 border border-coral/20 px-2 py-0.5 rounded-md">
        <DoorOpen size={10} />
        Fully booked
      </span>
    );
  }
  if (available <= 3) {
    return (
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
        <DoorOpen size={10} />
        {available}/{total} left
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-100 border border-lime/20 px-2 py-0.5 rounded-md">
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
    <div className="group flex flex-col md:flex-row bg-panel border border-line/15 rounded-xl overflow-hidden shadow-sm hover:border-line/40 transition-all duration-200 cursor-pointer">
      {/* Image Block Wrapper */}
      <div className="relative md:w-48 sm:w-56 shrink-0 h-48 md:h-auto overflow-hidden bg-surface-deep/20">
        <Image
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          width={200}
          height={200} />
        {listing.badge && (
          <span className={cn(
            "absolute top-3 left-3 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md border backdrop-blur-xs shadow-sm",
            BADGE_STYLES[listing.badge]
          )}>
            {listing.badge}
          </span>
        )}
        <span className="absolute bottom-2 left-2 text-[9px] font-mono font-medium text-white/80 bg-black/40 backdrop-blur-xs rounded-md px-1.5 py-0.5">
          4–6 photos
        </span>
      </div>

      {/* Input Fields / Details Wrapper */}
      <div className="flex flex-col flex-1 p-5 min-w-0 bg-panel">
        {/* Name + rating meta row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-display font-semibold text-content tracking-tight line-clamp-1 transition-colors group-hover:text-green-700">
            {listing.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 bg-surface-deep/60 border border-line/10 rounded-md px-2 py-0.5 font-mono text-xs">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="font-bold text-content">{listing.rating}</span>
            <span className="text-content-muted/60">({listing.reviewCount})</span>
          </div>
        </div>

        {/* Location + availability indicator strip */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1 min-w-0 text-xs text-content-muted/80">
            <MapPin size={12} className="shrink-0" />
            <span className="truncate">{listing.distance} · {listing.area}</span>
          </div>
          <RoomCount available={listing.roomsAvailable} total={listing.roomsTotal} />
        </div>

        {/* Amenity chips array listing */}
        <div className="flex flex-wrap gap-1.5 mb-auto">
          {listing.amenities.slice(0, 4).map(a => (
            <span key={a} className="flex items-center gap-1 text-[10px] font-medium border border-line/15 text-content-muted/90 bg-surface-deep/30 rounded-md px-2 py-0.5">
              <span className="text-content-muted/40">{AMENITY_ICONS[a]}</span>
              {a}
            </span>
          ))}
        </div>

        {/* Form Control / Action Strip */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-line/15">
          <div>
            <span className="text-xl font-display font-bold text-content">₦{listing.price}k</span>
            <span className="text-xs text-content-muted/60 font-mono ml-0.5">/ session</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={e => { e.stopPropagation(); setSaved(!saved); }}
              className={cn(
                "p-2 rounded-md border transition-colors cursor-pointer",
                saved
                  ? "bg-coral/10 border-coral/30 text-coral"
                  : "border-line/15 text-content-muted/60 bg-panel hover:bg-surface-deep hover:text-content"
              )} >
              <Heart size={14} className={saved ? "fill-coral" : ""} />
            </button>
            <Button
              type="button"
              size="sm"
              disabled={listing.roomsAvailable === 0}
              className="bg-lime text-ink font-semibold hover:opacity-90 transition-opacity h-9 px-4 shadow-sm gap-1.5 disabled:opacity-40" >
              View hostel 
              <ArrowRight size={13} className="hidden md:inline" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grid card ────────────────────────────────────────────────────────────────

function GridCard({ listing, saved, setSaved }: CardProps) {
  return (
    <div className="group bg-panel border border-line/15 rounded-xl overflow-hidden shadow-sm hover:border-line/40 transition-all duration-200 cursor-pointer flex flex-col">
      {/* Upper Image Frame Box */}
      <div className="relative h-44 overflow-hidden bg-surface-deep/20 shrink-0">
        <Image
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          width={200}
          height={176} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {listing.badge && (
          <span className={cn(
            "absolute top-3 left-3 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md border backdrop-blur-xs shadow-sm",
            BADGE_STYLES[listing.badge]
          )}>
            {listing.badge}
          </span>
        )}
        
        <button
          type="button"
          onClick={e => { e.stopPropagation(); setSaved(!saved); }}
          className={cn(
            "absolute top-3 right-3 p-1.5 rounded-md cursor-pointer border transition-colors backdrop-blur-xs",
            saved 
              ? "bg-coral border-coral text-white" 
              : "bg-black/20 border-white/10 text-white/80 hover:bg-black/40 hover:text-white"
          )} >
          <Heart size={13} className={saved ? "fill-white" : ""} />
        </button>
        
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-xs border border-white/5 rounded-md px-1.5 py-0.5 font-mono text-[11px] text-white">
          <Star size={10} className="text-amber-400 fill-amber-400" />
          <span className="font-bold">{listing.rating}</span>
          <span className="text-white/60">({listing.reviewCount})</span>
        </div>
      </div>

      {/* Main Bottom Details Body Grid wrapper */}
      <div className="flex flex-col flex-1 p-4 bg-panel space-y-3">
        <div>
          <h3 className="text-sm font-display font-semibold text-content tracking-tight line-clamp-1 transition-colors group-hover:text-green-700 mb-0.5">
            {listing.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-content-muted/80">
            <MapPin size={11} className="shrink-0" />
            <span className="truncate">{listing.distance} · {listing.area}</span>
          </div>
        </div>

        {/* Availability dynamic label component block */}
        <div className="w-fit">
          <RoomCount available={listing.roomsAvailable} total={listing.roomsTotal}/>
        </div>

        {/* Short amenities array output slice */}
        <div className="flex flex-wrap gap-1">
          {listing.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-[10px] font-medium border border-line/15 text-content-muted/80 bg-surface-deep/20 rounded-md px-1.5 py-0.5">
              {a}
            </span>
          ))}
        </div>

        {/* Lower layout footer container */}
        <div className="flex items-center justify-between pt-2.5 border-t border-line/15 mt-auto">
          <div>
            <span className="text-base font-display font-bold text-content">₦{listing.price}k</span>
            <span className="text-[10px] font-mono text-content-muted/60 ml-0.5">/ sess</span>
          </div>
          <Button
            type="button"
            size="sm"
            disabled={listing.roomsAvailable === 0}
            className="bg-lime text-ink font-semibold hover:opacity-90 transition-opacity h-8 px-3 text-xs shadow-sm gap-0.5 disabled:opacity-40" >
            View <ChevronRight size={12}/>
          </Button>
        </div>
      </div>
    </div>
  );
}