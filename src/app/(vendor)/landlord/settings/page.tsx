/**
 * ROUTE: /landlord/settings
 * ACCESS: authenticated landlord
 * PURPOSE: Account settings, organised into sections - verification documents
 * and the danger zone (delete account). Add further setting classes as sections.
 */
import type { Metadata } from 'next';
import { DeleteAccountButton } from '@/components/account/delete-account-button';
import { DocumentsPanel } from '@/components/account/documents-panel';
import { SettingsSection } from '@/components/account/settings-section';

export const metadata: Metadata = { title: 'Settings' };

export default function Page() {
  return (
    <section className="flex flex-col gap-8">
      <SettingsSection
        title="Verification documents"
        description="Your uploaded documents (CAC, ID, proof of ownership) and their verification status."
      >
        <DocumentsPanel />
      </SettingsSection>

      <SettingsSection
        title="Danger zone"
        description="Irreversible and destructive actions for your account."
      >
        <DeleteAccountButton />
      </SettingsSection>
    </section>
  );
}
