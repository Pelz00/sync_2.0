import { PageHeader } from '../(components)/shared/page-header';
import { InboxClient } from '../(components)/inbox/inbox-client';

export default async function InboxPage({ searchParams }: { searchParams: Promise<{ tenantId?: string }> }) {
  const { tenantId } = await searchParams;

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Inbox" description="Respond to student inquiries across all your properties." />
      <InboxClient key={tenantId ?? 'default'} tenantId={tenantId} />
    </div>
  );
}
