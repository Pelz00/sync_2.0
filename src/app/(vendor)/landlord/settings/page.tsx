/**
 * ROUTE: /landlord/settings
 * ACCESS: authenticated landlord
 * PURPOSE: Account settings - currently the danger zone (delete account).
 */
import type { Metadata } from 'next';
import { DeleteAccountButton } from '@/components/account/delete-account-button';

export const metadata: Metadata = { title: 'Settings' };

export default function Page() {
  return (
    <section className="flex max-w-2xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <p className="eyebrow text-content-muted">LANDLORD . SETTINGS</p>
        <h1 className="text-section text-content font-display font-medium">Settings</h1>
      </header>

      <div className="flex flex-col gap-3">
        <p className="eyebrow text-content-muted">DANGER ZONE</p>
        <DeleteAccountButton />
      </div>
    </section>
  );
}
