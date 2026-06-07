/**
 * getDashboardProfile - builds the real signed-in profile block shown at the top
 * of every dashboard sidebar (replaces the old hard-coded "AO" mock avatar).
 *
 * Reads the server-trusted profiles table (falling back to auth metadata) and
 * shapes a small, serialisable summary the client <DashboardSidebar> can render.
 * Per-role eyebrow + meta line differ, so it's keyed by the same nav key the
 * shell uses.
 */
import { getCurrentUser, getProfile } from '@/modules/auth/queries';
import { resolveHandle } from '@/lib/handle';
import type { DashboardNavKey } from '@/config/dashboard-nav';

export interface DashboardProfile {
  /** Status/role line above the name, e.g. "Verified vendor". */
  eyebrow: string;
  name: string;
  email: string;
  /** Uppercase initial(s) for the avatar fallback. */
  initial: string;
  /** Optional secondary detail (label + value), e.g. "Business · HiFoods". */
  metaLabel?: string;
  metaValue?: string;
  /** Profile picture URL (Supabase Storage later); falls back to initials. */
  avatarUrl?: string;
  /**
   * Personalised dashboard handle (student/vendor only) used to build name-based
   * URLs like `/muiz-owolabi/insights`. Derived from the same user_metadata the
   * proxy uses, so sidebar links and the proxy rewrite always agree.
   */
  handle?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  landlord: 'Landlord',
  food: 'Food vendor',
  beauty: 'Beauty pro',
  laundry: 'Laundry',
  tradesman: 'Tradesman',
};

export async function getDashboardProfile(navKey: DashboardNavKey): Promise<DashboardProfile> {
  const [user, profile] = await Promise.all([getCurrentUser(), getProfile()]);
  const meta = user?.user_metadata ?? {};

  const name =
    profile?.full_name ||
    (meta.full_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'You';
  const email = user?.email ?? '';
  const initial = name.trim().charAt(0).toUpperCase() || 'Y';
  const verified = profile?.verification_status === 'verified';

  // Handle is derived from user_metadata (+ email), NOT the profile row, so it
  // matches exactly what the proxy computes when rewriting the name-based URL.
  const handleRole = navKey === 'student' ? 'student' : 'vendor';
  const handle =
    navKey === 'admin'
      ? undefined
      : (resolveHandle({
          role: handleRole,
          full_name: meta.full_name as string | undefined,
          business_name: meta.business_name as string | undefined,
          email: user?.email,
        }) ?? undefined);

  switch (navKey) {
    case 'vendor':
      return {
        eyebrow: verified ? 'Verified vendor' : 'Vendor',
        name,
        email,
        initial,
        handle,
        metaLabel: 'Business',
        metaValue:
          profile?.business_name ||
          (profile?.vendor_category ? CATEGORY_LABELS[profile.vendor_category] : undefined),
      };
    case 'landlord':
      return {
        eyebrow: verified ? 'Verified landlord' : 'Landlord',
        name,
        email,
        initial,
        handle,
        metaLabel: 'Properties',
        metaValue: profile?.business_name || undefined,
      };
    case 'admin':
      return {
        eyebrow: profile?.role === 'super_admin' ? 'Super admin' : 'Admin',
        name,
        email,
        initial,
      };
    case 'student':
    default:
      return { eyebrow: 'Student', name, email, initial, handle };
  }
}
