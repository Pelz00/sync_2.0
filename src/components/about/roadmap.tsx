/**
 * Roadmap - 05 "Where we're going". A horizontal 5-node stepper (scrolls on
 * mobile) showing launch → Year 1 expansion → Year 2+, with a closing line.
 */
import { Reveal } from '@/components/shared/reveal';
import { cn } from '@/lib/utils';

type NodeStatus = 'active' | 'queued' | 'future';

const NODES: { campus: string; phase: string; status: NodeStatus }[] = [
  { campus: 'KWASU · Malete', phase: 'Launch', status: 'active' },
  { campus: 'UNILORIN', phase: 'Year 1 expansion', status: 'queued' },
  { campus: 'Al-Hikmah', phase: 'Year 1 expansion', status: 'queued' },
  { campus: 'Ilorin Polytechnic', phase: 'Year 1 expansion', status: 'queued' },
  { campus: 'Beyond Kwara', phase: 'Year 2+', status: 'future' },
];

export function Roadmap() {
  return (
    <section aria-labelledby="roadmap-heading" className="bg-surface px-6 pt-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-accent-fg">05 · Where we&rsquo;re going</p>
          <h2
            id="roadmap-heading"
            className="font-display text-foreground mt-4 text-[32px] leading-tight font-semibold tracking-[-0.02em] md:text-[44px]"
          >
            <em>Trusted, before everywhere.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="mt-12 flex [scrollbar-width:none] gap-4 overflow-x-auto px-1 py-2 md:gap-2 [&::-webkit-scrollbar]:hidden">
            {NODES.map((n, i) => (
              <li key={n.campus} className="flex min-w-[160px] flex-1 flex-col gap-3">
                {/* Track + node */}
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'h-3 w-3 shrink-0 rounded-full',
                      n.status === 'active' && 'bg-lime ring-lime/30 ring-4',
                      n.status === 'queued' && 'bg-accent-fg',
                      n.status === 'future' && 'border-line/30 border-2 bg-transparent',
                    )}
                  />
                  {i < NODES.length - 1 && (
                    <span
                      className={cn(
                        'h-px flex-1',
                        n.status === 'active' ? 'bg-accent-fg/50' : 'bg-line/15',
                      )}
                    />
                  )}
                </div>
                <div>
                  <p className="text-foreground text-sm font-semibold">{n.campus}</p>
                  <p
                    className={cn(
                      'mt-0.5 text-xs',
                      n.status === 'active' ? 'text-accent-fg' : 'text-content-muted',
                    )}
                  >
                    {n.phase}
                    {n.status === 'active' && ' · active'}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center">
          <p className="text-foreground/80 mt-10 text-center text-[18px] leading-relaxed md:text-justify">
            We&rsquo;re not in a rush to be everywhere. We&rsquo;re in a rush to be <em>trusted</em>{' '}
            everywhere we are.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
