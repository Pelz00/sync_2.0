import type { Metadata } from "next";
import { AdminEditorialPage } from "./editorial-components";

export const metadata: Metadata = {
  title: "Editorial",
};

export default function EditorialPage() {
  return (
    <div className="min-h-screen">
      <AdminEditorialPage />
    </div>
  ) 
}
