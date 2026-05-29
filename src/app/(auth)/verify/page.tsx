/**
 * ROUTE: /verify
 * ACCESS: public during signup; otherwise authenticated
 * PURPOSE: OTP verification (email or SMS). 6-digit code, resend with rate-limit, then redirects into the app shell.
 * BUILT HERE: OTP input, resend button (rate-limited via @upstash/ratelimit), success state.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Verify' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/verify</p>
      <h1 className="font-display text-section text-ink">Verify</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder - see the route header above for what gets built here.
      </p>
    </section>
  );
}
