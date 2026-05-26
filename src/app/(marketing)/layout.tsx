/**
 * Layout for the (marketing) route group: public marketing pages.
 * Wraps content in MarketingHeader + MarketingFooter.
 */
import { MarketingHeader } from '@/components/layouts/marketing-header';
import { MarketingFooter } from '@/components/layouts/marketing-footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream text-ink flex min-h-screen flex-col">
      <MarketingHeader />
      <div className="flex-1">{children}</div>
      <MarketingFooter />
    </div>
  );
}
