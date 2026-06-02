/**
 * Layout for the (vendor) route group.
 *
 * Vendor verification happens on the dedicated /onboarding wizard (not a side
 * panel), so this is a passthrough.
 */
export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
