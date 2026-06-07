// ─────────────────────────────────────────────
// Shared types for the Promotions feature
// ─────────────────────────────────────────────

export type CampaignStatus = 'Active' | 'Ended' | 'Draft' | 'Paused' | 'Scheduled';

export type PromotionType =
  | 'Featured Listing'
  | 'Sponsored Product'
  | 'Discount Campaign'
  | 'Coupon Campaign'
  | 'Flash Sale';

export interface PromotionStat {
  label: string;
  value: string | number;
  /** Icon name from lucide-react */
  icon: string;
  iconBg: string; // tailwind bg class
  iconColor: string; // tailwind text class
}

export interface PromotionTypeCard {
  type: PromotionType;
  description: string;
  icon: string; // lucide icon name
  iconBg: string;
  iconColor: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: PromotionType;
  status: CampaignStatus;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  views: number;
  clicks: number;
  sales: number;
  revenue: number;       // in kobo or whole naira — keep consistent
  budgetSpent: number;
  budgetTotal: number;
}

export interface PromotionsPageData {
  activeCampaignCount: number;
  stats: {
    totalViews: number;
    totalClicks: number;
    conversions: number;
    revenueGenerated: number;
  };
  campaigns: Campaign[];
}
