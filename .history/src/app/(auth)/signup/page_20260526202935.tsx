/**
 * ROUTE: /signup
 * ACCESS: public
 * PURPOSE: Account creation. Role selector (student/vendor) drives the next step — students go to /verify (OTP), vendors go to /onboarding.
 * BUILT HERE: Role radio, name/email/password, terms checkbox, submit calls modules/auth/actions.ts.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import { FormSection } from '@/components/forms';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sign up' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/signup</p>
      <h1 className="font-display text-section text-ink">Sign up</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
      {/* Form */}
      <div className="flex flex-col gap-3">
        <FormSection title="Sign Up">
          <h1>hello</h1>
        </FormSection>
      </div>
    </section>
  );
}
