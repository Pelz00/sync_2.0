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
      <h1 className="font-display text-section text-content">Documents</h1>
      <p className="text-content-muted max-w-md text-sm">
        Your uploaded business documents (CAC, ID, proof of address) and their verification status
        will appear here.
      </p>
    </section>
  );
}
