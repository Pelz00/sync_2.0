/**
 * Render the React Email templates (src/emails) to static HTML for Supabase's
 * email-template editor. The OTP code is emitted as the Supabase Go-template
 * variable `{{ .Token }}`, which Supabase substitutes at send time - so the user
 * gets a 6-digit CODE, not a magic link.
 *
 * Run: npm run email:export → writes src/emails/*.html. Paste each into
 * Supabase → Authentication → Email Templates → Body:
 *   - confirm-signup.html → "Confirm signup"  (student/vendor signup codes)
 *   - magic-link.html     → "Magic Link"      (admin/super_admin OTP login)
 *
 * The Magic Link one matters here: admins sign in with `signInWithOtp`, which
 * uses the Magic Link template - by default that sends a LINK, so it must be
 * overridden with this code template.
 */
import { createElement } from 'react';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { render } from '@react-email/render';
import { OtpEmail } from '../src/emails/otp-email';

async function main() {
  const html = await render(createElement(OtpEmail, { code: '{{ .Token }}' }), { pretty: true });
  const dir = join(process.cwd(), 'src', 'emails');
  for (const file of ['confirm-signup.html', 'magic-link.html']) {
    writeFileSync(join(dir, file), html);
  }
  console.log('Wrote src/emails/confirm-signup.html + magic-link.html.');
  console.log('Paste magic-link.html into Supabase → Email Templates → "Magic Link" Body');
  console.log('(this is what makes admin OTP login send a CODE instead of a link).');
}

main();
