import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "Vector Search API for Semantic Similarity and Embeddings",
  description:
    "How to use YDB-Qdrant as a Qdrant-compatible vector search API for embeddings, semantic similarity, RAG prototypes, and YDB-backed agent memory.",
  alternates: {
    canonical: "/guides/vector-search-api-semantic-similarity-embeddings/",
  },
};

export default function VectorSearchApiSemanticSimilarityGuidePage() {
  return (
    <AgentResourcePage
      eyebrow="Guide"
      title="Vector search API for semantic similarity and embeddings"
      lead={
        <p>
          YDB-Qdrant gives YDB-backed applications a Qdrant-compatible REST API
          for storing embedding vectors, retrieving points, and running exact
          top-k semantic similarity search.
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
          href: "/docs/agents/",
          label: "Agent instructions",
        },
      ]}
      sections={[
        {
          title: "Use cases",
          items: [
            "Store embeddings for documents, code chunks, support articles, or application records that already belong near YDB-backed data.",
            "Run semantic similarity search for RAG retrieval, internal knowledge search, and IDE-agent memory.",
            "Use Qdrant-compatible collection and point routes when an existing client expects Qdrant-style REST calls.",
          ],
        },
        {
          title: "Basic flow",
          items: [
            "Create a collection with the embedding vector size and distance metric.",
            "Upsert points with id, vector, and payload fields.",
            "Search with a query vector and limit or top value.",
            "Inspect structured JSON errors and use resolution hints when a collection, vector shape, or request body is invalid.",
          ],
        },
        {
          title: "Example API sequence",
          body: (
            <pre>{`curl -X PUT https://ydb-qdrant.tech/collections/docs \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vectors":{"size":3,"distance":"Cosine","data_type":"float"}}'

curl -X POST https://ydb-qdrant.tech/collections/docs/points/upsert \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"points":[{"id":"doc-1","vector":[0.1,0.2,0.3],"payload":{"title":"Intro"}}]}'

curl -X POST https://ydb-qdrant.tech/collections/docs/points/search \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vector":[0.1,0.2,0.3],"limit":5,"with_payload":true}'`}</pre>
          ),
        },
        {
          title: "When another platform is better",
          items: [
            "Use a dedicated vector database when ANN indexing and tuned vector latency are the primary requirements.",
            "Use a managed search platform when hybrid lexical/vector search, faceting, analyzers, or search relevance tooling are core product features.",
            "Use a cloud-native vector search service when embedding pipelines, model serving, and governance already live in that cloud ecosystem.",
          ],
        },
      ]}
    />
  );
}
