/**
 * DocumentsPanel - vendor/landlord verification documents. Renders the uploaded
 * document list with per-document status badges + an upload/re-upload action,
 * alongside the overall verification timeline. Lives in account/ because it's
 * surfaced as a section of the Settings page. Driven by mock data for now
 * (src/mock/document.ts); wire to real uploads + signed-URL previews once the
 * storage layer lands.
 */
import { CheckCircle2, Circle, Clock, FileText, Upload } from 'lucide-react';
import { Badge, Button, Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';
import { DOC_ICON_COLOUR, INITIAL_DOCS, INITIAL_TIMELINE } from '@/mock/document';
import type { DocStatus } from '@/modules/vendor/types';

const STATUS: Record<
  DocStatus,
  { label: string; variant: 'accent' | 'warning' | 'neutral' | 'outline'; action: string }
> = {
  approved: { label: 'Approved', variant: 'accent', action: 'View' },
  under_review: { label: 'Under review', variant: 'neutral', action: 'View' },
  needs_action: { label: 'Needs action', variant: 'warning', action: 'Re-upload' },
  not_uploaded: { label: 'Not uploaded', variant: 'outline', action: 'Upload' },
};

export function DocumentsPanel() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* Document list */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {INITIAL_DOCS.map((doc) => {
          const status = STATUS[doc.status];
          return (
            <Card key={doc.id} className="border-line/10 border bg-transparent">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
                <span
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                    DOC_ICON_COLOUR[doc.id] ?? 'bg-ink/5 text-content-muted',
                  )}
                >
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-content text-sm font-medium">{doc.title}</p>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <p className="text-content-muted mt-1 text-xs">{doc.description}</p>
                  {doc.uploadedAt && (
                    <p className="text-content-muted mt-2 font-mono text-[11px] tracking-wide">
                      UPLOADED {doc.uploadedAt.toUpperCase()}
                    </p>
                  )}
                  {doc.actionMessage && (
                    <p
                      className={cn(
                        'mt-2 text-xs',
                        doc.status === 'needs_action' ? 'text-coral' : 'text-content-muted',
                      )}
                    >
                      {doc.actionMessage}
                    </p>
                  )}
                </div>

                <Button
                  variant={doc.status === 'needs_action' ? 'primary' : 'outline'}
                  size="sm"
                  className="shrink-0 self-start"
                >
                  <Upload className="h-4 w-4" />
                  {status.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Verification timeline */}
      <aside className="w-full shrink-0 lg:w-80">
        <h3 className="text-content-muted mb-3 font-mono text-sm tracking-wide">
          VERIFICATION TIMELINE
        </h3>
        <Card className="border-line/10 border bg-transparent">
          <CardContent className="flex flex-col gap-0 p-5">
            {INITIAL_TIMELINE.map((event, i) => {
              const Icon = event.done ? CheckCircle2 : event.active ? Clock : Circle;
              const last = i === INITIAL_TIMELINE.length - 1;
              return (
                <div key={event.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0',
                        event.done
                          ? 'text-lime-deep'
                          : event.active
                            ? 'text-coral'
                            : 'text-content-muted',
                      )}
                      aria-hidden="true"
                    />
                    {!last && <span className="bg-line/10 my-1 w-px flex-1" />}
                  </div>
                  <div className={cn('min-w-0', last ? 'pb-0' : 'pb-5')}>
                    <p
                      className={cn(
                        'text-sm',
                        event.done || event.active
                          ? 'text-content font-medium'
                          : 'text-content-muted',
                      )}
                    >
                      {event.label}
                    </p>
                    {event.date && (
                      <p className="text-content-muted mt-0.5 font-mono text-[11px] tracking-wide">
                        {event.date.toUpperCase()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
