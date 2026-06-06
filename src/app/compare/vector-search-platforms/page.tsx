import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";
import { TrackedResourceLink } from "@/components/TrackedResourceLink";

export const metadata: Metadata = {
  title: "YDB-Qdrant and Managed Vector Search Platforms",
  description:
    "Position YDB-Qdrant against Databricks Vector Search, Azure AI Search, Elasticsearch, Google Cloud Vector Search, Pinecone, Weaviate, and Qdrant.",
  alternates: {
    canonical: "/compare/vector-search-platforms/",
  },
};

const UPDATED_AT = "June 6, 2026";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "YDB-Qdrant and managed vector search platforms",
  url: "https://ydb-qdrant.tech/compare/vector-search-platforms/",
  mainEntityOfPage: "https://ydb-qdrant.tech/compare/vector-search-platforms/",
  dateModified: "2026-06-06",
  author: {
    "@type": "Person",
    name: "Alexander Standrik",
  },
  description:
    "A comparison matrix for YDB-Qdrant, Qdrant, Azure AI Search, Elasticsearch, Databricks Vector Search, Google Cloud Vertex AI Vector Search, MongoDB Atlas Vector Search, and Typesense.",
  about: [
    "vector search",
    "semantic search",
    "managed search",
    "YDB",
    "Qdrant",
  ],
};

export default function CompareVectorSearchPlatformsPage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(ARTICLE_JSON_LD)}
      </script>
      <AgentResourcePage
        eyebrow="Vector search comparison"
        title="YDB-Qdrant and managed vector search platforms"
        updatedAt={UPDATED_AT}
        lead={
          <p>
            YDB-Qdrant is not trying to replace every managed vector search
            platform. It is a pragmatic option when YDB is already the
            persistence layer and a Qdrant-compatible REST subset is enough.
            Dedicated vector and search platforms are stronger choices when
            managed operations, ANN indexing, hybrid relevance, faceting, or
            cloud-native AI pipelines are the deciding factors.
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
          {
            href: "/guides/best-vector-search-for-ydb/",
            label: "Best options guide",
          },
        ]}
        sections={[
          {
            title: "Comparison matrix",
            body: (
              <div className="agent-resource__table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Platform</th>
                      <th>Best fit</th>
                      <th>Main trade-off</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>YDB-Qdrant</td>
                      <td>
                        YDB-backed apps that need Qdrant-compatible REST,
                        exact top-k, OpenAPI, and agent-readable resources.
                      </td>
                      <td>
                        Focused API subset; not full Qdrant parity or
                        specialized ANN search.
                      </td>
                    </tr>
                    <tr>
                      <td>Standalone or managed Qdrant</td>
                      <td>
                        Dedicated vector database deployments that need broad
                        Qdrant behavior and vector database tuning.
                      </td>
                      <td>Separate vector database footprint from YDB.</td>
                    </tr>
                    <tr>
                      <td>Azure AI Search</td>
                      <td>
                        Azure-centered search products with vector, keyword,
                        hybrid, semantic ranking, and indexing requirements.
                      </td>
                      <td>Managed Azure search platform, not Qdrant API.</td>
                    </tr>
                    <tr>
                      <td>Elasticsearch</td>
                      <td>
                        Search-heavy applications needing vector search beside
                        mature text search, filters, and aggregations.
                      </td>
                      <td>Search platform operations and index design overhead.</td>
                    </tr>
                    <tr>
                      <td>Databricks Vector Search</td>
                      <td>
                        Delta-table and Databricks-native ML/RAG workflows.
                      </td>
                      <td>Best when the data platform is already Databricks.</td>
                    </tr>
                    <tr>
                      <td>Google Cloud Vertex AI Vector Search</td>
                      <td>
                        Google Cloud workloads that need managed ScaNN-based
                        vector search at recommendation or RAG scale.
                      </td>
                      <td>Google Cloud-specific operational model.</td>
                    </tr>
                    <tr>
                      <td>MongoDB Atlas Vector Search</td>
                      <td>
                        Apps that already use MongoDB Atlas as the document
                        store and want vector retrieval in that platform.
                      </td>
                      <td>MongoDB Atlas-oriented model, not Qdrant API.</td>
                    </tr>
                    <tr>
                      <td>Typesense</td>
                      <td>
                        Product/search UX that combines lexical search and
                        vector search in a lightweight search engine.
                      </td>
                      <td>Search-engine semantics instead of YDB co-location.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ),
          },
          {
            title: "Questions to ask",
            items: [
              "Is YDB already the system of record or operational database?",
              "Is exact top-k acceptable for this data size and latency target?",
              "Is a Qdrant-compatible REST subset enough for the app or agent?",
              "Does the product need lexical search, faceting, analyzers, or hybrid relevance controls?",
              "Should the team operate one YDB footprint, a dedicated vector database, or a cloud-managed search service?",
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
              "Advanced search products that need hybrid lexical/vector ranking, faceting, analyzers, or mature search relevance tooling.",
              "Cloud-native AI pipelines where embeddings, model serving, governance, indexing, and search should live inside one managed vendor platform.",
            ],
          },
          {
            title: "Official product sources",
            items: [
              <TrackedResourceLink
                href="https://qdrant.tech/documentation/"
                label="Qdrant documentation"
                page="/compare/vector-search-platforms/"
                source="vendor_docs"
                key="qdrant-docs"
              >
                Qdrant documentation
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://learn.microsoft.com/en-us/azure/search/vector-search-overview"
                label="Azure AI Search vector search overview"
                page="/compare/vector-search-platforms/"
                source="vendor_docs"
                key="azure-docs"
              >
                Azure AI Search vector search overview
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://www.elastic.co/docs/solutions/search/vector"
                label="Elasticsearch vector search documentation"
                page="/compare/vector-search-platforms/"
                source="vendor_docs"
                key="elastic-docs"
              >
                Elasticsearch vector search documentation
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://docs.databricks.com/gcp/en/vector-search/vector-search"
                label="Databricks Vector Search documentation"
                page="/compare/vector-search-platforms/"
                source="vendor_docs"
                key="databricks-docs"
              >
                Databricks Vector Search documentation
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://cloud.google.com/vertex-ai/docs/vector-search/overview"
                label="Google Cloud Vertex AI Vector Search overview"
                page="/compare/vector-search-platforms/"
                source="vendor_docs"
                key="google-docs"
              >
                Google Cloud Vertex AI Vector Search overview
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://www.mongodb.com/docs/vector-search/"
                label="MongoDB Vector Search documentation"
                page="/compare/vector-search-platforms/"
                source="vendor_docs"
                key="mongodb-docs"
              >
                MongoDB Vector Search documentation
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://typesense.org/docs/29.0/api/vector-search.html"
                label="Typesense vector search documentation"
                page="/compare/vector-search-platforms/"
                source="vendor_docs"
                key="typesense-docs"
              >
                Typesense vector search documentation
              </TrackedResourceLink>,
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
        ]}
      />
    </>
  );
}
