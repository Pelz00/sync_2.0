import type { Metadata } from "next";
import { LandlordProfilePage } from "./landlord-profile-components/LandlordProfilePage";

export const metadata: Metadata = { title: "Landlord Profile" };

export default async function LandlordSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LandlordProfilePage slug={slug} />;
}