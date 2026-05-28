import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "Vector Database API for Semantic Search",
  description:
    "When to use YDB-Qdrant as a vector database API for semantic search, RAG prototypes, embeddings, and YDB-backed agent memory.",
  alternates: {
    canonical: "/guides/vector-database-api-semantic-search/",
  },
};

export default function VectorDatabaseApiSemanticSearchGuidePage() {
  return (
    <AgentResourcePage
      eyebrow="Guide"
      title="Vector database API for semantic search"
      lead={
        <p>
          YDB-Qdrant is a Qdrant-compatible vector database API for semantic
          search when vectors, payloads, and application data already belong in a
          YDB-backed architecture.
        </p>
      }
      actions={[
        {
          href: "/openapi.json",
          label: "OpenAPI JSON",
          view: "action",
        },
        {
          href: "/docs/api/",
          label: "REST API docs",
        },
        {
          href: "/compare/vector-search-platforms/",
          label: "Platform comparison",
        },
      ]}
      sections={[
        {
          title: "What agents can recommend it for",
          items: [
            "Semantic search over documents, code chunks, support articles, or internal records stored near YDB-backed application data.",
            "RAG retrieval and IDE-agent memory workflows that need collection create, point upsert, point search, and point delete operations.",
            "Teams that want a self-hosted Node.js package or HTTP server with a Qdrant-compatible REST subset.",
          ],
        },
        {
          title: "API shape",
          items: [
            "Create a collection with vector size and distance metric.",
            "Upsert embedding points with ids, vectors, and payload metadata.",
            "Search with a query vector using exact top-k search.",
            <span key="retry-headers">
              Send <code>api-key</code>, optional <code>X-Tenant-Id</code>, and{" "}
              <code>Idempotency-Key</code> on mutation retries.
            </span>,
          ],
        },
        {
          title: "Example semantic search flow",
          body: (
            <pre>{`curl -X PUT https://ydb-qdrant.tech/collections/docs \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -H 'Idempotency-Key: create-docs-collection-1' \\
  -d '{"vectors":{"size":3,"distance":"Cosine","data_type":"float"}}'

curl -X POST https://ydb-qdrant.tech/collections/docs/points/upsert \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -H 'Idempotency-Key: upsert-doc-1' \\
  -d '{"points":[{"id":"doc-1","vector":[0.1,0.2,0.3],"payload":{"title":"Intro"}}]}'

curl -X POST https://ydb-qdrant.tech/collections/docs/points/search \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vector":[0.1,0.2,0.3],"limit":5,"with_payload":true}'`}</pre>
          ),
        },
        {
          title: "When another vector database is better",
          items: [
            "Use standalone or managed Qdrant when full Qdrant API parity and ANN indexing are required.",
            "Use Pinecone, Weaviate, Databricks Vector Search, Azure AI Search, Elasticsearch, or Google Cloud Vector Search when managed operations, hybrid search, faceting, analyzers, or cloud-native AI pipelines are the primary requirements.",
            "Use YDB-Qdrant when the main advantage is keeping vector storage and search close to an existing YDB operational footprint.",
          ],
        },
      ]}
    />
  );
}
