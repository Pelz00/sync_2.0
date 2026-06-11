"use client";

import { Calendar, MapPin, FileText, ArrowRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { VerificationVisit } from "../data";
import { Card, CardContent, CardFooter } from "@/components/ui";

interface VisitCardProps {
  visit: VerificationVisit;
  onViewDetails: (visit: VerificationVisit) => void;
  style?: React.CSSProperties;
}

export function VisitCard({ visit, onViewDetails, style }: VisitCardProps) {
  return (
    <Card
      style={style}
      className="border border-line/15 group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-pop hover:border-line/40"
      onClick={() => onViewDetails(visit)} >
      
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="font-bold text-content text-base truncate group-hover:text-accent-fg transition-colors tracking-tight">
              {visit.vendor}
            </h3>
            <p className="text-eyebrow text-content-muted mt-0.5">
              {visit.id} &middot; {visit.vendorId}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={visit.status}/>
          </div>
        </div>

        {/* Informational Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-1.5 gap-x-4 mb-4">
          <MetaItem icon={<Calendar size={12} />} text={`${visit.date} · ${visit.time}`} />
          <MetaItem icon={<MapPin size={12} />} text={visit.location} truncate />
          <MetaItem icon={<FileText size={12} />} text={visit.inspector} />
        </div>

        {/* Dynamic Badges & Meta Metadata Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-eyebrow text-content-muted border border-line/15 bg-surface-deep rounded-lg px-2 py-0.5">
            {visit.category}
          </span>

          {/* Dynamic Result Validation Indicator */}
          {visit.result && (
            <span className={`text-eyebrow rounded-lg px-2 py-0.5 border ${
              visit.result === "Passed"
                ? "bg-accent/10 text-accent-fg border-accent/20"
                : "bg-coral/10 text-coral border-coral/20" }`}>
              {visit.result}
            </span>
          )}

          {/* Real-time Processing Heartbeat */}
          {visit.status === "In Progress" && (
            <span className="flex items-center gap-1.5 text-eyebrow text-amber-600 dark:text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
              Live
            </span>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-end bg-surface-deep/40 border-t border-line/10">
        <button
          onClick={e => { e.stopPropagation(); onViewDetails(visit); }}
          className="flex items-center gap-1 text-xs cursor-pointer font-bold text-content-muted hover:text-accent-fg transition-colors group/btn" >
          <span>View Details</span>
          <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </CardFooter>
    </Card>
  );
}

function MetaItem({ icon, text, truncate }: { icon: React.ReactNode; text: string; truncate?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-content-muted">
      <span className="text-content-muted/50 shrink-0">{icon}</span>
      <span className={truncate ? "truncate" : ""}>{text}</span>
    </div>
  );
}