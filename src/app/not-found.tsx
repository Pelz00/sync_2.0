/**
 * 404 page. Friendly, brand-aligned, links back to the around-you hub.
 */
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="bg-surface text-content flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="eyebrow text-accent-fg">404</p>
      <h1 className="font-display text-section max-w-md">
        We can&rsquo;t find that page.
      </h1>
      <p className="text-content-muted max-w-md text-sm">
        It might have moved, or the link is wrong. Head back to the hub and try again.
      </p>
      <Button asChild>
        <Link href="/">Take me home</Link>
      </Button>
    </div>
  );
}
