/**
 * Render the React Email templates (src/emails) to static HTML for Supabase's
 * email-template editor. The OTP code is emitted as the Supabase Go-template
 * variable `{{ .Token }}`, which Supabase substitutes at send time.
 *
 * Run: npm run email:export  →  writes src/emails/*.html (paste into
 * Supabase → Authentication → Email Templates → "Confirm signup" Body).
 */
import { createElement } from 'react';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { render } from '@react-email/render';
import { OtpEmail } from '../src/emails/otp-email';

async function main() {
  const html = await render(createElement(OtpEmail, { code: '{{ .Token }}' }), { pretty: true });
  const out = join(process.cwd(), 'src', 'emails', 'confirm-signup.html');
  writeFileSync(out, html);
  console.log('Wrote src/emails/confirm-signup.html — paste into Supabase “Confirm signup” Body.');
}

main();
