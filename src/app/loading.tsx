/**
 * App-wide fallback shown while the next route segment streams in.
 * Per-route loading states can override this by adding their own loading.tsx.
 */
import { BrandLoader } from '@/components/ui/brand-loader';

export default function Loading() {
  return <BrandLoader />;
}
