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
