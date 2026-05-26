/**
 * ROUTE: /vendor/documents
 * ACCESS: authenticated vendor
 * PURPOSE: Uploaded business documents (CAC, ID, proof of address). Re-uploads + admin status badges.
 * BUILT HERE: Document list, status badges, secure preview via signed URL, re-upload.
 * TODO: implement the full screen once dependent modules + data are wired.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Documents' };

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <p className="eyebrow text-lime-deep">/vendor/documents</p>
      <h1 className="font-display text-section text-ink">Documents</h1>
      <p className="text-muted max-w-xl text-sm">
        Placeholder — see the route header above for what gets built here.
      </p>
    </section>
  );
}
