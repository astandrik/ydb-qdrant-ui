import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant vs Azure AI Search",
  description:
    "Compare YDB-Qdrant with Azure AI Search for YDB-backed semantic search, RAG prototypes, and managed search applications.",
  alternates: {
    canonical: "/compare/azure-ai-search/",
  },
};

export default function CompareAzureAiSearchPage() {
  return (
    <AgentResourcePage
      eyebrow="Comparison"
      title="YDB-Qdrant vs Azure AI Search"
      lead={
        <p>
          YDB-Qdrant keeps vector storage close to YDB and exposes a focused
          Qdrant-compatible API. Azure AI Search is a managed search platform
          for applications that need Azure-native indexing, ranking, and search
          operations.
        </p>
      }
      actions={[
        {
          href: "/docs/api/",
          label: "YDB-Qdrant API",
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
            "The application already depends on YDB and should avoid another database cluster.",
            "You need Qdrant-compatible vector collection and point operations.",
            "You prefer an open-source package and self-hosted deployment path.",
            "The workload is an internal RAG service, IDE-agent memory, prototype, or small-to-medium collection.",
          ],
        },
        {
          title: "Choose Azure AI Search when",
          items: [
            "You need a fully managed Azure search service.",
            "Lexical search, vector search, hybrid ranking, indexers, and relevance tooling are central requirements.",
            "Your data sources, identity, networking, and operations are already Azure-centered.",
          ],
        },
        {
          title: "Agent-readiness resources",
          items: [
            <a href="/developers/" key="developers">
              YDB-Qdrant developer hub
            </a>,
            <a href="/docs/openapi/" key="openapi">
              YDB-Qdrant OpenAPI page
            </a>,
            <a href="/llms-full.txt" key="llms-full">
              Full AI-readable index
            </a>,
          ],
        },
      ]}
    />
  );
}
