/**
 * Layout for the (vendor) route group.
 *
 * Mounts the verification side panel for signed-in vendors who haven't been
 * verified yet: it auto-opens for brand-new vendors and shows an "under review"
 * state once they've submitted. Verified vendors see nothing extra.
 */
import { getCurrentUser } from '@/modules/auth/queries';
import { VendorVerificationSheet } from '@/components/vendor/verification-sheet';

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const meta = user?.user_metadata ?? {};
  const isVendor = meta.role === 'vendor';
  const status = meta.verification_status as string | undefined;

  return (
    <>
      {children}
      {isVendor && status !== 'verified' && (
        <VendorVerificationSheet
          defaultOpen={status !== 'pending'}
          pending={status === 'pending'}
          category={meta.vendor_category as string | undefined}
        />
      )}
    </>
  );
}
