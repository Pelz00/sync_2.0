/**
 * Formatting helpers used across the app.
 *
 * Centralised so we can ensure consistent locale, currency symbol, and
 * date formats everywhere. Sync ships in Nigeria - default locale `en-NG`,
 * currency `NGN`.
 */
import { format, formatDistanceToNowStrict } from 'date-fns';

/**
 * Formats a number as Naira. Defaults to no decimal places (₦12,500) but
 * pass `withDecimals: true` for values that legitimately need kobo.
 */
export function formatNaira(
  amount: number,
  { withDecimals = false }: { withDecimals?: boolean } = {},
): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  }).format(amount);
}

/** Standard medium date - e.g. "12 Mar 2026". */
export function formatDate(date: Date | string | number): string {
  return format(new Date(date), 'd MMM yyyy');
}

/** "5 min ago" / "in 3 days" relative formatter. */
export function formatRelative(date: Date | string | number): string {
  return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
}
