/**
 * Newsletter - email-capture band for the landing page. Validates the email
 * client-side with the shared zod schema, then (TODO) posts to a subscribe
 * Server Action. For now it shows a success state without a backend.
 */
'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { email as emailSchema } from '@/lib/validations';

export function Newsletter() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Enter a valid email');
      return;
    }
    setError(null);
    // TODO: call a subscribe Server Action (modules/marketing) once wired.
    setDone(true);
  }

  return (
    <section className="bg-lime text-ink mt-20 w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-md">
          <p className="eyebrow text-lime-deep">Stay in sync</p>
          <h2 className="font-display text-ink mt-3 text-[32px] font-semibold leading-tight tracking-[-0.02em] md:text-[40px]">
            New spots, every week.
          </h2>
          <p className="text-ink/70 mt-3 text-sm">
            One short email: fresh verified hostels, what&rsquo;s on this weekend, and student-only
            deals around your campus.
          </p>
        </div>

        {done ? (
          <p className="text-ink inline-flex items-center gap-2 text-sm font-medium">
            <span className="bg-ink text-lime flex h-6 w-6 items-center justify-center rounded-full">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            You&rsquo;re in - check your inbox.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="w-full max-w-sm">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="you@school.edu.ng"
                aria-label="Email address"
                aria-invalid={!!error}
                className="bg-panel text-content placeholder:text-content/40 h-12 w-full rounded-full px-5 text-sm outline-none"
              />
              <Button type="submit" variant="dark" size="lg" className="shrink-0 sm:rounded-full">
                Subscribe <ArrowRight />
              </Button>
            </div>
            {error && <p className="text-ink/80 mt-2 text-xs">{error}</p>}
            <p className="text-ink/60 mt-2 text-xs">No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}
