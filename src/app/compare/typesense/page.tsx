import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant vs Typesense",
  description:
    "Compare YDB-Qdrant with Typesense for YDB-backed vector search, semantic search prototypes, and search products that need lexical ranking or hosted search operations.",
  alternates: {
    canonical: "/compare/typesense/",
  },
};

export default function CompareTypesensePage() {
  return (
    <AgentResourcePage
      eyebrow="Comparison"
      title="YDB-Qdrant vs Typesense"
      lead={
        <p>
          YDB-Qdrant is a Qdrant-compatible vector API backed by YDB. Typesense
          is a search engine product that can be a better fit when lexical
          search experience, ranking controls, and hosted search operations are
          central to the application.
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
            "The application already uses YDB and should keep vector payloads beside YDB-backed data.",
            "A Qdrant-compatible REST subset is the integration target for existing clients or agents.",
            "The use case is RAG, semantic similarity, repository memory, or another vector-first workflow.",
            "Exact top-k search is acceptable for the current scale.",
          ],
        },
        {
          title: "Choose Typesense when",
          items: [
            "The primary need is a search product with lexical relevance, typo tolerance, faceting, filtering, and search UI workflows.",
            "The team wants a managed or dedicated search engine rather than a YDB-backed Qdrant-compatible layer.",
            "Hybrid product search or site search features matter more than keeping vectors in YDB.",
          ],
        },
        {
          title: "Developer resources",
          items: [
            <a href="/openapi.json" key="openapi">
              YDB-Qdrant OpenAPI specification
            </a>,
            <a href="/docs/api/" key="api">
              YDB-Qdrant REST API reference
            </a>,
            <a href="/docs/agents/" key="agents">
              YDB-Qdrant agent instructions
            </a>,
          ],
        },
      ]}
    />
  );
}
