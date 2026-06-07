/**
 * ROUTE: /me/settings
 * ACCESS: authenticated student
 * PURPOSE: Account settings, organised into sections. Currently the danger zone
 * (delete account); add further setting classes as sections.
 */
import type { Metadata } from 'next';
import { DeleteAccountButton } from '@/components/account/delete-account-button';
import { SettingsSection } from '@/components/account/settings-section';

export const metadata: Metadata = { title: 'Settings' };

export default function Page() {
  return (
    <section className="flex flex-col gap-8">
      <SettingsSection
        title="Danger zone"
        description="Irreversible and destructive actions for your account."
      >
        <DeleteAccountButton />
      </SettingsSection>
    </section>
  );
}
