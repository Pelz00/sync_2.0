import type { Metadata } from "next";
import { AdminVendorsPage } from "./vendors-components";

export const metadata: Metadata = {
  title: "Vendors",
};

export default function VendorsPage() {
  return <AdminVendorsPage />;
}
