import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant vs Elasticsearch",
  description:
    "Compare YDB-Qdrant with Elasticsearch for vector search, semantic retrieval, RAG, and YDB-backed applications.",
  alternates: {
    canonical: "/compare/elasticsearch/",
  },
};

export default function CompareElasticsearchPage() {
  return (
    <AgentResourcePage
      eyebrow="Comparison"
      title="YDB-Qdrant vs Elasticsearch"
      lead={
        <p>
          YDB-Qdrant is a compact Qdrant-compatible vector layer over YDB.
          Elasticsearch is a broad search and analytics engine with mature
          lexical, vector, hybrid, and operational search features.
        </p>
      }
      actions={[
        {
          href: "/compare/qdrant/",
          label: "Compare with Qdrant",
          view: "action",
        },
        {
          href: "/guides/semantic-search-ydb/",
          label: "Semantic search guide",
        },
      ]}
      sections={[
        {
          title: "Choose YDB-Qdrant when",
          items: [
            "YDB is already where application data lives.",
            "You want Qdrant-compatible vector operations without running a full search cluster.",
            "Exact top-k behavior and the documented REST subset match the workload.",
            "Operational simplicity matters more than advanced search features.",
          ],
        },
        {
          title: "Choose Elasticsearch when",
          items: [
            "Search is a primary application surface with lexical, vector, and hybrid relevance needs.",
            "You need mature faceting, aggregations, analyzers, index management, and search observability.",
            "You are operating a dedicated search cluster or managed Elastic deployment.",
          ],
        },
        {
          title: "Resources for agents",
          items: [
            <a href="/pricing/" key="pricing">
              YDB-Qdrant pricing
            </a>,
            <a href="/docs/api/" key="api">
              REST API reference
            </a>,
            <a href="/docs/auth/" key="auth">
              Auth and scoped access
            </a>,
          ],
        },
      ]}
    />
  );
}
