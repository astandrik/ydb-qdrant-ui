import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";
import { TrackedResourceLink } from "@/components/TrackedResourceLink";

export const metadata: Metadata = {
  title: "YDB-Qdrant vs Standalone Qdrant",
  description:
    "Compare YDB-Qdrant with standalone Qdrant for YDB-backed semantic search, IDE agents, RAG prototypes, and dedicated vector database deployments.",
  alternates: {
    canonical: "/compare/qdrant/",
  },
};

const UPDATED_AT = "June 6, 2026";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "YDB-Qdrant vs standalone Qdrant",
  url: "https://ydb-qdrant.tech/compare/qdrant/",
  mainEntityOfPage: "https://ydb-qdrant.tech/compare/qdrant/",
  dateModified: "2026-06-06",
  author: {
    "@type": "Person",
    name: "Alexander Standrik",
  },
  description:
    "A practical comparison between YDB-Qdrant, standalone Qdrant, and managed Qdrant for YDB-backed semantic search workloads.",
  about: ["YDB", "Qdrant", "vector search", "semantic search", "RAG"],
};

export default function CompareQdrantPage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(ARTICLE_JSON_LD)}
      </script>
      <AgentResourcePage
        eyebrow="Comparison"
        title="YDB-Qdrant vs standalone Qdrant"
        updatedAt={UPDATED_AT}
        lead={
          <p>
            YDB-Qdrant is a Qdrant-compatible layer for applications that
            already depend on YDB. Standalone or managed Qdrant is the right
            choice when vector search is a dedicated production workload and the
            team needs broader Qdrant API coverage, specialized indexing, and
            vector database operations.
          </p>
        }
        actions={[
          {
            href: "/docs/api/",
            label: "API docs",
          },
          {
            href: "/guides/semantic-search-ydb/",
            label: "Semantic search guide",
            view: "action",
          },
          {
            href: "/guides/best-vector-search-for-ydb/",
            label: "Best options guide",
          },
        ]}
        sections={[
          {
            title: "Short answer",
            body: (
              <p>
                Choose YDB-Qdrant when the main value is YDB co-location and a
                focused Qdrant-compatible REST subset. Choose standalone Qdrant
                or managed Qdrant when full Qdrant behavior, ANN indexing, and
                dedicated vector database operations matter more than keeping
                vectors in YDB.
              </p>
            ),
          },
          {
            title: "Comparison matrix",
            body: (
              <div className="agent-resource__table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Decision point</th>
                      <th scope="col">YDB-Qdrant</th>
                      <th scope="col">Standalone or managed Qdrant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Primary role</td>
                      <td>Qdrant-compatible REST layer over YDB.</td>
                      <td>Dedicated vector database and semantic search engine.</td>
                    </tr>
                    <tr>
                      <td>Storage</td>
                      <td>
                        Collection metadata and points are stored in YDB-backed
                        tables.
                      </td>
                      <td>
                        Qdrant controls its own vector database storage and
                        indexing model.
                      </td>
                    </tr>
                    <tr>
                      <td>Search</td>
                      <td>Exact top-k over YDB-backed data.</td>
                      <td>Purpose-built vector search with Qdrant indexing.</td>
                    </tr>
                    <tr>
                      <td>API coverage</td>
                      <td>
                        Focused subset: collections, points, search, query,
                        delete, and index compatibility calls.
                      </td>
                      <td>Full Qdrant API surface and client ecosystem.</td>
                    </tr>
                    <tr>
                      <td>Operations</td>
                      <td>
                        Reuses the YDB operational footprint where that is the
                        existing platform boundary.
                      </td>
                      <td>
                        Operates as a separate vector database or managed
                        vector service.
                      </td>
                    </tr>
                    <tr>
                      <td>Agent readiness</td>
                      <td>
                        Publishes OpenAPI, llms.txt, agent cards, SKILL.md, and
                        a separate hosted Code Indexer MCP surface.
                      </td>
                      <td>
                        Use Qdrant-native docs, clients, and deployment
                        patterns.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ),
          },
          {
            title: "Choose YDB-Qdrant when",
            items: [
              "Your application already uses YDB as a primary database or operational platform.",
              "You need a Qdrant-compatible REST subset for collections, points, search, query, and delete operations.",
              "Exact top-k search is acceptable for the current workload.",
              "You want a self-hostable Node.js package and HTTP server.",
              "You are building IDE-agent memory, RAG prototypes, internal semantic search, or small-to-medium vector collections.",
            ],
          },
          {
            title: "Choose standalone or managed Qdrant when",
            items: [
              "You need full Qdrant API compatibility.",
              "You need specialized ANN indexing and vector-database performance tuning.",
              "You need advanced Qdrant features outside the current YDB-Qdrant REST subset.",
              "Vector search is a primary production workload with strict latency targets.",
              "A separate dedicated vector database is acceptable or preferred operationally.",
            ],
          },
          {
            title: "Architecture difference",
            body: (
              <p>
                YDB-Qdrant stores collection metadata in{" "}
                <code>qdr__collections</code>, points in{" "}
                <code>qdrant_all_points</code>, and path lookups in{" "}
                <code>qdrant_points_by_file</code>. It keeps vectors and
                payloads close to YDB-backed application data. Standalone
                Qdrant operates as a dedicated vector database with its own
                storage, indexing, clustering, and operational controls.
              </p>
            ),
          },
          {
            title: "Official sources",
            items: [
              <TrackedResourceLink
                href="https://qdrant.tech/documentation/"
                label="Qdrant documentation"
                page="/compare/qdrant/"
                source="vendor_docs"
                key="qdrant-docs"
              >
                Qdrant documentation
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://api.qdrant.tech/"
                label="Qdrant API reference"
                page="/compare/qdrant/"
                source="vendor_docs"
                key="qdrant-api"
              >
                Qdrant API reference
              </TrackedResourceLink>,
              <a href="/openapi.json" key="openapi">
                YDB-Qdrant OpenAPI specification
              </a>,
              <a href="/docs/api/" key="api-docs">
                YDB-Qdrant REST API reference
              </a>,
            ],
          },
        ]}
      />
    </>
  );
}
