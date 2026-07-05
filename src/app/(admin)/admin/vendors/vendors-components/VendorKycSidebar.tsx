"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  X, ArrowLeft, ShieldCheck, ShieldX, Siren, FileText, ExternalLink,
  ChevronLeft, ChevronRight, Images, Mail, Phone, MapPin, Calendar,
  CheckCircle2, Clock, AlertCircle, Fingerprint, CreditCard, Store,
  User, Wallet, PlayCircle, ImageOff,
} from "lucide-react";
import type { Vendor } from "./vendor.types";
import { VendorStatusBadge } from "./VendorStatusBadge";
import { CATEGORY_COLORS, INSPECTION_STATUS_COLORS } from "./vendor.constants";
import { Button, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";

interface VendorKycSidebarProps {
  vendor: Vendor | null;
  onClose: () => void;
  onVerify: (vendor: Vendor, note: string) => void;
  onReject: (vendor: Vendor, reason: string) => void;
}

export function VendorKycSidebar({ vendor, onClose, onVerify, onReject }: VendorKycSidebarProps) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [mode, setMode] = useState<"idle" | "verify" | "reject" | "police" | "police-done">("idle");
  const [verifyNote, setVerifyNote] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [policeDetails, setPoliceDetails] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (vendor) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [vendor, onClose]);

  useEffect(() => {
    document.body.style.overflow = vendor ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [vendor]);

  useEffect(() => {
    setPhotoIdx(0);
    setMode("idle");
    setVerifyNote("");
    setRejectReason("");
    setPoliceDetails("");
  }, [vendor?.id]);

  if (!vendor) return null;

  const photos = vendor.businessPhotos ?? [];
  const docs = vendor.kycDocuments ?? [];
  const catColor = CATEGORY_COLORS[vendor.category] ?? "bg-gray-100 text-gray-600";
  const inspection = vendor.storeInspection;
  const report = inspection?.report;
  const canVerify = verifyNote.trim().length >= 10;
  const canReject = rejectReason.trim().length >= 10;
  const canPolice = policeDetails.trim().length >= 15;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-xs"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>

      <div className="h-full w-full max-w-md bg-panel border-l border-line/15 shadow-pop flex flex-col animate-slide-in-right">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-line/15 shrink-0">
          <button type="button" onClick={onClose} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-content-muted/80 hover:text-content cursor-pointer select-none">
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

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto CustomScrollbar flex flex-col">

          {/* Photo gallery */}
          {photos.length > 0 ? (
            <div className="relative w-full aspect-video bg-surface-deep shrink-0 overflow-hidden">
              <Image src={photos[photoIdx]} alt={`${vendor.name} photo ${photoIdx + 1}`} fill className="w-full h-full object-cover transition-all duration-500" />
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
              {photos.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 translate-y-full flex gap-1.5 px-4 pt-3 pb-3 bg-panel border-b border-line/10 overflow-x-auto scrollbar-none">
                  {photos.map((url, i) => (
                    <button key={i} onClick={() => setPhotoIdx(i)} className={cn("shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer", i === photoIdx ? "border-lime" : "border-transparent opacity-60 hover:opacity-100")}>
                      <img src={url} alt="" className="w-full h-full object-cover" />
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

          {/* Content */}
          <div className={cn("px-6 py-6 flex flex-col gap-5", photos.length > 1 && "mt-[76px]")}>

            {/* Identity */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <h2 className="text-lg font-bold font-display text-content tracking-tight">{vendor.name}</h2>
                  <Clock size={14} className="text-orange-400 shrink-0" />
                </div>
                <p className="text-[10px] font-mono text-content-muted/60">{vendor.vendorId}</p>
                <span className={cn("inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md mt-1.5", catColor)}>
                  {vendor.category}
                </span>
              </div>
              <VendorStatusBadge status={vendor.status} />
            </div>

            {/* Vendor details */}
            <KycSection title="Vendor Details">
              <InfoRow icon={<Mail size={12} />} label="Email" value={vendor.email} />
              <InfoRow icon={<Phone size={12} />} label="Phone" value={vendor.phone} />
              <InfoRow icon={<MapPin size={12} />} label="Location" value={vendor.location} />
              <InfoRow icon={<Calendar size={12} />} label="Joined" value={vendor.joinedDate} />
            </KycSection>

            {/* NIN */}
            <KycSection title="NIN Verification">
              {vendor.nin ? (
                <div className="flex flex-col gap-3 py-1">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-surface-deep text-content-muted/70 shrink-0"><CreditCard size={14} /></span>
                    <div>
                      <p className="text-xs font-bold text-content font-mono">{vendor.nin.nin}</p>
                      <p className="text-[10px] text-content-muted/50 mt-0.5">Submitted {vendor.nin.submittedAt}</p>
                    </div>
                  </div>
                  {vendor.nin.slipPhoto && (
                    <div className="rounded-xl overflow-hidden border border-line/15">
                      <img src={vendor.nin.slipPhoto} alt="NIN slip" className="w-full h-20 object-cover" />
                      <div className="px-3 py-2 bg-surface-deep/60 flex items-center justify-between">
                        <p className="text-[10px] text-content-muted/60 font-medium">NIN Card / Slip</p>
                        <a href="#" className="text-[10px] text-lime font-bold flex items-center gap-1">View full <ExternalLink size={10} /></a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <EmptyState icon={<CreditCard size={14} />} label="NIN not submitted yet" />
              )}
            </KycSection>

            {/* Liveness check */}
            <KycSection title="Liveness Check">
              {vendor.livenessCheck ? (
                <div className="flex flex-col gap-3 py-1">
                  <div className="flex items-center gap-3">
                    <span className={cn("p-2 rounded-lg shrink-0",
                      vendor.livenessCheck.status === "Passed" ? "bg-green-50 text-green-600" :
                      vendor.livenessCheck.status === "Failed" ? "bg-red-50 text-red-600" :
                      "bg-orange-50 text-orange-500")}>
                      <Fingerprint size={14} />
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        {vendor.livenessCheck.status === "Passed"
                          ? <CheckCircle2 size={12} className="text-green-600" />
                          : vendor.livenessCheck.status === "Failed"
                          ? <AlertCircle size={12} className="text-red-500" />
                          : <Clock size={12} className="text-orange-400" />}
                        <p className={cn("text-xs font-bold",
                          vendor.livenessCheck.status === "Passed" ? "text-green-700" :
                          vendor.livenessCheck.status === "Failed" ? "text-red-600" : "text-orange-600")}>
                          {vendor.livenessCheck.status}
                        </p>
                      </div>
                      {vendor.livenessCheck.date && <p className="text-[10px] text-content-muted/50 mt-0.5">Checked {vendor.livenessCheck.date}</p>}
                    </div>
                  </div>
                  {vendor.livenessCheck.selfiePhoto && (
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-line/15 shrink-0">
                        <img src={vendor.livenessCheck.selfiePhoto} alt="Selfie" className="w-full h-full object-cover" />
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

            {/* KYC documents */}
            <KycSection title={`Compliance Documents (${docs.length})`}>
              {docs.length > 0 ? (
                <div className="flex flex-col divide-y divide-line/10">
                  {docs.map((doc, i) => (
                    <a key={i} href={doc.url} className="flex items-center gap-2.5 py-2.5 first:pt-1 last:pb-1 group">
                      <span className="p-1.5 rounded-md bg-surface-deep text-content-muted/70 group-hover:text-content transition-colors shrink-0"><FileText size={12} /></span>
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

            {/* ── Store Inspection Report ── */}
            <KycSection title="Store Inspection Report">
              <div className="py-1 flex flex-col gap-3">
                {/* Inspector + status */}
                <div className="flex items-center justify-between gap-2">
                  {inspection?.inspector ? (
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-surface-deep flex items-center justify-center text-content-muted/70 shrink-0"><User size={14} /></span>
                      <div>
                        <p className="text-xs font-bold text-content">{inspection.inspector.name}</p>
                        {inspection.inspector.phone && <p className="text-[10px] text-content-muted/50">{inspection.inspector.phone}</p>}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-content-muted/50">No inspector assigned</p>
                  )}
                  {inspection && (
                    <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0", INSPECTION_STATUS_COLORS[inspection.status])}>
                      {inspection.status}
                    </span>
                  )}
                </div>

                {/* Inspection fee */}
                {inspection?.inspectionFee && (
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-line/10">
                    <span className="flex items-center gap-1.5 text-content-muted/70"><Wallet size={12} /> Inspection fee</span>
                    <span className="font-mono font-bold text-content">₦{inspection.inspectionFee.toLocaleString()}</span>
                  </div>
                )}

                {/* Report: photos */}
                {report ? (
                  <div className="flex flex-col gap-3 pt-2 border-t border-line/10">
                    {report.photos.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-content-muted/60 uppercase tracking-wide mb-2">Inspector photos ({report.photos.length})</p>
                        <div className="grid grid-cols-3 gap-1.5">
                          {report.photos.map((url, i) => (
                            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-surface-deep border border-line/10">
                              <img src={url} alt={`Inspection photo ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {report.video && (
                      <div>
                        <p className="text-[10px] font-bold text-content-muted/60 uppercase tracking-wide mb-2">Video walkthrough</p>
                        <video controls className="w-full rounded-xl border border-line/10 bg-black aspect-video">
                          <source src={report.video} type="video/mp4" />
                        </video>
                      </div>
                    )}

                    <div>
                      <p className="text-[10px] font-bold text-content-muted/60 uppercase tracking-wide mb-1.5">Inspector notes</p>
                      <p className="text-xs text-content leading-relaxed bg-surface-deep/60 border border-line/10 rounded-xl p-3">{report.notes}</p>
                    </div>
                    <p className="text-[10px] text-content-muted/40">Submitted {report.submittedAt}</p>
                  </div>
                ) : inspection && inspection.status !== "Not Visited" ? (
                  <div className="flex flex-col items-center py-4 text-center border-t border-line/10">
                    <Clock size={16} className="text-orange-400 mb-1.5" />
                    <p className="text-xs font-semibold text-content-muted/70">Visit scheduled</p>
                    <p className="text-[11px] text-content-muted/50 mt-0.5">{inspection.inspector?.name} hasn't submitted a report yet.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-4 text-center border-t border-line/10">
                    <Store size={16} className="text-content-muted/30 mb-1.5" />
                    <p className="text-xs font-semibold text-content-muted/60">No visit scheduled yet</p>
                  </div>
                )}
              </div>
            </KycSection>

            {/* ── Inline forms ── */}

            {/* Verify form */}
            {mode === "verify" && (
              <div className="flex flex-col gap-3 bg-green-50 border border-green-100 rounded-2xl p-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-green-700 mb-1">Verification note *</p>
                  <p className="text-[11px] text-green-700/70 mb-2">State why you're approving this vendor — this is recorded against the account.</p>
                </div>
                <Textarea
                  value={verifyNote}
                  onChange={e => setVerifyNote(e.target.value)}
                  placeholder="e.g. Inspector confirmed store is operational. Products match listing. Store meets platform standards..."
                  rows={3}
                  className="w-full text-sm text-black bg-white border border-green-200 px-3 py-2.5 placeholder:text-content-muted/30 resize-none outline-none! ring-0! focus:border-green-400 transition-all rounded-xl"
                />
                <p className={cn("text-[10px] font-medium", verifyNote.trim().length < 10 && verifyNote.length > 0 ? "text-coral" : "text-content-muted/50")}>
                  {verifyNote.trim().length < 10 ? `${10 - verifyNote.trim().length} more characters required` : "✓ Note looks good"}
                </p>
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={() => { setMode("idle"); setVerifyNote(""); }} className="flex-1 h-9 rounded-xl border border-line/20 text-xs font-bold text-content-muted hover:text-content">
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    disabled={!canVerify}
                    onClick={() => { if (canVerify) { onVerify(vendor, verifyNote.trim()); onClose(); } }}
                    className="flex-1 h-9 rounded-xl bg-lime text-ink text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    Confirm & Verify
                  </Button>
                </div>
              </div>
            )}

            {/* Reject form */}
            {mode === "reject" && (
              <div className="flex flex-col gap-3 bg-red-50 border border-red-100 rounded-2xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-600">Rejection reason *</p>
                <Textarea
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="Describe why this vendor is being rejected..."
                  rows={3}
                  className="w-full text-sm text-content bg-white border border-red-200 px-3 py-2.5 placeholder:text-content-muted/30 resize-none outline-none! ring-0! focus:border-red-300 transition-all rounded-xl"
                />
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={() => { setMode("idle"); setRejectReason(""); }} className="flex-1 h-9 rounded-xl border border-line/20 text-xs font-bold text-content-muted hover:text-content">
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    disabled={!canReject}
                    onClick={() => { if (canReject) { onReject(vendor, rejectReason.trim()); onClose(); } }}
                    className="flex-1 h-9 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold disabled:opacity-40 transition-colors">
                    Confirm Rejection
                  </Button>
                </div>
              </div>
            )}

            {/* Police form */}
            {(mode === "police" || mode === "police-done") && (
              <div className="flex flex-col gap-3 bg-surface-deep/60 border border-line/15 rounded-2xl p-4">
                {mode === "police-done" ? (
                  <div className="flex flex-col items-center py-4 gap-2 text-center">
                    <CheckCircle2 size={20} className="text-green-600" />
                    <p className="text-sm font-bold text-content">Report filed</p>
                    <p className="text-xs text-content-muted/70">Your report on {vendor.name} has been logged and forwarded.</p>
                    <Button type="button" variant="ghost" onClick={() => setMode("idle")} className="mt-1 h-8 px-4 rounded-lg border border-line/20 text-xs font-bold text-content-muted hover:text-content">
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
                      <Button type="button" variant="ghost" onClick={() => setMode("idle")} className="flex-1 h-9 rounded-xl border border-line/20 text-xs font-bold text-content-muted hover:text-content">
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        disabled={!canPolice}
                        onClick={() => canPolice && setMode("police-done")}
                        className="flex-1 h-9 rounded-xl bg-coral hover:opacity-90 text-white text-xs font-bold disabled:opacity-40 transition-colors">
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
        {mode === "idle" && (
          <div className="px-5 py-4 border-t border-line/15 shrink-0 bg-panel flex flex-col gap-2.5">
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => setMode("verify")}
                className="flex-1 h-10 rounded-xl bg-lime text-ink font-semibold hover:opacity-90 cursor-pointer shadow-xs flex items-center justify-center gap-2">
                <ShieldCheck size={14} /> Verify Vendor
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setMode("reject")}
                className="flex-1 h-10 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-semibold cursor-pointer flex items-center justify-center gap-2">
                <ShieldX size={14} /> Reject
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMode("police")}
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
      <div className="bg-surface-deep/40 border border-line/15 rounded-xl px-3.5 py-2 shadow-xs">{children}</div>
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
