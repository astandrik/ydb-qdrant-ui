import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant vs Databricks Vector Search",
  description:
    "Compare YDB-Qdrant with Databricks Vector Search for YDB-backed applications, RAG prototypes, and managed Lakehouse AI search workflows.",
  alternates: {
    canonical: "/compare/databricks-vector-search/",
  },
};

export default function CompareDatabricksVectorSearchPage() {
  return (
    <AgentResourcePage
      eyebrow="Comparison"
      title="YDB-Qdrant vs Databricks Vector Search"
      lead={
        <p>
          YDB-Qdrant is a self-hostable Qdrant-compatible layer for teams that
          already use YDB. Databricks Vector Search is a managed Databricks
          capability for teams building inside the Lakehouse and Mosaic AI
          ecosystem.
        </p>
      }
      actions={[
        {
          href: "/guides/best-vector-search-for-ydb/",
          label: "YDB vector search guide",
          view: "action",
        },
        {
          href: "/compare/vector-search-platforms/",
          label: "All platforms",
        },
      ]}
      sections={[
        {
          title: "Choose YDB-Qdrant when",
          items: [
            "YDB is already the operational database or persistence layer.",
            "A Qdrant-compatible REST subset is enough for collections, points, search, query, and delete.",
            "You want an Apache-2.0 Node.js package or self-hosted HTTP server.",
            "Exact top-k search is acceptable for the current data size and latency target.",
          ],
        },
        {
          title: "Choose Databricks Vector Search when",
          items: [
            "Your data, embeddings, governance, and pipelines already live in Databricks.",
            "You want a managed vector search service integrated with Lakehouse workflows.",
            "You need Databricks-native operational, governance, and deployment controls.",
          ],
        },
        {
          title: "Developer resources",
          items: [
            <a href="/openapi.json" key="openapi">
              YDB-Qdrant OpenAPI specification
            </a>,
            <a href="/pricing/" key="pricing">
              YDB-Qdrant pricing
            </a>,
            <a href="/docs/mcp/" key="mcp">
              YDB-Qdrant MCP discovery
            </a>,
          ],
        },
      ]}
    />
  );
}
