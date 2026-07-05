"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ArrowLeft, ShieldCheck, ShieldX, Siren, FileText, ExternalLink, ChevronLeft, ChevronRight, Images, Mail, Phone, MapPin, Calendar, CheckCircle2, Clock, AlertCircle, Fingerprint, CreditCard } from "lucide-react";
import type { Landlord } from "./landlord.types";
import { LandlordStatusBadge } from "./LandlordStatusBadge";
import { CATEGORY_COLORS } from "./landlord.constants";
import { Button, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";

interface LandlordKycSidebarProps {
  landlord: Landlord | null;
  onClose: () => void;
  onVerify: (landlord: Landlord) => void;
  onReject: (landlord: Landlord, reason: string) => void;
}

export function LandlordKycSidebar({
  landlord, onClose, onVerify, onReject,
}: LandlordKycSidebarProps) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [policeMode, setPoliceMode] = useState(false);
  const [policeDetails, setPoliceDetails] = useState("");
  const [policeSubmitted, setPoliceSubmitted] = useState(false);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (landlord) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [landlord, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = landlord ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [landlord]);

  // Reset state when landlord changes
  useEffect(() => {
    setPhotoIdx(0);
    setRejectMode(false);
    setRejectReason("");
    setPoliceMode(false);
    setPoliceDetails("");
    setPoliceSubmitted(false);
  }, [landlord?.id]);

  if (!landlord) return null;

  const photos = landlord.businessPhotos ?? [];
  const docs = landlord.kycDocuments ?? [];
  const catColor = CATEGORY_COLORS[landlord.category] ?? "bg-gray-100 text-gray-600";
  const canReject = rejectReason.trim().length >= 10;
  const canPolice = policeDetails.trim().length >= 15;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-xs"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>

      <div className="h-full w-full max-w-md bg-panel border-l border-line/15 shadow-pop flex flex-col animate-slide-in-right transition-colors duration-300">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-line/15 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-content-muted/80 hover:text-content transition-colors cursor-pointer select-none">
            <ArrowLeft size={13} /> Back
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full">
              KYC Review
            </span>
            <Button type="button" variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-md text-content-muted hover:bg-surface-deep">
              <X size={15} />
            </Button>
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto CustomScrollbar flex flex-col gap-0">

          {/* ── Photo gallery ── */}
          {photos.length > 0 ? (
            <div className="relative w-full aspect-video bg-surface-deep shrink-0 overflow-hidden">
              <Image fill
                src={photos[photoIdx]}
                alt={`${landlord.name} photo ${photoIdx + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                <Images size={11} className="text-white/80" />
                <span className="text-[11px] font-bold text-white/90">{photoIdx + 1} / {photos.length}</span>
              </div>
              {photos.length > 1 && (
                <>
                  <button onClick={() => setPhotoIdx(i => (i - 1 + photos.length) % photos.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white cursor-pointer transition-colors">
                    <ChevronLeft size={15} />
                  </button>
                  <button onClick={() => setPhotoIdx(i => (i + 1) % photos.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white cursor-pointer transition-colors">
                    <ChevronRight size={15} />
                  </button>
                  <div className="absolute bottom-3 right-4 flex gap-1">
                    {photos.map((_, i) => (
                      <button key={i} onClick={() => setPhotoIdx(i)} className={cn("w-1.5 h-1.5 rounded-full transition-all cursor-pointer", i === photoIdx ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80")} />
                    ))}
                  </div>
                </>
              )}
              {/* Thumbnails */}
              {photos.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 translate-y-full flex gap-1.5 px-4 pt-3 pb-3 bg-panel border-b border-line/10 overflow-x-auto scrollbar-none">
                  {photos.map((url, i) => (
                    <button key={i} onClick={() => setPhotoIdx(i)} className={cn("shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer", i === photoIdx ? "border-lime" : "border-transparent opacity-60 hover:opacity-100")}>
                      <Image src={url} alt="" fill className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full aspect-video bg-surface-deep flex flex-col items-center justify-center border-b border-line/10">
              <Images size={24} className="text-content-muted/30 mb-1.5" />
              <p className="text-xs text-content-muted/50">No photos uploaded</p>
            </div>
          )}

          {/* ── Main content ── */}
          <div className={cn("px-6 py-6 flex flex-col gap-5", photos.length > 1 && "mt-[76px]")}>

            {/* Identity */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <h2 className="text-lg font-bold font-display text-content tracking-tight">{landlord.name}</h2>
                  <Clock size={14} className="text-orange-400 shrink-0" />
                </div>
                <p className="text-[10px] font-mono text-content-muted/60">{landlord.landlordId}</p>
                <span className={cn("inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md mt-1.5", catColor)}>
                  {landlord.category}
                </span>
              </div>
              <LandlordStatusBadge status={landlord.status} />
            </div>

            {/* Contact info */}
            <KycSection title="Landlord Details">
              <InfoRow icon={<Mail size={12} />} label="Email" value={landlord.email} />
              <InfoRow icon={<Phone size={12} />} label="Phone" value={landlord.phone} />
              <InfoRow icon={<MapPin size={12} />} label="Location" value={landlord.location} />
              <InfoRow icon={<Calendar size={12} />} label="Joined" value={landlord.joinedDate} />
            </KycSection>

            {/* NIN Verification */}
            <KycSection title="NIN Verification">
              {landlord.nin ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-surface-deep text-content-muted/70 shrink-0">
                      <CreditCard size={14} />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-content font-mono">{landlord.nin.nin}</p>
                      <p className="text-[10px] text-content-muted/50 mt-0.5">Submitted {landlord.nin.submittedAt}</p>
                    </div>
                  </div>
                  {landlord.nin.slipPhoto && (
                    <div className="rounded-xl overflow-hidden border border-line/15">
                      <img src={landlord.nin.slipPhoto} alt="NIN slip" className="w-full h-24 object-cover" />
                      <div className="px-3 py-2 bg-surface-deep/60 flex items-center justify-between">
                        <p className="text-[10px] text-content-muted/60 font-medium">NIN Card / Slip</p>
                        <a href="#" className="text-[10px] font-bold flex items-center gap-1">
                          View full <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <EmptyState icon={<CreditCard size={14} />} label="NIN not submitted yet" />
              )}
            </KycSection>

            {/* Liveness Check */}
            <KycSection title="Liveness Check">
              {landlord.livenessCheck ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "p-2 rounded-lg shrink-0",
                      landlord.livenessCheck.status === "Passed" ? "bg-green-50 text-green-600" :
                      landlord.livenessCheck.status === "Failed" ? "bg-red-50 text-red-600" :
                      "bg-orange-50 text-orange-500"
                    )}>
                      <Fingerprint size={14} />
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        {landlord.livenessCheck.status === "Passed"
                          ? <CheckCircle2 size={12} className="text-green-600" />
                          : landlord.livenessCheck.status === "Failed"
                          ? <AlertCircle size={12} className="text-red-500" />
                          : <Clock size={12} className="text-orange-400" />
                        }
                        <p className={cn(
                          "text-xs font-bold",
                          landlord.livenessCheck.status === "Passed" ? "text-green-700" :
                          landlord.livenessCheck.status === "Failed" ? "text-red-600" :
                          "text-orange-600"
                        )}>
                          {landlord.livenessCheck.status}
                        </p>
                      </div>
                      {landlord.livenessCheck.date && (
                        <p className="text-[10px] text-content-muted/50 mt-0.5">Checked {landlord.livenessCheck.date}</p>
                      )}
                    </div>
                  </div>
                  {landlord.livenessCheck.selfiePhoto && (
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-line/15 shrink-0">
                        <img src={landlord.livenessCheck.selfiePhoto} alt="Liveness selfie" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-content">Captured selfie</p>
                        <p className="text-[10px] text-content-muted/50 mt-0.5">Taken during liveness check</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <EmptyState icon={<Fingerprint size={14} />} label="Liveness check not completed" />
              )}
            </KycSection>

            {/* KYC Documents */}
            <KycSection title={`Compliance Documents (${docs.length})`}>
              {docs.length > 0 ? (
                <div className="flex flex-col divide-y divide-line/10">
                  {docs.map((doc, i) => (
                    <a key={i} href={doc.url} className="flex items-center gap-2.5 py-2.5 first:pt-1 last:pb-1 group">
                      <span className="p-1.5 rounded-md bg-surface-deep text-content-muted/70 group-hover:text-content transition-colors shrink-0">
                        <FileText size={12} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-content font-semibold truncate">{doc.label}</p>
                        <p className="text-[10px] text-content-muted/50">Uploaded {doc.uploadedAt}</p>
                      </div>
                      <ExternalLink size={11} className="text-content-muted/40 group-hover:text-content-muted shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              ) : (
                <EmptyState icon={<FileText size={14} />} label="No documents submitted" />
              )}
            </KycSection>

            {/* Reject form (inline) */}
            {rejectMode && (
              <div className="flex flex-col gap-3 bg-red-50 border border-red-100 rounded-2xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-600">Rejection reason *</p>
                <Textarea
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="Describe why this landlord is being rejected..."
                  rows={3}
                  className="w-full text-sm text-content bg-white border border-red-200 px-3 py-2.5 placeholder:text-content-muted/30 resize-none outline-none! ring-0! focus:border-red-300 transition-all rounded-xl"
                />
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={() => { setRejectMode(false); setRejectReason(""); }} className="flex-1 h-9 rounded-xl border border-line/20 text-xs font-bold text-content-muted hover:text-content">
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    disabled={!canReject}
                    onClick={() => { if (canReject) { onReject(landlord, rejectReason.trim()); onClose(); } }}
                    className="flex-1 h-9 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    Confirm Rejection
                  </Button>
                </div>
              </div>
            )}

            {/* Police report form (inline) */}
            {policeMode && (
              <div className="flex flex-col gap-3 bg-surface-deep/60 border border-line/15 rounded-2xl p-4">
                {policeSubmitted ? (
                  <div className="flex flex-col items-center py-4 gap-2 text-center">
                    <CheckCircle2 size={20} className="text-green-600" />
                    <p className="text-sm font-bold text-content">Report filed</p>
                    <p className="text-xs text-content-muted/70">Your report on {landlord.name} has been logged and forwarded.</p>
                    <Button type="button" variant="ghost" onClick={() => setPoliceMode(false)} className="mt-1 h-8 px-4 rounded-lg border border-line/20 text-xs font-bold text-content-muted hover:text-content">
                      Close
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted/70">Incident details *</p>
                    <Textarea
                      value={policeDetails}
                      onChange={e => setPoliceDetails(e.target.value)}
                      placeholder="Describe the suspected fraud or unsafe conduct..."
                      rows={3}
                      className="w-full text-sm text-content bg-panel border border-line/20 px-3 py-2.5 placeholder:text-content-muted/30 resize-none outline-none! ring-0! transition-all rounded-xl"
                    />
                    <div className="flex gap-2">
                      <Button type="button" variant="ghost" onClick={() => setPoliceMode(false)} className="flex-1 h-9 rounded-xl border border-line/20 text-xs font-bold text-content-muted hover:text-content">
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        disabled={!canPolice}
                        onClick={() => canPolice && setPoliceSubmitted(true)}
                        className="flex-1 h-9 rounded-xl bg-coral hover:opacity-90 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                        File Report
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

          </div>
        </div>

        {/* ── Footer actions ── */}
        {!rejectMode && !policeMode && (
          <div className="px-5 py-4 border-t border-line/15 shrink-0 bg-panel flex flex-col gap-2.5">
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => { onVerify(landlord); onClose(); }}
                className="flex-1 h-10 rounded-xl bg-lime text-ink font-semibold hover:opacity-90 cursor-pointer shadow-xs flex items-center justify-center gap-2">
                <ShieldCheck size={14} /> Verify Landlord
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setRejectMode(true)}
                className="flex-1 h-10 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-semibold cursor-pointer flex items-center justify-center gap-2">
                <ShieldX size={14} /> Reject
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setPoliceMode(true)}
              className="w-full h-9 flex items-center justify-center gap-1.5 text-xs font-semibold text-content-muted/60 hover:text-coral transition-colors rounded-xl border border-line/15 hover:border-coral/30">
              <Siren size={12} /> Report to Police
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KycSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[9px] uppercase tracking-widest font-bold text-content-muted/70 select-none">{title}</p>
      <div className="bg-surface-deep/40 border border-line/15 rounded-xl px-3.5 py-2.5 shadow-xs">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-line/10 last:border-0">
      <span className="text-content-muted/50 shrink-0">{icon}</span>
      <span className="text-[11px] font-medium text-content-muted/60 w-14 shrink-0 select-none">{label}</span>
      <span className="text-xs text-content font-semibold truncate flex-1">{value || "N/A"}</span>
    </div>
  );
}

function EmptyState({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 py-3 text-content-muted/50">
      <span className="p-1.5 rounded-md bg-surface-deep/60 text-content-muted/40 shrink-0">{icon}</span>
      <p className="text-[11px]">{label}</p>
    </div>
  );
}
