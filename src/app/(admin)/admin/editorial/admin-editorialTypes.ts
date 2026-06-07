// ─── Admin Editorial Types ────────────────────────────────────────────────────

export type ArticleStatus = "Published" | "Draft" | "Scheduled";

export type ArticleCategory =
  | "Business Tips"
  | "Market Trends"
  | "Safety & Compliance"
  | "Marketing"
  | "Customer Insights";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: ArticleCategory;
  author: string;
  date: string;
  views: number;
  status: ArticleStatus;
  featured: boolean;
  image?: string;
}

export interface EditorialStats {
  totalArticles: number;
  published: number;
  drafts: number;
  totalViews: string;
}

export interface NewArticleFormValues {
  title: string;
  category: ArticleCategory | "";
  excerpt: string;
  content: string;
  featuredImage: File | null;
  markAsFeatured: boolean;
}

export type StatusFilterOption = "All Status" | ArticleStatus;
export type CategoryFilterOption = "All Categories" | ArticleCategory;
