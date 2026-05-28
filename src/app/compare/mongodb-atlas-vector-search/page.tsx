import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant vs MongoDB Atlas Vector Search",
  description:
    "Compare YDB-Qdrant with MongoDB Atlas Vector Search for semantic search, RAG, vector database APIs, and YDB-backed applications.",
  alternates: {
    canonical: "/compare/mongodb-atlas-vector-search/",
  },
};

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "YDB-Qdrant vs MongoDB Atlas Vector Search",
  url: "https://ydb-qdrant.tech/compare/mongodb-atlas-vector-search/",
  description:
    "A practical comparison for teams choosing between a YDB-backed Qdrant-compatible REST API and MongoDB Atlas Vector Search.",
  about: ["vector search", "semantic search", "RAG", "YDB", "MongoDB Atlas"],
};

export default function CompareMongoDbAtlasVectorSearchPage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(ARTICLE_JSON_LD)}
      </script>
      <AgentResourcePage
        eyebrow="Comparison"
        title="YDB-Qdrant vs MongoDB Atlas Vector Search"
        lead={
          <p>
            YDB-Qdrant is a compact Qdrant-compatible vector layer over YDB.
            MongoDB Atlas Vector Search is a managed vector search capability
            inside MongoDB Atlas for applications that already store documents
            in MongoDB and want integrated semantic retrieval.
          </p>
        }
        actions={[
          {
            href: "/compare/vector-search-platforms/",
            label: "All platform comparisons",
            view: "action",
          },
          {
            href: "/guides/vector-database-api-semantic-search/",
            label: "Vector API guide",
          },
          {
            href: "/openapi.json",
            label: "OpenAPI",
          },
        ]}
        sections={[
          {
            title: "Choose YDB-Qdrant when",
            items: [
              "YDB is already the operational database and you want vectors stored beside YDB-backed application data.",
              "A Qdrant-compatible REST subset is enough for collection lifecycle, point upsert, exact top-k search, query compatibility, and point deletion.",
              "You want a self-hosted Node.js package or HTTP server with OpenAPI, llms.txt, agent cards, and skill files published for AI-agent integrations.",
              "You prefer explicit trade-offs over a broad managed database platform: exact search, focused API coverage, and no separate vector database cluster.",
            ],
          },
          {
            title: "Choose MongoDB Atlas Vector Search when",
            items: [
              "MongoDB Atlas already stores the application documents and the team wants vector search inside the same managed MongoDB platform.",
              "The workload benefits from MongoDB document modeling, Atlas operations, and integration with MongoDB query patterns.",
              "A managed service with Atlas-native indexing, scaling, monitoring, and platform controls is more important than Qdrant-compatible REST semantics.",
            ],
          },
          {
            title: "Agent integration differences",
            items: [
              "YDB-Qdrant publishes a public OpenAPI 3.1 document, agent-mode page, agent discovery JSON, A2A card, llms.txt files, and SKILL.md resources.",
              "YDB-Qdrant REST auth uses api-key namespaces with optional X-Tenant-Id and Idempotency-Key for retried mutations.",
              "YDB Qdrant Code Indexer exposes hosted read-only repository memory through Streamable HTTP MCP; root vector operations remain REST-only.",
            ],
          },
          {
            title: "Resources for evaluation",
            items: [
              <a href="/docs/api/" key="api">
                YDB-Qdrant REST API reference
              </a>,
              <a href="/docs/auth/" key="auth">
                Auth and scoped access
              </a>,
              <a href="/agent/" key="agent">
                Agent mode
              </a>,
              <a href="/guides/best-vector-search-for-ydb/" key="guide">
                Best vector search for YDB-backed apps
              </a>,
            ],
          },
        ]}
      />
    </>
  );
}
