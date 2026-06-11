"use client";

import type { ArticleCategory } from "../admin-editorialTypes";
import cn from "../admin-editorialConstants";

interface ArticleCategoryBadgeProps {
  category: ArticleCategory;
}

const CATEGORY_STYLES: Record<ArticleCategory, string> = {
  "Business Tips": "bg-surface-deep text-content border-line/15",
  "Market Trends": "bg-purple-500/10 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400 border-purple-500/20 dark:border-purple-400/20",
  "Safety & Compliance": "bg-coral/10 text-coral border-coral/20",
  "Marketing": "bg-accent/10 text-accent-fg border-accent/20",
  "Customer Insights": "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-500/20 dark:border-amber-400/20",
};

export function ArticleCategoryBadge({ category }: ArticleCategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-eyebrow font-semibold px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap",
        CATEGORY_STYLES[category]
      )} >
      {category}
    </span>
  );
}