"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, ShieldX, Siren, FileText, ExternalLink, Images, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import type { Landlord } from "../../landlords-components/landlord.types";
import { Button } from "@/components/ui";
import { RejectLandlordModal } from "./RejectLandlordModal";
import { ReportPoliceModal } from "./ReportPoliceModal";

interface LandlordVerificationViewProps {
  landlord: Landlord;
  onVerify: () => void;
  onReject: (reason: string) => void;
}

export function LandlordVerificationView({ landlord, onVerify, onReject }: LandlordVerificationViewProps) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [policeOpen, setPoliceOpen] = useState(false);

  const photos = landlord.businessPhotos ?? [];
  const docs = landlord.kycDocuments ?? [];

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5 h-full">

        {/* ── Left: submitted content ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-5 overflow-y-auto CustomScrollbar pb-6">

          {/* Status banner */}
          <div className={`flex items-start gap-3 rounded-2xl p-4 border ${
            landlord.status === "Suspended"
              ? "bg-red-50 border-red-100"
              : "bg-orange-50 border-orange-100"
          }`}>
            <AlertTriangle size={15} className={landlord.status === "Suspended" ? "text-red-500 shrink-0 mt-0.5" : "text-orange-500 shrink-0 mt-0.5"} />
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${landlord.status === "Suspended" ? "text-red-600" : "text-orange-600"}`}>
                {landlord.status === "Suspended"
                  ? (landlord.rejectionReason ? "Rejected" : "Suspended")
                  : "Awaiting Verification"}
              </p>
              <p className={`text-xs leading-relaxed ${landlord.status === "Suspended" ? "text-red-700" : "text-orange-700"}`}>
                {landlord.rejectionReason || landlord.suspendReason ||
                  "This landlord has submitted their details for review. Verify or reject below after checking all submitted documents and photos."}
              </p>
            </div>
          </div>

          {/* Submitted photos */}
          <div className="bg-panel border border-line/15 rounded-2xl overflow-hidden shadow-xs">
            <div className="px-5 py-4 border-b border-line/10">
              <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/80">
                Submitted property photos ({photos.length})
              </p>
            </div>

            {photos.length > 0 ? (
              <div className="p-4 flex flex-col gap-3">
                {/* Main photo */}
                <div className="relative w-full aspect-video bg-surface-deep rounded-xl overflow-hidden">
                  <Image src={photos[photoIdx]} alt={`Photo ${photoIdx + 1}`} fill className="w-full h-full object-cover" />
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5">
                    <Images size={11} className="text-white/80" />
                    <span className="text-[10px] font-bold text-white/90">{photoIdx + 1} / {photos.length}</span>
                  </div>
                  {photos.length > 1 && (
                    <>
                      <button onClick={() => setPhotoIdx(i => (i - 1 + photos.length) % photos.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white cursor-pointer">
                        <ChevronLeft size={14} />
                      </button>
                      <button onClick={() => setPhotoIdx(i => (i + 1) % photos.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white cursor-pointer">
                        <ChevronRight size={14} />
                      </button>
                    </>
                  )}
                </div>
                {/* Thumbnails */}
                {photos.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                    {photos.map((url, i) => (
                      <button key={i} onClick={() => setPhotoIdx(i)} className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${i === photoIdx ? "border-lime" : "border-transparent opacity-60 hover:opacity-100"}`}>
                        <Image src={url} alt="" width={100} height={100} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Images size={20} className="text-content-muted/30 mb-2" />
                <p className="text-xs text-content-muted/50">No photos submitted yet</p>
              </div>
            )}
          </div>

          {/* KYC Documents */}
          <div className="bg-panel border border-line/15 rounded-2xl shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-line/10">
              <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/80">
                KYC &amp; compliance documents ({docs.length})
              </p>
            </div>
            {docs.length > 0 ? (
              <div className="divide-y divide-line/10">
                {docs.map((doc, i) => (
                  <a key={i} href={doc.url} className="flex items-center gap-3 px-5 py-3.5 group hover:bg-surface-deep/50 transition-colors">
                    <span className="p-2 rounded-lg bg-surface-deep text-content-muted/70 group-hover:text-content transition-colors shrink-0">
                      <FileText size={13} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-content font-semibold truncate">{doc.label}</p>
                      <p className="text-[10px] text-content-muted/50 mt-0.5">Uploaded {doc.uploadedAt}</p>
                    </div>
                    <ExternalLink size={12} className="text-content-muted/40 group-hover:text-content-muted transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <FileText size={18} className="text-content-muted/30 mb-2" />
                <p className="text-xs text-content-muted/50">No documents submitted</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: verification actions sidebar ── */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-4">

          {/* Verify / Reject */}
          <div className="bg-panel border border-line/15 rounded-2xl p-5 shadow-xs">
            <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/80 mb-3">
              Decision
            </p>
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                onClick={onVerify}
                className="w-full h-10 rounded-xl bg-lime text-ink font-semibold hover:opacity-90 cursor-pointer shadow-xs flex items-center justify-center gap-2">
                <ShieldCheck size={14} /> Verify Landlord
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setRejectOpen(true)}
                className="w-full h-10 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-semibold cursor-pointer flex items-center justify-center gap-2">
                <ShieldX size={14} /> Reject Landlord
              </Button>
            </div>
          </div>

          {/* Quick landlord info */}
          <div className="bg-panel border border-line/15 rounded-2xl p-5 shadow-xs">
            <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/80 mb-3">
              Submitted info
            </p>
            <div className="flex flex-col gap-2 text-xs">
              {[
                { label: "ID", value: landlord.landlordId },
                { label: "Category", value: landlord.category },
                { label: "Location", value: landlord.location },
                { label: "Joined", value: landlord.joinedDate },
                { label: "Email", value: landlord.email },
                { label: "Phone", value: landlord.phone },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-2 py-1.5 border-b border-line/10 last:border-0">
                  <span className="text-content-muted/60 w-14 shrink-0">{label}</span>
                  <span className="text-content font-semibold truncate flex-1">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Report to police */}
          <div className="bg-panel border border-line/15 rounded-2xl p-5 shadow-xs">
            <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/80 mb-2">Suspect fraud?</p>
            <p className="text-[11px] text-content-muted/70 leading-relaxed mb-3">File a direct report if this account appears to be a scam.</p>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPoliceOpen(true)}
              className="w-full h-9 rounded-xl border border-line/20 text-content-muted hover:text-coral hover:border-coral/30 font-semibold cursor-pointer flex items-center justify-center gap-2 text-xs">
              <Siren size={13} /> Report to Police
            </Button>
          </div>
        </div>
      </div>

      <RejectLandlordModal
        landlord={rejectOpen ? landlord : null}
        onClose={() => setRejectOpen(false)}
        onConfirm={(reason) => { onReject(reason); setRejectOpen(false); }}
      />
      <ReportPoliceModal
        landlord={policeOpen ? landlord : null}
        onClose={() => setPoliceOpen(false)}
      />
    </>
  );
}
