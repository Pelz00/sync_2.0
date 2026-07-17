"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Home, User, Wallet, Phone as PhoneIcon, PlayCircle, ImageOff, CheckCircle2, XCircle, Clock4, AlertCircle } from "lucide-react";
import { LANDLORDS, getLandlordBySlug, getHostelBySlug, formatPrice } from "../../../../landlords-components/landlord.constants";
import { HostelVisitStatusBadge } from "../../../../landlords-components/HostelVisitStatusBadge";
import type { LandlordHostel, HostelVisitStatus } from "../../../../landlords-components/landlord.types";
import { Button, Textarea } from "@/components/ui";

interface HostelVerificationPageProps {
  landlordSlug: string;
  hostelSlug: string;
}

export function HostelVerificationPage({ landlordSlug, hostelSlug }: HostelVerificationPageProps) {
  const router = useRouter();
  const landlord = useMemo(() => getLandlordBySlug(LANDLORDS, landlordSlug), [landlordSlug]);
  const seedHostel = useMemo(() => getHostelBySlug(landlord, hostelSlug), [landlord, hostelSlug]);
  const [hostel, setHostel] = useState<LandlordHostel | undefined>(seedHostel);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!landlord || !hostel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-4">
        <p className="text-sm font-bold text-content">Hostel not found</p>
        <button
          type="button"
          onClick={() => router.push(`/admin/landlord/${landlordSlug}`)}
          className="mt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-content-muted hover:text-content">
          <ArrowLeft size={13} /> Back to {landlord?.name ?? "Landlord"}
        </button>
      </div>
    );
  }

  const report = hostel.visitReport;

  function setStatus(next: HostelVisitStatus, reason?: string) {
    setHostel(prev => prev ? { ...prev, visitStatus: next } : prev);
    if (reason) setRejectReason("");
    setShowRejectForm(false);
  }

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300">
      <button
        type="button"
        onClick={() => router.push(`/admin/landlord/${landlord.slug}`)}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-content-muted/80 hover:text-content transition-colors cursor-pointer select-none mb-6">
        <ArrowLeft size={13} /> Back to {landlord.name}
      </button>

      {/* ── Header ── */}
      <div className="bg-panel border border-line/15 rounded-2xl p-6 mb-6 shadow-xs flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="p-2.5 rounded-xl bg-surface-deep text-content-muted/70 shrink-0">
            <Home size={18} />
          </span>
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-display text-content tracking-tight">{hostel.name}</h1>
            <p className="text-xs text-content-muted/60 mt-1">
              {landlord.name} · {formatPrice(hostel.price)}{hostel.rooms !== undefined ? ` · ${hostel.rooms} rooms` : ""}
            </p>
          </div>
        </div>
        <HostelVisitStatusBadge status={hostel.visitStatus} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Main: visit report ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="bg-panel border border-line/15 rounded-2xl p-5 shadow-xs">
            <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/80 mb-4">
              Ambassador visit report
            </p>

            {!hostel.ambassador ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Clock4 size={20} className="text-content-muted/30 mb-2" />
                <p className="text-xs font-semibold text-content-muted/70">No visit scheduled yet</p>
                <p className="text-[11px] text-content-muted/50 mt-1 max-w-xs">
                  An ambassador hasn't been assigned to inspect this hostel. Assign one to begin the verification process.
                </p>
              </div>
            ) : !report ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <AlertCircle size={20} className="text-orange-400 mb-2" />
                <p className="text-xs font-semibold text-content-muted/70">Visit scheduled, report pending</p>
                <p className="text-[11px] text-content-muted/50 mt-1 max-w-xs">
                  {hostel.ambassador.name} has been assigned but hasn't submitted photos or video from the onsite visit yet.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Photos */}
                <div>
                  <p className="text-[10px] font-bold text-content-muted/60 uppercase tracking-wide mb-2">Photos ({report.photos.length})</p>
                  <div className="grid grid-cols-3 gap-2">
                    {report.photos.map((url, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-surface-deep border border-line/10">
                        <Image src={url} alt={`Visit photo ${i + 1}`} width={100} height={100} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {report.photos.length === 0 && (
                      <div className="col-span-3 flex flex-col items-center justify-center py-6 text-content-muted/40">
                        <ImageOff size={16} className="mb-1" />
                        <p className="text-[11px]">No photos uploaded</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Video */}
                {report.video && (
                  <div>
                    <p className="text-[10px] font-bold text-content-muted/60 uppercase tracking-wide mb-2">Video walkthrough</p>
                    <video controls className="w-full rounded-xl border border-line/10 bg-black aspect-video">
                      <source src={report.video} type="video/mp4" />
                    </video>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <p className="text-[10px] font-bold text-content-muted/60 uppercase tracking-wide mb-2">Ambassador notes</p>
                  <p className="text-xs text-content leading-relaxed bg-surface-deep/60 border border-line/10 rounded-xl p-3.5">{report.notes}</p>
                </div>

                <p className="text-[10px] text-content-muted/40">Submitted {report.submittedAt}</p>
              </div>
            )}
          </div>

          {/* ── Super-admin review actions ── */}
          {report && (
            <div className="bg-panel border border-line/15 rounded-2xl p-5 shadow-xs">
              <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/80 mb-4">
                Super admin review
              </p>

              {showRejectForm ? (
                <div className="flex flex-col gap-3">
                  <Textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Why is this hostel being rejected? (e.g. mismatch with photos, unsafe conditions...)"
                    rows={3}
                    className="w-full text-sm text-content bg-surface-deep border border-line/20 px-3.5 py-3 placeholder:text-content-muted/30 resize-none outline-none! ring-0! focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-all"
                  />
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" onClick={() => setShowRejectForm(false)} className="flex-1 h-10 rounded-xl border border-line/20 text-xs font-bold uppercase tracking-widest text-content-muted hover:text-content">
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      disabled={rejectReason.trim().length < 10}
                      onClick={() => setStatus("Rejected", rejectReason.trim())}
                      className="flex-1 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                      Confirm Rejection
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2.5 flex-wrap">
                  <Button
                    type="button"
                    onClick={() => setStatus("Verified")}
                    disabled={hostel.visitStatus === "Verified"}
                    className="flex-1 h-10  rounded-xl bg-lime text-ink font-semibold hover:opacity-90 cursor-pointer shadow-xs flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                    <CheckCircle2 size={14} /> Approve & List Hostel
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowRejectForm(true)}
                    disabled={hostel.visitStatus === "Rejected"}
                    className="flex-1 h-10 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-semibold cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                    <XCircle size={14} /> Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Sidebar: ambassador + hostel info ── */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
          <div className="bg-panel border border-line/15 rounded-2xl p-5 shadow-xs">
            <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/80 mb-3">Inspection</p>
            {hostel.ambassador ? (
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-surface-deep flex items-center justify-center text-content-muted/70 shrink-0">
                  <User size={16} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-content truncate">{hostel.ambassador.name}</p>
                  {hostel.ambassador.phone && (
                    <p className="text-[11px] text-content-muted/60 flex items-center gap-1 mt-0.5">
                      <PhoneIcon size={10} />{hostel.ambassador.phone}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-content-muted/50 mb-4">No ambassador assigned</p>
            )}
            <div className="flex items-center justify-between text-xs pt-3 border-t border-line/10">
              <span className="flex items-center gap-1.5 text-content-muted/70"><Wallet size={12} /> Inspection fee</span>
              <span className="font-mono font-bold text-content">{formatPrice(hostel.inspectionFee ?? 0)}</span>
            </div>
          </div>

          <div className="bg-panel border border-line/15 rounded-2xl p-5 shadow-xs">
            <p className="text-[10px] uppercase tracking-widest font-bold text-content-muted/80 mb-3">Listing details</p>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-content-muted/70">Price</span>
                <span className="font-mono font-bold text-content">{formatPrice(hostel.price)}</span>
              </div>
              {hostel.rooms !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-content-muted/70">Rooms</span>
                  <span className="font-mono font-bold text-content">{hostel.rooms}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-content-muted/70">Status</span>
                <HostelVisitStatusBadge status={hostel.visitStatus} />
              </div>
            </div>
          </div>

          {hostel.visitStatus === "Rejected" && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3.5">
              <p className="text-[11px] text-red-700 leading-relaxed font-medium">
                This hostel was rejected and is hidden from students until resubmitted and re-verified.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
