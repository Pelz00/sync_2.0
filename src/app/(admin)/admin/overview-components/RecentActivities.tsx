"use client";

import { useEffect, useState } from "react";
import { Store, ShieldAlert, CheckCircle, Users } from "lucide-react";
import type { Activity } from "./data";
import { cn } from "@/lib/utils";

const TYPE_CONFIG = {
  vendor: { icon: <Store size={13} />, dot: "bg-blue-400", bg: "bg-blue-400/10", text: "text-blue-400" },
  dispute: { icon: <ShieldAlert size={13} />, dot: "bg-coral", bg: "bg-coral/10", text: "text-coral" },
  verification: { icon: <CheckCircle size={13} />, dot: "bg-orange-400", bg: "bg-orange-400/10", text: "text-orange-400" },
  user: { icon: <Users size={13} />, dot: "bg-lime", bg: "bg-lime/10", text: "text-lime" },
};

const LIVE_FEED: Activity[] = [
  { id: 100, text: "New vendor registered: Campus Bites", timeAgo: "just now", type: "vendor" },
  { id: 101, text: "Dispute #DR-2901 opened", timeAgo: "just now", type: "dispute" },
  { id: 102, text: "Verification started for Safari Self-Contain",timeAgo: "just now", type: "verification" },
  { id: 103, text: "12 new students joined today", timeAgo: "just now", type: "user" },
];

interface ActivitiesProps {
  initial: Activity[];
}

export function RecentActivities({ initial }: ActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>(initial);
  const [pulse, setPulse] = useState(false);

  // Simulate a live activity stream insertion block at periodic intervals
  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      const next = LIVE_FEED[idx % LIVE_FEED.length];
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
      setActivities(prev => [{ ...next, id: Date.now() }, ...prev.slice(0, 5)]);
      idx++;
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-panel rounded-xl border border-line/15 p-5 flex flex-col shadow-xs transition-colors duration-300">
      
      {/* Real-time feed header segment controller element box row block configure */}
      <div className="flex items-center justify-between mb-4 select-none">
        <h3 className="text-xs uppercase tracking-widest font-bold text-content-muted/80">
          Recent Activities
        </h3>
        <div className={cn(
          "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-lime transition-transform duration-300",
          pulse ? "scale-105" : ""
        )}>
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse shrink-0" />
          Live
        </div>
      </div>

      {/* Structured data activity loop item rows feed matrix block layout layout framework */}
      <div className="flex flex-col divide-y divide-line/10">
        {activities.map((a, i) => {
          const cfg = TYPE_CONFIG[a.type] || TYPE_CONFIG.user;
          const isNewItemFlash = i === 0 && pulse;

          return (
            <div
              key={a.id}
              className={cn(
                "flex items-start gap-3.5 py-3.5 transition-all duration-500",
                isNewItemFlash ? "bg-lime/5 -mx-3 px-3 rounded-xl border-y border-lime/10" : ""
              )} >
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