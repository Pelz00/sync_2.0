"use client";

import { useEffect } from "react";
import { X, Mail, Phone, MapPin, Star, ShieldCheck, Clock, Package, TrendingUp, ArrowLeft, Calendar } from "lucide-react";
import { VendorStatusBadge } from "./VendorStatusBadge";
import { formatRevenue } from "./vendor.constants";
import type { Vendor } from "./vendor.types";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface VendorDetailModalProps {
  vendor: Vendor | null;
  onClose: () => void;
  onActivate: (v: Vendor) => void;
  onSuspend:  (v: Vendor) => void;
}

export function VendorDetailModal({
  vendor, onClose, onActivate, onSuspend,
}: VendorDetailModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (vendor) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [vendor, onClose]);

  useEffect(() => {
    document.body.style.overflow = vendor ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [vendor]);

  if (!vendor) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} >
      <div className="h-full w-full max-w-md bg-panel border-l border-line/15 shadow-pop flex flex-col animate-slide-in-right transition-colors duration-300">

        {/* ── Top navigation header bar ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-line/15 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-content-muted/80 hover:text-content transition-colors cursor-pointer select-none" >
            <ArrowLeft size={13} /> Back to Vendors
          </button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-md text-content-muted hover:bg-surface-deep transition-colors" >
            <X size={15} />
          </Button>
        </div>

        {/* ── Scrollable core content block wrapper ── */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 CustomScrollbar">

          {/* Primary Identity Profile Frame */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                <h2 className="text-xl font-bold font-display text-content tracking-tight">{vendor.name}</h2>
                {vendor.isVerified ? (
                  <ShieldCheck size={16} className="text-green-700 shrink-0" />
                ) : (
                  <Clock size={16} className="text-orange-400 shrink-0" />
                )}
              </div>
              <p className="text-xs font-mono font-medium text-content-muted/60">{vendor.vendorId}</p>
              <p className="text-[11px] font-bold uppercase tracking-wide mt-1">category: {vendor.category}</p>
            </div>
            <VendorStatusBadge status={vendor.status} />
          </div>

          {/* Core Metrics Visual Mini Grid Frame Row */}
          <div className="grid grid-cols-3 gap-2.5">
            <MiniStat icon={<Package size={13} />} label="Orders" value={vendor.orders.toLocaleString()} />
            <MiniStat icon={<TrendingUp size={13} />} label="Revenue" value={formatRevenue(vendor.revenue)} />
            <MiniStat icon={<Star size={13} className="fill-amber-400 text-amber-400" />}
              label="Rating" value={vendor.rating !== null ? `${vendor.rating}` : "N/A"} />
          </div>

          {/* Detailed Contact Information */}
          <Section title="Contact Information">
            <InfoRow icon={<Mail size={13} />} label="Email" value={vendor.email} />
            <InfoRow icon={<Phone size={13} />} label="Phone" value={vendor.phone} />
            <InfoRow icon={<MapPin size={13} />} label="Location" value={vendor.location} />
            <InfoRow icon={<Calendar size={13} />} label="Joined" value={vendor.joinedDate} />
          </Section>

          {/* Verification Document */}
          <Section title="Verification">
            <div className="flex items-start gap-3 ">
              {vendor.isVerified ? (
                <>
                  <ShieldCheck size={16} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-content">Verified Vendor</p>
                    <p className="text-[11px] text-content-muted/80 mt-0.5 leading-relaxed">
                      Identity and compliance documents confirmed by Sync team verification channels.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Clock size={16} className="text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-content">Pending Verification</p>
                    <p className="text-[11px] text-content-muted/80 mt-0.5 leading-relaxed">
                      Onboarding documentation under systematic review cycle by Sync operations team.
                    </p>
                  </div>
                </>
              )}
            </div>
          </Section>
        </div>

        {/* ── Transaction Action execution footer block ── */}
        <div className="px-5 py-4 border-t border-line/15 flex gap-2 shrink-0 bg-panel shadow-sm">
          {vendor.status !== "Active" && (
            <Button
              type="button"
              onClick={() => { onActivate(vendor); onClose(); }}
              className="flex-1 bg-lime text-ink font-semibold hover:opacity-90 cursor-pointer transition-opacity h-10 shadow-xs rounded-xl" >
              Activate Vendor
            </Button>
          )}
          {vendor.status !== "Suspended" && (
            <Button
              type="button"
              variant="warning"
              onClick={() => { onSuspend(vendor); onClose(); }}
              className="flex-1 border border-coral/20 bg-coral/5 hover:bg-coral/10 cursor-pointer text-coral font-semibold h-10 rounded-xl">
              Suspend Vendor
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="px-4 text-xs font-bold uppercase tracking-widest cursor-pointer text-content-muted hover:text-content h-10 rounded-xl" >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Shared Internal UI Layout Composables ──────────────────────────────────────────

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