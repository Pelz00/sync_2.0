function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
import type { ArticleCategory } from "../admin-editorialTypes";

interface ArticleCategoryBadgeProps {
  category: ArticleCategory;
}

const CATEGORY_STYLES: Record<ArticleCategory, string> = {
  "Business Tips": "bg-orange-100 text-orange-700",
  "Market Trends": "bg-purple-100 text-purple-700",
  "Safety & Compliance": "bg-red-100 text-red-700",
  "Marketing": "bg-blue-100 text-blue-700",
  "Customer Insights": "bg-teal-100 text-teal-700",
};

/**
 * ArticleCategoryBadge
 *
 * Coloured chip for the article category.
 */
export function ArticleCategoryBadge({ category }: ArticleCategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full",
        CATEGORY_STYLES[category]
      )} >
      {category}
    </span>
  );
}
