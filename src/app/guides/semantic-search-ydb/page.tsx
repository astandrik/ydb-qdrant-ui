import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "Semantic Search on YDB with YDB-Qdrant",
  description:
    "Integration guide for adding embeddings, vector collections, semantic search, RAG, and IDE-agent memory to YDB-backed applications with YDB-Qdrant.",
  alternates: {
    canonical: "/guides/semantic-search-ydb/",
  },
};

export default function SemanticSearchYdbGuidePage() {
  return (
    <AgentResourcePage
      eyebrow="Guide"
      title="Semantic search on YDB with YDB-Qdrant"
      lead={
        <p>
          Use YDB-Qdrant when an application already stores operational data in
          YDB and needs embeddings-based retrieval through a Qdrant-compatible
          API.
        </p>
      }
      actions={[
        {
          href: "/docs/api/",
          label: "REST API docs",
          view: "action",
        },
        {
          href: "/openapi.json",
          label: "OpenAPI",
        },
      ]}
      sections={[
        {
          title: "Integration flow",
          items: [
            "Choose an embedding model and record its vector dimension.",
            "Create a collection with matching vectors.size and distance.",
            "Upsert document chunks or domain records as points with vector and payload.",
            "Run search/query with a query embedding and a top or limit value.",
            "Use api-key and optional X-Tenant-Id to isolate environments, tenants, workspaces, or agents.",
          ],
        },
        {
          title: "Create and search",
          body: (
            <pre>{`curl -X PUT http://localhost:8080/collections/documents \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vectors":{"size":1536,"distance":"Cosine","data_type":"float"}}'

curl -X POST http://localhost:8080/collections/documents/points/upsert \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"points":[{"id":"doc-1","vector":[0.1,0.2,0.3],"payload":{"title":"Doc 1"}}]}'

curl -X POST http://localhost:8080/collections/documents/points/search \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vector":[0.1,0.2,0.3],"top":10,"with_payload":true}'`}</pre>
          ),
        },
        {
          title: "RAG and IDE-agent notes",
          items: [
            "Store source ids, titles, paths, or chunk metadata in payloads so search results can be grounded back to source documents.",
            "Use pathSegments payload filters when the workload needs file-path-oriented search or deletion.",
            "Use Code Indexer hosted MCP when the target use case is repository memory for coding agents.",
          ],
        },
        {
          title: "When to move beyond this setup",
          items: [
            "Move to standalone Qdrant or a managed vector/search platform when full Qdrant parity, ANN indexing, mature hybrid search, or strict low-latency vector SLOs become primary requirements.",
            "Keep YDB-Qdrant when operational simplicity and YDB co-location matter more than specialized vector database features.",
          ],
        },
      ]}
    />
  );
}
