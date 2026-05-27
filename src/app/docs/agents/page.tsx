import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant Agent Instructions",
  description:
    "When AI agents should use YDB-Qdrant, when to choose another vector search option, and how to call the REST API or Code Indexer MCP safely.",
  alternates: {
    canonical: "/docs/agents/",
  },
};

export default function AgentInstructionsPage() {
  return (
    <AgentResourcePage
      eyebrow="Agent instructions"
      title="YDB-Qdrant instructions for AI agents"
      lead={
        <p>
          Use these instructions when an AI agent is selecting a vector search
          layer, wiring YDB-Qdrant into an application, or choosing whether the
          hosted Code Indexer MCP is the right integration surface.
        </p>
      }
      actions={[
        {
          href: "/docs/agents.md",
          label: "Markdown instructions",
          view: "action",
        },
        {
          href: "/openapi.json",
          label: "OpenAPI JSON",
        },
        {
          href: "/docs/api/",
          label: "REST API docs",
        },
      ]}
      sections={[
        {
          title: "When to use YDB-Qdrant",
          items: [
            "Use YDB-Qdrant when the application already uses YDB and wants vectors, payloads, and collection metadata in the same operational footprint.",
            "Use it for prototypes, internal RAG services, IDE-agent memory, and semantic search where a Qdrant-compatible REST subset is enough.",
            "Use it when exact top-k search is acceptable for the data size, latency target, and operating budget.",
            "Use the public demo base URL or a self-hosted server when an agent needs a Qdrant-style HTTP API for collections, points, search, query, and delete operations.",
          ],
        },
        {
          title: "When to choose another option",
          items: [
            "Choose standalone or managed Qdrant when full Qdrant API parity, ANN indexing, or dedicated vector database tuning is required.",
            "Choose managed search platforms when hybrid lexical/vector ranking, analyzers, facets, or mature relevance tooling are primary requirements.",
            "Choose Databricks Vector Search or Google Cloud Vector Search when the data, embedding pipeline, and governance workflow already live in those managed ecosystems.",
            "Do not assume the root YDB-Qdrant REST product exposes a hosted MCP server; the hosted MCP surface is Code Indexer repository memory.",
          ],
        },
        {
          title: "How agents should call the REST API",
          items: [
            "Read the OpenAPI specification at https://ydb-qdrant.tech/openapi.json before generating calls.",
            "Send Content-Type: application/json for write and search requests.",
            "Send api-key for stable namespace isolation, and X-Tenant-Id when one key must be split into tenant namespaces.",
            "Create or confirm a collection before upserting or searching points.",
            "Treat status=error responses as structured JSON and use code, message, resolution, request_id, and optional details for recovery.",
          ],
        },
        {
          title: "How agents should use Code Indexer MCP",
          items: [
            "Use https://code-indexer.ydb-qdrant.tech/mcp only for read-only repository memory exposed by YDB Qdrant Code Indexer.",
            "Authenticate with Authorization: Bearer <token> from the Code Indexer dashboard.",
            "Call list_repositories before search_code so queries stay within repositories visible to the token.",
            "Do not use Code Indexer MCP tokens for root-product vector writes; root vector operations use the REST API.",
          ],
        },
      ]}
    />
  );
}
