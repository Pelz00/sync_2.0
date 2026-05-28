/**
 * App-wide constants. If a magic value appears in two places, it belongs here.
 */

/** Fee taken on top of every verified hostel booking, paid to Sync. */
export const VERIFIED_LISTING_FEE_PCT = 0.05;

/** Caps for file uploads, in bytes. */
export const FILE_SIZE_LIMITS = {
  avatar: 2 * 1024 * 1024, // 2MB
  listingImage: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
} as const;

/** Accepted MIME types per upload kind. Validated client AND server-side. */
export const ACCEPTED_MIME = {
  image: ['image/jpeg', 'image/png', 'image/webp'],
  document: ['application/pdf', 'image/jpeg', 'image/png'],
} as const;

/** Pagination default page size. */
export const PAGE_SIZE = 24;

/** Cache-tag prefix for per-vendor revalidation. */
export const CACHE_TAGS = {
  vendor: (id: string) => `vendor:${id}`,
  listing: (id: string) => `listing:${id}`,
  user: (id: string) => `user:${id}`,
} as const;
