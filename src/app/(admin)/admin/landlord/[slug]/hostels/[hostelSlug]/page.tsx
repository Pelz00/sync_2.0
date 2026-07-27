import type { Metadata } from "next";
import { HostelVerificationPage } from "./hostel-verification-components/HostelVerificationPage";
import { LANDLORDS, getLandlordBySlug } from "../../../landlords-components/landlord.constants";

export const metadata: Metadata = { title: "Hostel Verification" };

export default async function HostelSlugPage({
  params,
}: {
  params: Promise<{ slug: string; hostelSlug: string }>;
}) {
  const { slug, hostelSlug } = await params;
  const landlord = getLandlordBySlug(LANDLORDS, slug);

  return (
    <HostelVerificationPage
      landlordSlug={slug}
      hostelSlug={hostelSlug}
      landlordIsVerified={landlord?.isVerified ?? false}
      landlordStatus={landlord?.status}
    />
  );
}
