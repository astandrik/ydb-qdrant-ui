import type { Metadata } from "next";
import { CodeIndexerLanding } from "@/components/CodeIndexer/CodeIndexerLanding";

export const metadata: Metadata = {
  title: "YDB Qdrant Code Indexer",
  description:
    "Install a GitHub App, index repositories into YDB-backed Qdrant-compatible storage, and connect coding agents through hosted MCP.",
};

export default function CodeIndexerPage() {
  return <CodeIndexerLanding />;
}
