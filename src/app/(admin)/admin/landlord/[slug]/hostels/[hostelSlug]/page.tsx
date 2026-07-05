import type { Metadata } from "next";
import { HostelVerificationPage } from "./hostel-verification-components/HostelVerificationPage";

export const metadata: Metadata = { title: "Hostel Verification" };

export default async function HostelSlugPage({
  params,
}: {
  params: Promise<{ slug: string; hostelSlug: string }>;
}) {
  const { slug, hostelSlug } = await params;
  return <HostelVerificationPage landlordSlug={slug} hostelSlug={hostelSlug} />;
}