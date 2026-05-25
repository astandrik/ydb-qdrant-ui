import type { Metadata } from "next";
import { CodeIndexerDashboard } from "@/components/CodeIndexer/CodeIndexerDashboard";

export const metadata: Metadata = {
  title: "Code Indexer Dashboard",
  description:
    "Manage indexed repositories and hosted MCP tokens for YDB Qdrant Code Indexer.",
};

export default function CodeIndexerDashboardPage() {
  return <CodeIndexerDashboard />;
}
