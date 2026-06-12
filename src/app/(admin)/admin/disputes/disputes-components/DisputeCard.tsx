"use client";

import { MessageSquare, Calendar, Eye } from "lucide-react";
import { DisputeStatusBadge, DisputePriorityBadge } from "./DisputeBadges";
import { formatAmount } from "./dispute.constants";
import type { Dispute } from "./dispute.types";
import { cn } from "@/lib/utils";

interface DisputeCardProps {
  dispute: Dispute;
  onView: (d: Dispute) => void;
}

export function DisputeCard({ dispute, onView }: DisputeCardProps) {
  return (
    <div className="bg-panel border border-line/15 rounded-xl hover:border-line/30 transition-all duration-200 shadow-xs select-none">
      <div className="px-5 py-4">

        {/* ── Row 1: ID + Badges | View Details + Comments ── */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-mono font-bold text-content tracking-tight">{dispute.id}</span>
            <DisputeStatusBadge status={dispute.status}     />
            <DisputePriorityBadge priority={dispute.priority} />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onView(dispute)}
              className="flex items-center gap-1.5 text-xs text-content-muted hover:underline font-bold uppercase tracking-wider cursor-pointer transition-colors"
            >
              <Eye size={13} className="shrink-0" />
              <span>View Details</span>
            </button>
            <span className="flex items-center gap-1 text-xs font-mono font-medium text-content-muted/50">
              <MessageSquare size={12} className="text-content-muted/40 shrink-0" />
              {dispute.comments}
            </span>
          </div>
        </div>

        {/* ── Row 2: Order ID · Category · Amount Contextual Strings ── */}
        <div className="flex items-center gap-2 text-[11px] font-semibold text-content-muted/60 mb-3">
          <span className="font-mono">Order: {dispute.orderId}</span>
          <span className="text-line/30">·</span>
          <span>{dispute.category}</span>
          <span className="text-line/30">·</span>
          <span className="font-mono font-bold text-content">{formatAmount(dispute.amount)}</span>
        </div>

        {/* ── Main Description Layer ── */}
        <p className="text-xs sm:text-sm text-content-muted/90 mb-4 leading-relaxed font-medium">
          {dispute.description}
        </p>

        {/* ── Bottom Section: Customer | Vendor | Created Date Meta Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3.5 gap-x-4 border-t border-line/5 pt-4">
          
          {/* Customer Metadata Block */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-blue-400/10 flex items-center justify-center text-[10px] font-mono font-bold text-blue-400 shrink-0 shadow-xs">
              {dispute.customerInitials}
            </div>
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-wider font-bold text-content-muted/40 leading-none mb-1">Customer</p>
              <p className="text-xs font-bold text-content truncate">{dispute.customer}</p>
            </div>
          </div>

          {/* Vendor Metadata Block */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-lime/10 flex items-center justify-center text-[10px] font-mono font-bold text-green-600 shrink-0 shadow-xs">
              V
            </div>
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-wider font-bold text-content-muted/40 leading-none mb-1">Vendor</p>
              <p className="text-xs font-bold text-content truncate">{dispute.vendor}</p>
            </div>
          </div>

          {/* Date Created Metadata Block */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-surface-deep border border-line/10 flex items-center justify-center shrink-0 shadow-xs">
              <Calendar size={12} className="text-content-muted/50" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-wider font-bold text-content-muted/40 leading-none mb-1">Created</p>
              <p className="text-xs font-bold font-mono text-content truncate">{dispute.createdDate}</p>
            </div>
          </div>
        </div>

        {/* ── Internal Operator Assignment Notification Tag ── */}
        {dispute.assignedTo && dispute.status !== "Resolved" && (
          <div className="mt-3.5 pt-2.5 border-t border-line/5 flex items-center gap-1 text-[11px] font-semibold text-content-muted/50">
            <span>Assigned to:</span>
            <span className="text-content font-bold bg-surface-deep px-1.5 py-0.5 rounded border border-line/10">{dispute.assignedTo}</span>
          </div>
        )}
      </div>

      {/* ── Resolution Banner (Flat Clean Layout Style when Resolved) ── */}
      {dispute.resolution && (
        <div className="mx-0 border-t border-lime/10 bg-lime/5 px-5 py-3 rounded-b-xl animate-in fade-in duration-150">
          <p className="text-[9px] font-bold text-green-600 uppercase tracking-widest mb-1">Resolution Summary</p>
          <p className="text-xs font-medium text-content-muted/90 leading-normal">{dispute.resolution}</p>
        </div>
      )}
    </div>
  );
}