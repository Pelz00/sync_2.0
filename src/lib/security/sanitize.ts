/**
 * Sanitisation helpers for user-supplied content.
 *
 * Sync currently surfaces user-written prose in three places: reviews,
 * editorial hotspot writeups (admin-authored), and vendor profile copy.
 * We render everything as plain text; if a real rich-text need appears,
 * swap `sanitizeHtml` to `isomorphic-dompurify` with a tight allowlist.
 *
 * NEVER pass user input straight into `dangerouslySetInnerHTML`.
 */

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escape characters that would otherwise be interpreted as HTML. */
export function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}

/**
 * Strip control characters, collapse internal whitespace, and trim. Use for
 * single-line fields (names, titles, addresses).
 */
export function normalizeLine(input: string): string {
  return input
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Multiline-safe normaliser: strip control chars (preserving newlines + tabs),
 * collapse runs of newlines to max two, trim ends.
 */
export function normalizeMultiline(input: string): string {
  return input
    // strip control chars EXCEPT \t (0x09) and \n (0x0A)
    .replace(/[\x00-\x08\x0B-\x1F\x7F]/g, '')
    .replace(/\r\n?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Placeholder for a real HTML sanitiser. Today: escape everything. When we
 * add a rich-text editor, replace this with `DOMPurify.sanitize(...)` and a
 * narrow allowlist (p, br, a, strong, em, ul, ol, li).
 *
 * TODO: swap to isomorphic-dompurify before shipping the editorial editor.
 */
export function sanitizeHtml(input: string): string {
  return escapeHtml(input);
}
