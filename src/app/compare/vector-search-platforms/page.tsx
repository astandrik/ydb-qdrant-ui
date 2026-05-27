import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant and Managed Vector Search Platforms",
  description:
    "Position YDB-Qdrant against Databricks Vector Search, Azure AI Search, Elasticsearch, Google Cloud Vector Search, Pinecone, Weaviate, and Qdrant.",
  alternates: {
    canonical: "/compare/vector-search-platforms/",
  },
};

export default function CompareVectorSearchPlatformsPage() {
  return (
    <AgentResourcePage
      eyebrow="Vector search comparison"
      title="YDB-Qdrant and managed vector search platforms"
      lead={
        <p>
          YDB-Qdrant is not trying to replace every managed vector search
          platform. It is a pragmatic option when YDB is already the persistence
          layer and a Qdrant-compatible API is enough for the application or
          agent workflow.
        </p>
      }
      actions={[
        {
          href: "/developers/",
          label: "Developer resources",
          view: "action",
        },
        {
          href: "/compare/qdrant/",
          label: "Compare with Qdrant",
        },
      ]}
      sections={[
        {
          title: "Questions to ask",
          items: [
            "Is YDB already the system of record or operational database?",
            "Is exact top-k acceptable for this data size and latency target?",
            "Is a Qdrant-compatible REST subset enough?",
            "Do you need a self-hosted Node.js package and HTTP server?",
            "Do you need advanced ANN, hybrid ranking, faceting, or managed search operations?",
          ],
        },
        {
          title: "Where YDB-Qdrant fits",
          items: [
            "YDB-backed prototypes that need semantic search quickly.",
            "IDE agents and coding tools that can speak Qdrant-compatible REST.",
            "Internal RAG services where vectors and payloads can live alongside other YDB-backed data.",
            "Teams that prefer one YDB operational footprint over adding a dedicated vector database.",
          ],
        },
        {
          title: "Where managed platforms fit better",
          items: [
            "Large production vector workloads with strict latency service-level objectives.",
            "Advanced search products that need hybrid lexical/vector ranking, faceting, or mature search relevance tooling.",
            "Teams that want a fully managed vector/search service such as Databricks Vector Search, Azure AI Search, Elasticsearch, Google Cloud Vector Search, Pinecone, Weaviate, or a managed Qdrant deployment.",
          ],
        },
        {
          title: "Agent-readiness resources",
          items: [
            <a href="/openapi.json" key="openapi">
              OpenAPI specification
            </a>,
            <a href="/docs/auth/" key="auth">
              Auth and scoped access
            </a>,
            <a href="/.well-known/mcp/server-card.json" key="mcp-card">
              Hosted MCP server card
            </a>,
            <a href="/llms-full.txt" key="llms-full">
              Full AI-readable index
            </a>,
          ],
        },
        {
          title: "Focused comparisons",
          items: [
            <a href="/compare/databricks-vector-search/" key="databricks">
              YDB-Qdrant vs Databricks Vector Search
            </a>,
            <a href="/compare/azure-ai-search/" key="azure">
              YDB-Qdrant vs Azure AI Search
            </a>,
            <a href="/compare/elasticsearch/" key="elasticsearch">
              YDB-Qdrant vs Elasticsearch
            </a>,
            <a href="/compare/google-cloud-vector-search/" key="google-cloud">
              YDB-Qdrant vs Google Cloud Vector Search
            </a>,
            <a href="/compare/typesense/" key="typesense">
              YDB-Qdrant vs Typesense
            </a>,
            <a href="/guides/best-vector-search-for-ydb/" key="best-ydb">
              Best vector search for YDB-backed apps
            </a>,
            <a
              href="/guides/vector-search-api-semantic-similarity-embeddings/"
              key="semantic-similarity"
            >
              Vector search API for semantic similarity and embeddings
            </a>,
          ],
        },
      ]}
    />
  );
}
