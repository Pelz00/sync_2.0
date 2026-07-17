"use client";

import { useEffect, useState } from "react";
import { X, Mail, Phone, MapPin, Star, ShieldCheck, Clock, Package, TrendingUp, ArrowLeft, Calendar, ChevronLeft, ChevronRight, Images, AlertTriangle, ShoppingBag, } from "lucide-react";
import { VendorStatusBadge } from "./VendorStatusBadge";
import { formatRevenue, CATEGORY_COLORS } from "./vendor.constants";
import type { Vendor } from "./vendor.types";
import Image from "next/image";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { SuspendModal } from "./SuspendModal";

interface VendorDetailModalProps {
  vendor: Vendor | null;
  onClose: () => void;
  onActivate: (v: Vendor) => void;
  onSuspend: (v: Vendor, reason: string) => void;
}

export function VendorDetailModal({ vendor, onClose, onActivate, onSuspend }: VendorDetailModalProps) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [suspendOpen, setSuspendOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !suspendOpen) onClose();
    }
    if (vendor) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [vendor, onClose, suspendOpen]);

  useEffect(() => {
    document.body.style.overflow = vendor ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [vendor]);

  useEffect(() => {
    setPhotoIdx(0);
  }, [vendor?.id]);

  if (!vendor) return null;

  const photos = vendor.businessPhotos ?? [];
  const hasPhotos = photos.length > 0;
  const catColor = CATEGORY_COLORS[vendor.category] ?? "bg-gray-100 text-gray-600";
  const vendorProducts = vendor.products ?? [];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="h-full w-full max-w-md bg-panel border-l border-line/15 shadow-pop flex flex-col animate-slide-in-right transition-colors duration-300">
          
          {/* ── Top nav bar ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-line/15 shrink-0">
            <button type="button" onClick={onClose} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-content-muted/80 hover:text-content transition-colors cursor-pointer select-none">
              <ArrowLeft size={13} /> Back to Vendors
            </button>
            <Button type="button" variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-md text-content-muted hover:bg-surface-deep transition-colors">
              <X size={15} />
            </Button>
          </div>

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-0 CustomScrollbar">
            
            {/* ── Business Photo Gallery ── */}
            {hasPhotos ? (
              <div className="relative w-full aspect-video bg-surface-deep shrink-0 overflow-hidden">
                <Image key={photos[photoIdx]} src={photos[photoIdx]} width={200} height={200} alt={`${vendor.name} — photo ${photoIdx + 1}`} className="w-full h-full object-cover transition-all duration-500" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1528323273322-d81458248d40?w=600&q=80"; }} />
                {/* gradient overlay bottom */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                {/* photo counter */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                  <Images size={12} className="text-white/80" />
                  <span className="text-[11px] font-bold text-white/90">{photoIdx + 1} / {photos.length}</span>
                </div>
                {/* nav arrows */}
                {photos.length > 1 && (
                  <>
                    <button onClick={() => setPhotoIdx(i => (i - 1 + photos.length) % photos.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors cursor-pointer">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={() => setPhotoIdx(i => (i + 1) % photos.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors cursor-pointer">
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
                {/* dot indicators */}
                {photos.length > 1 && (
                  <div className="absolute bottom-3 right-4 flex gap-1">
                    {photos.map((_, i) => (
                      <button key={i} onClick={() => setPhotoIdx(i)} className={cn("w-1.5 h-1.5 rounded-full transition-all cursor-pointer", i === photoIdx ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80")} />
                    ))}
                  </div>
                )}
                {/* thumbnail strip */}
                {photos.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full flex gap-1.5 px-4 pt-3 pb-3 bg-panel border-b border-b-line/10 overflow-x-auto scrollbar-none">
                    {photos.map((url, i) => (
                      <button key={i} onClick={() => setPhotoIdx(i)} className={cn("shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer", i === photoIdx ? "border-lime" : "border-transparent opacity-60 hover:opacity-100")}>
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full aspect-video bg-surface-deep flex flex-col items-center justify-center shrink-0 border-b border-line/10">
                <Images size={28} className="text-content-muted/30 mb-2" />
                <p className="text-xs text-content-muted/50">No business photos uploaded</p>
              </div>
            )}

            {/* ── Main content block ── */}
            <div className={cn("px-6 py-6 flex flex-col gap-6", photos.length > 1 && "mt-[76px]")}>
              {/* Identity */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <h2 className="text-xl font-bold font-display text-content tracking-tight">{vendor.name}</h2>
                    {vendor.isVerified ? (
                      <ShieldCheck size={16} className="text-green-600 shrink-0" />
                    ) : (
                      <Clock size={16} className="text-orange-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs font-mono font-medium text-content-muted/60">{vendor.vendorId}</p>
                  <span className={cn("inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md mt-1.5", catColor)}>
                    {vendor.category}
                  </span>
                </div>
                <VendorStatusBadge status={vendor.status} />
              </div>

              {/* Suspension reason banner */}
              {vendor.status === "Suspended" && vendor.suspendReason && (
                <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-xl p-3.5">
                  <AlertTriangle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-1">Suspension reason</p>
                    <p className="text-xs text-orange-700 leading-relaxed">{vendor.suspendReason}</p>
                  </div>
                </div>
              )}

              {/* Metrics grid */}
              <div className="grid grid-cols-3 gap-2.5">
                <MiniStat icon={<Package size={13} />} label="Orders" value={vendor.orders.toLocaleString()} />
                <MiniStat icon={<TrendingUp size={13} />} label="Revenue" value={formatRevenue(vendor.revenue)} />
                <MiniStat icon={<Star size={13} className="fill-amber-400 text-amber-400" />} label="Rating" value={vendor.rating !== null ? `${vendor.rating}` : "N/A"} />
              </div>

              {/* Products Inventory Section */}
              <Section title={`Products & Catalog (${vendorProducts.length})`}>
                {vendorProducts.length > 0 ? (
                  <div className="flex flex-col w-full divide-y divide-line/10">
                    {vendorProducts.map((product, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between w-full py-2.5 first:pt-1.5 last:pb-1.5 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="p-1 rounded-md bg-surface-deep text-content-muted/70 group-hover:text-content transition-colors">
                            <ShoppingBag size={12} />
                          </span>
                          <span className="text-xs text-content font-medium truncate">
                            {product.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-content whitespace-nowrap pl-2">
                          ₦{product.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <Package size={16} className="text-content-muted/30 mb-1" />
                    <p className="text-[11px] text-content-muted/50">No catalog products registered</p>
                  </div>
                )}
              </Section>

              {/* Contact */}
              <Section title="Contact Information">
                <InfoRow icon={<Mail size={13} />} label="Email" value={vendor.email} />
                <InfoRow icon={<Phone size={13} />} label="Phone" value={vendor.phone} />
                <InfoRow icon={<MapPin size={13} />} label="Location" value={vendor.location} />
                <InfoRow icon={<Calendar size={13} />} label="Joined" value={vendor.joinedDate} />
              </Section>

              

            </div>
          </div>

          {/* ── Footer actions ── */}
          <div className="px-5 py-4 border-t border-line/15 flex gap-2 shrink-0 bg-panel shadow-sm">
            {vendor.status !== "Active" && (
              <Button type="button" onClick={() => { onActivate(vendor); onClose(); }} className="flex-1 bg-lime text-ink font-semibold hover:opacity-90 cursor-pointer transition-opacity h-10 shadow-xs rounded-xl">
                Verify Vendor
              </Button>
            )}
            {vendor.status !== "Suspended" && (
              <Button type="button" variant="warning" onClick={() => setSuspendOpen(true)} className="flex-1 border border-orange-200 bg-orange-50 hover:bg-orange-100 cursor-pointer text-orange-600 font-semibold h-10 rounded-xl">
                Suspend Vendor
              </Button>
            )}
          </div>

        </div>
      </div>

      <SuspendModal vendor={suspendOpen ? vendor : null} onClose={() => setSuspendOpen(false)} onConfirm={(reason) => { onSuspend(vendor, reason); setSuspendOpen(false); onClose(); }} />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <p className="text-[9px] uppercase tracking-widest font-bold text-content-muted/80 select-none">{title}</p>
      <div className="flex flex-col border border-line/15 bg-surface-deep/40 rounded-xl px-3.5 py-1.5 shadow-xs">{children}</div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-line/10 last:border-0">
      <span className="text-content-muted/60 shrink-0">{icon}</span>
      <span className="text-xs font-medium text-content-muted/70 w-16 shrink-0 select-none">{label}</span>
      <span className="text-xs text-content font-semibold truncate flex-1">{value || "N/A"}</span>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-surface-deep border border-line/15 rounded-xl p-3 flex flex-col gap-1 shadow-xs">
      <span className="text-content-muted/70 shrink-0">{icon}</span>
      <p className="text-[10px] font-medium text-content-muted/60 select-none leading-none">{label}</p>
      <p className="text-sm font-mono font-bold text-content mt-0.5">{value}</p>
    </div>
  );
}