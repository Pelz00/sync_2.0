"use client";

import { useState } from "react";
import { Store, ShieldAlert, CheckCircle, Users } from "lucide-react";
import type { Activity } from "./data";
import { cn } from "@/lib/utils";

const TYPE_CONFIG = {
  vendor: { icon: <Store size={13} />, dot: "bg-blue-400", bg: "bg-blue-400/10", text: "text-blue-400" },
  dispute: { icon: <ShieldAlert size={13} />, dot: "bg-coral", bg: "bg-coral/10", text: "text-coral" },
  verification: { icon: <CheckCircle size={13} />, dot: "bg-orange-400", bg: "bg-orange-400/10", text: "text-orange-400" },
  user: { icon: <Users size={13} />, dot: "bg-lime", bg: "bg-lime/10", text: "text-lime" },
};

interface ActivitiesProps {
  initial: Activity[];
}

export function RecentActivities({ initial }: ActivitiesProps) {
  const [activities] = useState<Activity[]>(initial);

  return (
    <div className="bg-panel rounded-xl border border-line/15 p-5 flex flex-col shadow-xs select-none">
      
      {/* Real-time feed header segment controller element box row block configure */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-content-muted/80">
          Recent Activities
        </h3>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-content-muted/40">
          <span className="w-1.5 h-1.5 rounded-full bg-line/40 shrink-0" />
          Feed Static
        </div>
      </div>

      {/* Structured data activity loop item rows feed matrix block layout layout framework */}
      <div className="flex flex-col divide-y divide-line/10">
        {activities.map((a) => {
          const cfg = TYPE_CONFIG[a.type] || TYPE_CONFIG.user;

          return (
            <div key={a.id} className="flex items-start gap-3.5 py-3.5">
              {/* Left Side Status Frame Rounded Shell Indicator Box Block */}
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                cfg.bg,
                cfg.text
              )}>
                {cfg.icon}
              </div>

              {/* Central Information Content Label Text Wrap Layer Slot Output */}
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-content leading-snug tracking-tight">
                  {a.text}
                </p>
                <p className="text-[11px] text-content-muted/50 mt-1 font-medium font-sans">
                  {a.timeAgo}
                </p>
              </div>

              {/* Right Side Align Tiny Node Status Marker Output Parameter */}
              <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0 shadow-xs", cfg.dot)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}