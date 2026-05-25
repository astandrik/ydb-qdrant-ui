import type { Metadata } from "next";
import { CodeIndexerAdminDashboard } from "@/components/CodeIndexer/CodeIndexerAdminDashboard";

export const metadata: Metadata = {
  title: "Code Indexer Admin",
  description:
    "Read-only operational dashboard for hosted YDB Qdrant Code Indexer repositories and jobs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CodeIndexerAdminPage() {
  return <CodeIndexerAdminDashboard />;
}
