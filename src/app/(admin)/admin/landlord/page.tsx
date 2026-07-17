import type { Metadata } from "next";
import { AdminLandlordsPage } from "./landlords-components/AdminLandlordsPage";

export const metadata: Metadata = {
  title: "Landlords",
};

export default function LandlordsPage() {
  return <AdminLandlordsPage />;
}