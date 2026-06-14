import type { Metadata } from "next";
import { AdminDisputesPage } from './disputes-components';

export const metadata: Metadata = {
  title: "Vendors",
};

export default function Page() {
  return <AdminDisputesPage />;
}
