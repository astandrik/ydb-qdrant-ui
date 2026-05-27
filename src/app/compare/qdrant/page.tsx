import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant vs Standalone Qdrant",
  description:
    "Compare YDB-Qdrant with standalone Qdrant for YDB-backed semantic search, IDE agents, RAG prototypes, and dedicated vector database deployments.",
  alternates: {
    canonical: "/compare/qdrant/",
  },
};

export default function CompareQdrantPage() {
  return (
    <AgentResourcePage
      eyebrow="Comparison"
      title="YDB-Qdrant vs standalone Qdrant"
      lead={
        <p>
          YDB-Qdrant is a Qdrant-compatible layer for applications that already
          depend on YDB. Standalone Qdrant is a full dedicated vector database
          with broader API coverage and specialized vector indexing.
        </p>
      }
      actions={[
        {
          href: "/docs/api/",
          label: "API docs",
        },
        {
          href: "/guides/semantic-search-ydb/",
          label: "Semantic search guide",
          view: "action",
        },
      ]}
      sections={[
        {
          title: "Choose YDB-Qdrant when",
          items: [
            "Your application already uses YDB as a primary database or operational platform.",
            "You need a Qdrant-compatible REST subset for collections, points, search, query, and delete operations.",
            "Exact top-k search is acceptable for the current workload.",
            "You want a self-hostable Node.js package and HTTP server.",
            "You are building IDE-agent memory, RAG prototypes, internal semantic search, or small-to-medium vector collections.",
          ],
        },
        {
          title: "Choose standalone Qdrant when",
          items: [
            "You need full Qdrant API compatibility.",
            "You need specialized ANN indexing and vector-database performance tuning.",
            "You need advanced filters, facets, recommend/discover APIs, or batch search.",
            "Vector search is a primary production workload with strict latency targets.",
          ],
        },
        {
          title: "Architecture difference",
          body: (
            <p>
              YDB-Qdrant stores collection metadata in{" "}
              <code>qdr__collections</code>, points in{" "}
              <code>qdrant_all_points</code>, and path lookups in{" "}
              <code>qdrant_points_by_file</code>. It keeps the operational
              surface close to YDB. Standalone Qdrant operates as a dedicated
              vector database with its own storage, indexing, and cluster
              controls.
            </p>
          ),
        },
        {
          title: "Developer resources",
          items: [
            <a href="/openapi.json" key="openapi">
              YDB-Qdrant OpenAPI specification
            </a>,
            <a href="/docs/api/" key="api-docs">
              REST API reference
            </a>,
            <a
              href="https://github.com/astandrik/ydb-qdrant"
              key="github"
              rel="noopener noreferrer"
              target="_blank"
            >
              YDB-Qdrant GitHub repository
            </a>,
          ],
        },
      ]}
    />
  );
}
