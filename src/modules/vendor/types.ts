/**
 * Domain types for the 'vendor' module.
 * Cross-module shared types belong in @/types.
 */
export {};
export interface Listing {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  status: 'Active' | 'Draft' | 'Out of Stock';
  imageUrl?: string;
}

export type DocStatus = 'approved' | 'under_review' | 'needs_action' | 'not_uploaded';

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  status: DocStatus;
  uploadedAt?: string;
  actionMessage?: string;
}

export interface TimelineEvent {
  label: string;
  date?: string;
  done: boolean;
  active?: boolean;
}
