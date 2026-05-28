/**
 * ROUTE: /403 (rewrite target)
 * ACCESS: any (shown via middleware rewrite when a wrong-role user hits a protected route)
 * PURPOSE: Friendly "you don't have access to this" page. Reached only via
 *          middleware rewrite - there is no link to it in the app.
 * BUILT HERE: brand-aligned message + link back to the right home for the role.
 */
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Not allowed' };

export default function ForbiddenPage() {
  return (
    <div className="bg-cream text-ink flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="eyebrow text-lime-deep">403 · No access</p>
      <h1 className="font-display text-section max-w-md">
        This page isn&rsquo;t for your account type.
      </h1>
      <p className="text-muted max-w-md text-sm">
        Vendors, landlords, students, and admins each have their own space. Head back to yours.
      </p>
      <Button asChild>
        <Link href="/">Take me home</Link>
      </Button>
    </div>
  );
}
