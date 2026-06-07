"use client";
import { Calendar, MapPin, FileText, Eye, ArrowRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { VerificationVisit } from "../data";

interface VisitCardProps {
  visit: VerificationVisit;
  onViewDetails: (visit: VerificationVisit) => void;
  style?: React.CSSProperties;
}

// Left accent colour per status
const ACCENT: Record<string, string> = {
  Scheduled: "border-l-blue-400",
  "In Progress": "border-l-amber-400",
  Completed: "border-l-emerald-400",
  Failed: "border-l-red-400",
};

export function VisitCard({ visit, onViewDetails, style }: VisitCardProps) {
  return (
    <div
      className={[
        "animate-fade-up bg-white rounded-2xl border border-gray-100 border-l-4 shadow-sm",
        "hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden group cursor-pointer",
        ACCENT[visit.status] ?? "border-l-gray-300",
      ].join(" ")}
      style={style}
      onClick={() => onViewDetails(visit)} >
      <div className="px-5 py-4">
        {/* Top row: name + status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 text-base truncate group-hover:text-[#5a9e00] transition-colors">
              {visit.vendor}
            </h3>
            <p className="text-[0.7rem] text-gray-400 mt-0.5 font-mono tracking-wide">
              {visit.id} &middot; {visit.vendorId}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={visit.status} />
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-1.5 gap-x-4 mb-3">
          <MetaItem icon={<Calendar size={11} />} text={`${visit.date} · ${visit.time}`} />
          <MetaItem icon={<MapPin size={11} />}   text={visit.location} truncate />
          <MetaItem icon={<FileText size={11} />} text={visit.inspector} />
        </div>

        {/* Category chip */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[0.65rem] font-semibold text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5">
            {visit.category}
          </span>

          {/* Result pill */}
          {visit.result && (
            <span className={`text-[0.65rem] font-bold rounded-full px-2.5 py-0.5 border ${
              visit.result === "Passed"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-600 border-red-200" }`}>
              {visit.result}
            </span>
          )}

          {/* In-progress pulsing dot */}
          {visit.status === "In Progress" && (
            <span className="flex items-center gap-1 text-[0.65rem] font-semibold text-amber-600">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Live
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 bg-gray-50/70 border-t border-gray-100 flex justify-end">
        <button
          onClick={e => { e.stopPropagation(); onViewDetails(visit); }}
          className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#5a9e00] transition-colors group/btn" >
          View Details
          <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function MetaItem({ icon, text, truncate }: { icon: React.ReactNode; text: string; truncate?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500">
      <span className="text-gray-300 shrink-0">{icon}</span>
      <span className={truncate ? "truncate" : ""}>{text}</span>
    </div>
  );
}
