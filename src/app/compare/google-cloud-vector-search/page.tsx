import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant vs Google Cloud Vector Search",
  description:
    "Compare YDB-Qdrant with Google Cloud Vector Search for YDB-backed vector search, semantic similarity, RAG prototypes, and managed Google Cloud AI workflows.",
  alternates: {
    canonical: "/compare/google-cloud-vector-search/",
  },
};

export default function CompareGoogleCloudVectorSearchPage() {
  return (
    <AgentResourcePage
      eyebrow="Comparison"
      title="YDB-Qdrant vs Google Cloud Vector Search"
      lead={
        <p>
          YDB-Qdrant is a self-hostable Qdrant-compatible layer for teams that
          already store application data in YDB. Google Cloud Vector Search is a
          managed Google Cloud option for teams whose embeddings, serving, and
          AI operations already live in the Google Cloud ecosystem.
        </p>
      }
      actions={[
        {
          href: "/guides/vector-search-api-semantic-similarity-embeddings/",
          label: "Semantic similarity guide",
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
            "YDB is already the persistence layer for the application.",
            "A focused Qdrant-compatible REST subset covers collection, point, search, query, and delete needs.",
            "The workload is a prototype, internal RAG service, IDE-agent memory store, or YDB-backed semantic search feature.",
            "Exact top-k search is acceptable for the current data size and latency target.",
          ],
        },
        {
          title: "Choose Google Cloud Vector Search when",
          items: [
            "The data platform, embedding pipeline, and serving workflow already run on Google Cloud.",
            "A managed vector search service is preferred over operating a self-hosted Node.js service.",
            "The team needs Google Cloud-native operational, IAM, monitoring, and deployment controls.",
          ],
        },
        {
          title: "Developer resources",
          items: [
            <a href="/openapi.json" key="openapi">
              YDB-Qdrant OpenAPI specification
            </a>,
            <a href="/docs/agents/" key="agents">
              YDB-Qdrant agent instructions
            </a>,
            <a href="/pricing/" key="pricing">
              YDB-Qdrant pricing
            </a>,
          ],
        },
      ]}
    />
  );
}
