/**
 * ROUTE: /me/wallet
 * ACCESS: authenticated student
 * PURPOSE: The student wallet - add funds (top up) and spend across Sync.
 * Shows balance, this-month stats, and transaction history.
 */
import type { Metadata } from 'next';
import { WalletPanel } from './(components)/wallet-panel';

export const metadata: Metadata = { title: 'Wallet' };

export default function Page() {
  return <WalletPanel />;
}
