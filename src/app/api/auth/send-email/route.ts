/**
 * Supabase Send Email Hook → Resend.
 *
 * Supabase calls this endpoint (signed, Standard Webhooks) whenever it needs to
 * send an auth email. We render our own template (src/emails) and deliver it via
 * Resend, so the email is fully owned by the codebase. Returning 200 tells
 * Supabase the email was handled; a non-2xx makes it surface an error.
 *
 * Setup (Supabase Dashboard → Authentication → Hooks → Send Email Hook):
 *   - Enable, URL = https://<your-deploy>/api/auth/send-email
 *   - Copy the signing secret into SEND_EMAIL_HOOK_SECRET (v1,whsec_…)
 *   - Set RESEND_API_KEY and EMAIL_FROM (a Resend-verified sender)
 * Note: requires a publicly reachable URL - not testable from localhost without
 * a tunnel (e.g. ngrok).
 */
import { createElement } from 'react';
import { render } from '@react-email/render';
import { Resend } from 'resend';
import { Webhook } from 'standardwebhooks';
import { OtpEmail } from '@/emails/otp-email';

export const runtime = 'nodejs';

type HookPayload = {
  user: { email: string };
  email_data: {
    token: string;
    token_hash: string;
    email_action_type: string;
    redirect_to: string;
    site_url: string;
  };
};

export async function POST(req: Request) {
  const hookSecret = process.env.SEND_EMAIL_HOOK_SECRET;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? 'Sync <no-reply@sync.ng>';
  if (!hookSecret || !apiKey) {
    return Response.json({ error: 'Email hook not configured' }, { status: 500 });
  }

  const body = await req.text();
  const headers = Object.fromEntries(req.headers);

  let payload: HookPayload;
  try {
    const wh = new Webhook(hookSecret.replace('v1,whsec_', ''));
    payload = wh.verify(body, headers) as HookPayload;
  } catch {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const { user, email_data } = payload;
  const code = email_data.token;

  try {
    const html = await render(createElement(OtpEmail, { code }));
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: user.email,
      subject: `Your Sync code is ${code}`,
      html,
    });
    if (error) return Response.json({ error: error.message }, { status: 502 });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : 'Send failed' }, { status: 502 });
  }

  return Response.json({});
}
