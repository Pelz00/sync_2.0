/**
 * AppShell - authenticated student shell.
 *
 * Uses the same chrome as /around: the MarketingHeader (in dockMode) + the
 * horizontal ServicesDock, with a search row beneath. This keeps navigation
 * identical across the public /around feed and the signed-in module pages.
 * Built on the semantic surface tokens so it follows light/dark theme.
 *
 * Used by the (app) route group layout. Pages render inside <main>.
 */
import { MarketingHeader } from './marketing-header';
import { ServicesDock } from './services-dock';
import { ChatWidget } from '@/components/chat/chat-widget';
import { getCurrentUser, getProfile } from '@/modules/auth/queries';

export async function AppShell({ children }: { children: React.ReactNode }) {
  const [user, profile] = await Promise.all([getCurrentUser(), getProfile()]);
  const role = (profile?.role ?? (user?.user_metadata?.role as string | undefined)) as
    | 'student'
    | 'vendor'
    | 'admin'
    | undefined;

  return (
    <div className="bg-surface text-foreground flex min-h-screen flex-col">
      <MarketingHeader dockMode />
      <ServicesDock role={role} />

      <main className="mx-auto w-full max-w-7xl min-w-0 flex-1 px-4 pt-6 pb-24 md:px-6 md:pb-12">
        {children}
      </main>

      {/* Chat float - signed-in users only. */}
      {user && <ChatWidget />}
    </div>
  );
}
