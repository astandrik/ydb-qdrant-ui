import type { Metadata } from "next";
import { CodeIndexerInfoPage } from "@/components/CodeIndexer/CodeIndexerInfoPage";

export const metadata: Metadata = {
  title: "Code Indexer Status",
  description:
    "Public endpoint status links for YDB Qdrant Code Indexer.",
};

export default function CodeIndexerStatusPage() {
  return (
    <CodeIndexerInfoPage
      eyebrow="Status"
      title="Code Indexer status"
      lead="Public beta traffic uses the hosted backend at code-indexer.ydb-qdrant.tech."
      actions={[
        {
          href: "https://code-indexer.ydb-qdrant.tech/health",
          label: "Open health endpoint",
        },
      ]}
      sections={[
        {
          items: [
            "GET https://code-indexer.ydb-qdrant.tech/health",
            "POST https://code-indexer.ydb-qdrant.tech/github/webhook",
            "GET https://code-indexer.ydb-qdrant.tech/github/oauth/start",
            "GET https://code-indexer.ydb-qdrant.tech/github/oauth/callback",
            "GET/POST https://code-indexer.ydb-qdrant.tech/mcp",
            "GET/POST/DELETE https://code-indexer.ydb-qdrant.tech/api/*",
          ],
          title: "Public endpoints",
        },
        {
          items: [
            "The health endpoint is the current public readiness signal.",
            "Dashboard pages are statically hosted on ydb-qdrant.tech and call the backend over HTTPS.",
          ],
          title: "Operational notes",
        },
      ]}
    />
  );
}
