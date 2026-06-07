import type { ArticleStatus } from "../admin-editorialTypes";

const cn = (...classes: Array<string | boolean | null | undefined>) =>
  classes.filter(Boolean).join(" ");

interface ArticleStatusBadgeProps {
  status: ArticleStatus;
}

const STATUS_STYLES: Record<ArticleStatus, string> = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-gray-100 text-gray-600",
  Scheduled: "bg-blue-100 text-blue-700",
};

/**
 * ArticleStatusBadge
 *
 * Small pill showing Published / Draft / Scheduled.
 */
export function ArticleStatusBadge({ status }: ArticleStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full",
        STATUS_STYLES[status] )} >
      {status}
    </span>
  );
}
