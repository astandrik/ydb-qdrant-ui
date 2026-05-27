import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "Best Vector Search for YDB-Backed Apps",
  description:
    "Guide to choosing vector search for YDB-backed apps, including YDB-Qdrant, standalone Qdrant, Elasticsearch, Azure AI Search, and Databricks Vector Search.",
  alternates: {
    canonical: "/guides/best-vector-search-for-ydb/",
  },
};

export default function BestVectorSearchForYdbPage() {
  return (
    <AgentResourcePage
      eyebrow="Guide"
      title="Best vector search for YDB-backed apps"
      lead={
        <p>
          The best vector search option depends on where your data already
          lives, whether a Qdrant-compatible API is enough, and how much managed
          search infrastructure you want to operate.
        </p>
      }
      actions={[
        {
          href: "/pricing/",
          label: "Pricing",
          view: "action",
        },
        {
          href: "/compare/vector-search-platforms/",
          label: "Platform comparison",
        },
      ]}
      sections={[
        {
          title: "Best fit for YDB-first prototypes",
          body: (
            <p>
              Use YDB-Qdrant when vectors and payloads can live beside
              YDB-backed application data and the current workload fits exact
              top-k search.
            </p>
          ),
          items: [
            "RAG prototypes and internal semantic search.",
            "IDE-agent memory and repository-aware tooling.",
            "Applications that already use YDB and want Qdrant-compatible REST calls.",
          ],
        },
        {
          title: "Best fit for dedicated vector databases",
          items: [
            "Use standalone or managed Qdrant when full Qdrant parity, ANN indexing, and vector database tuning are primary requirements.",
            "Use specialized vector databases when vector search is an independent production workload with strict latency goals.",
          ],
        },
        {
          title: "Best fit for managed search platforms",
          items: [
            "Use Azure AI Search or Elasticsearch when hybrid lexical/vector search, faceting, analyzers, or search relevance tooling are core requirements.",
            "Use Databricks Vector Search when the data and AI workflow already live in Databricks.",
          ],
        },
        {
          title: "YDB-Qdrant decision checklist",
          items: [
            "YDB is already in the architecture.",
            "The API surface needed is collection create/get/delete, point retrieve/upsert/search/query/delete, and index compatibility calls.",
            "Exact top-k search is acceptable for the data size and latency target.",
            "You prefer an Apache-2.0 package or self-hosted HTTP server over a separate managed vector service.",
          ],
        },
      ]}
    />
  );
}
