import type { Metadata } from "next";
import { AdminEditorialPage } from "./editorial-components";

export const metadata: Metadata = {
  title: "Editorial",
};

/**
 * Server component shell — all interactivity is inside AdminEditorialPage (client).
 */
export default function EditorialPage() {
  return (
    <div className="min-h-screen">
      <AdminEditorialPage />
    </div>
  ) 
}
