/**
 * Display-time masking for sensitive identifiers.
 *
 * Rule: NIN, BVN, and document numbers are never rendered in full on the
 * client. Server-side they're stored encrypted (Supabase column encryption
 * once enabled); these helpers exist for status pages and admin previews.
 *
 * Always mask AT THE DISPLAY BOUNDARY. Server-side queries should not
 * return masked values - they should return the real value only when the
 * caller is authorised (enforced by RLS) and the caller masks on render.
 */

/** Keep the last 4 digits visible: `12345678901` → `•••••••8901`. */
export function maskNin(nin: string): string {
  const trimmed = nin.replace(/\s+/g, '');
  if (trimmed.length < 4) return '•'.repeat(trimmed.length);
  return '•'.repeat(trimmed.length - 4) + trimmed.slice(-4);
}

/** Same shape as NIN - 11 digits, last 4 visible. */
export const maskBvn = maskNin;

/** Generic: keep first + last visible, mask middle. */
export function maskMiddle(value: string, visibleStart = 2, visibleEnd = 2): string {
  if (value.length <= visibleStart + visibleEnd) return value;
  const middle = value.length - visibleStart - visibleEnd;
  return value.slice(0, visibleStart) + '•'.repeat(middle) + value.slice(-visibleEnd);
}

/** `ada@example.com` → `a••@example.com`. */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  if (local.length <= 1) return `${local}@${domain}`;
  return `${local[0]}${'•'.repeat(Math.max(2, local.length - 1))}@${domain}`;
}

/** `+2348012345678` → `+234801•••5678` (preserves country + leading digits + last 4). */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/[^+\d]/g, '');
  if (digits.length <= 8) return digits;
  return digits.slice(0, 7) + '•'.repeat(digits.length - 11) + digits.slice(-4);
}
