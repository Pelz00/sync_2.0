"use client";
import { useState } from "react";
import { Store, ShieldAlert, CheckCircle, Users, X } from "lucide-react";
import type { Activity } from "./data";
import { cn } from "@/lib/utils";

const TYPE_CONFIG = {
  vendor: { icon: <Store size={13} />, dot: "bg-blue-400", bg: "bg-blue-400/10", text: "text-blue-400", label: "Vendor" },
  dispute: { icon: <ShieldAlert size={13} />, dot: "bg-coral", bg: "bg-coral/10", text: "text-coral", label: "Dispute" },
  verification: { icon: <CheckCircle size={13} />, dot: "bg-orange-400", bg: "bg-orange-400/10", text: "text-orange-400", label: "Verification" },
  user: { icon: <Users size={13} />, dot: "bg-lime", bg: "bg-lime/10", text: "text-lime", label: "User" },
};

interface ActivitiesProps {
  initial: Activity[];
}

export function RecentActivities({ initial }: ActivitiesProps) {
  const [activities] = useState<Activity[]>(initial);
  const [selected, setSelected] = useState<Activity | null>(null);
  const [closing, setClosing] = useState(false);

  function openActivity(a: Activity) {
    setSelected(a);
    setClosing(false);
  }

  function closeModal() {
    setClosing(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        setSelected(null);
        setClosing(false);
      }, 180);
    });
  }

  return (
    <div className="bg-panel rounded-xl border border-line/15 p-5 flex flex-col shadow-xs select-none">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-content-muted/80">
          Recent Activities
        </h3>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-content-muted/40">
          <span className="w-1.5 h-1.5 rounded-full bg-line/40 shrink-0" />
          Feed Static
        </div>
      </div>

      <div className="flex flex-col divide-y divide-line/10">
        {activities.map((a) => {
          const cfg = TYPE_CONFIG[a.type] || TYPE_CONFIG.user;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => openActivity(a)}
              className="flex items-start gap-3.5 py-3.5 text-left w-full rounded-lg transition-colors hover:bg-line/5 px-1.5 -mx-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-line/30"
            >
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                cfg.bg,
                cfg.text
              )}>
                {cfg.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-content leading-snug tracking-tight">
                  {a.text}
                </p>
                <p className="text-[11px] text-content-muted/50 mt-1 font-medium font-sans">
                  {a.timeAgo}
                </p>
              </div>
              <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0 shadow-xs", cfg.dot)} />
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 transition-opacity duration-150",
            closing ? "opacity-0" : "opacity-100"
          )}
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "bg-panel border border-line/15 rounded-xl shadow-xs w-full max-w-sm p-5 transition-all duration-150",
              closing ? "opacity-0 scale-95" : "opacity-100 scale-100"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center",
                TYPE_CONFIG[selected.type]?.bg,
                TYPE_CONFIG[selected.type]?.text
              )}>
                {TYPE_CONFIG[selected.type]?.icon}
              </div>
              <button
                onClick={closeModal}
                className="text-content-muted/50 hover:text-content-muted transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-[10px] uppercase tracking-wider font-bold text-content-muted/40 mb-1">
              {TYPE_CONFIG[selected.type]?.label ?? "Activity"}
            </p>
            <p className="text-sm font-semibold text-content leading-snug mb-2">
              {selected.text}
            </p>
            <p className="text-[11px] text-content-muted/50 font-medium">
              {selected.timeAgo}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}