"use client";

import type { EditorialStats } from "../admin-editorialTypes";
import { FileText, CheckCircle2, FileEdit, Eye } from "lucide-react";

interface EditorialStatsProps {
  stats: EditorialStats;
}

export function EditorialStatsRow({ stats }: EditorialStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 bg-panel border border-line/15 rounded-xl overflow-hidden mb-6 shadow-card">
      
      {/* Total Articles */}
      <div className="bg-panel px-6 py-5 border-r border-b border-line/15 flex flex-col justify-between gap-3 group transition-colors hover:bg-surface-deep/30">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-wider font-bold text-content-muted/80">
            Total Articles
          </p>
          <FileText size={16} className="text-content-muted/40 group-hover:text-content transition-colors" />
        </div>
        <p className="text-3xl font-display font-medium text-content tracking-tight">
          {stats.totalArticles}
        </p>
      </div>

      {/* Published */}
      <div className="bg-panel px-6 py-5 border-b lg:border-b-0 lg:border-r border-line/15 flex flex-col justify-between gap-3 group transition-colors hover:bg-surface-deep/30">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-wider font-bold text-content-muted/80">
            Published
          </p>
          <CheckCircle2 size={16} className="text-lime/60 group-hover:text-lime transition-colors" />
        </div>
        <p className="text-3xl font-display font-medium text-green-700 tracking-tight">
          {stats.published}
        </p>
      </div>

      {/* Drafts */}
      <div className="bg-panel px-6 py-5 border-r lg:border-b-0 border-line/15 flex flex-col justify-between gap-3 group transition-colors hover:bg-surface-deep/30">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-wider font-bold text-content-muted/80">
            Drafts
          </p>
          <FileEdit size={16} className="text-content-muted/40 group-hover:text-content transition-colors" />
        </div>
        <p className="text-3xl font-display font-medium text-content tracking-tight">
          {stats.drafts}
        </p>
      </div>

      {/* Total Views */}
      <div className="bg-panel px-6 py-5 flex flex-col justify-between gap-3 group transition-colors hover:bg-surface-deep/30">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-wider font-bold text-content-muted/80">
            Total Views
          </p>
          <Eye size={16} className="text-content-muted/40 group-hover:text-content transition-colors" />
        </div>
        <p className="text-3xl font-display font-medium text-content tracking-tight">
          {stats.totalViews.toLocaleString()}
        </p>
      </div>

    </div>
  );
}