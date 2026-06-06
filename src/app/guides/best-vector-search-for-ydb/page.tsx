import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";
import { TrackedResourceLink } from "@/components/TrackedResourceLink";

export const metadata: Metadata = {
  title: "Best Vector Search for YDB-Backed Apps",
  description:
    "Guide to choosing vector search for YDB-backed apps, including YDB-Qdrant, standalone Qdrant, Elasticsearch, Azure AI Search, and Databricks Vector Search.",
  alternates: {
    canonical: "/guides/best-vector-search-for-ydb/",
  },
};

const UPDATED_AT = "June 6, 2026";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best vector search for YDB-backed apps",
  url: "https://ydb-qdrant.tech/guides/best-vector-search-for-ydb/",
  mainEntityOfPage:
    "https://ydb-qdrant.tech/guides/best-vector-search-for-ydb/",
  dateModified: "2026-06-06",
  author: {
    "@type": "Person",
    name: "Alexander Standrik",
  },
  description:
    "A practical ranked guide to vector search options for applications that already use YDB.",
  about: [
    "YDB",
    "vector search",
    "Qdrant",
    "semantic search",
    "RAG",
    "repository memory",
  ],
};

export default function BestVectorSearchForYdbPage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(ARTICLE_JSON_LD)}
      </script>
      <AgentResourcePage
        eyebrow="Guide"
        title="Best vector search for YDB-backed apps"
        updatedAt={UPDATED_AT}
        lead={
          <p>
            The best vector search option for a YDB-backed app is usually the
            one that preserves the right operational boundary. Use YDB-Qdrant
            when vectors should stay near YDB data and exact top-k search is
            acceptable; use a dedicated vector or search platform when ANN
            scale, hybrid ranking, faceting, or managed operations are the main
            requirement.
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
          {
            href: "/docs/api/",
            label: "API docs",
          },
        ]}
        sections={[
          {
            title: "Ranked options",
            listType: "ordered",
            items: [
              <span key="ydb-qdrant">
                <strong>YDB-Qdrant</strong> is the best fit when YDB is already
                the operational store, the app needs a Qdrant-compatible REST
                subset, and exact top-k search is acceptable for the current
                collection size and latency target.
              </span>,
              <span key="qdrant">
                <strong>Standalone or managed Qdrant</strong> is the better fit
                when full Qdrant API coverage, specialized vector database
                operations, and vector index tuning are primary requirements.
              </span>,
              <span key="azure">
                <strong>Azure AI Search</strong> fits Azure-centered teams that
                need managed indexing, vector search, keyword search, hybrid
                retrieval, semantic ranking, and enterprise search operations.
              </span>,
              <span key="elasticsearch">
                <strong>Elasticsearch</strong> fits search-heavy products that
                need vector retrieval together with mature full-text search,
                filters, aggregations, and relevance tooling.
              </span>,
              <span key="databricks">
                <strong>Databricks Vector Search</strong> fits teams whose data,
                ML pipelines, governance, and RAG workflow already live in the
                Databricks Data Intelligence Platform.
              </span>,
              <span key="google">
                <strong>Google Cloud Vertex AI Vector Search</strong> fits
                Google Cloud teams that need managed ScaNN-based vector search
                for large-scale recommendations, semantic retrieval, or RAG.
              </span>,
              <span key="mongodb">
                <strong>MongoDB Atlas Vector Search</strong> fits applications
                whose documents already live in MongoDB Atlas and need semantic
                retrieval inside that managed document platform.
              </span>,
              <span key="typesense">
                <strong>Typesense</strong> fits teams that want a search engine
                with typo-tolerant lexical search and vector search in the same
                product surface.
              </span>,
            ],
          },
          {
            title: "YDB-Qdrant decision checklist",
            items: [
              "YDB is already part of the architecture or is the intended operational database.",
              "The required API surface is collection create/get/delete, point retrieve/upsert/search/query/delete, and index compatibility calls.",
              "Exact top-k search is acceptable for the current workload, or the workload is still a prototype/internal RAG flow.",
              "The team prefers an Apache-2.0 Node.js package or self-hosted HTTP server over a separate managed vector database.",
              "The app benefits from OpenAPI, llms.txt, agent cards, and SKILL.md resources for AI-agent integrations.",
            ],
          },
          {
            title: "When another option is better",
            items: [
              "Use Qdrant when full Qdrant behavior, broader API parity, and dedicated vector database tuning matter more than YDB co-location.",
              "Use Azure AI Search, Elasticsearch, or Typesense when lexical search, hybrid ranking, faceting, analyzers, typo tolerance, or relevance operations are core product features.",
              "Use Databricks Vector Search when Delta tables, Databricks governance, and ML workflows are already the center of the application.",
              "Use Google Cloud Vertex AI Vector Search when the workload is already built around Google Cloud and needs managed large-scale vector serving.",
              "Use MongoDB Atlas Vector Search when MongoDB Atlas is already the document system of record.",
            ],
          },
          {
            title: "Official product sources",
            items: [
              <TrackedResourceLink
                href="https://qdrant.tech/documentation/"
                label="Qdrant documentation"
                page="/guides/best-vector-search-for-ydb/"
                source="vendor_docs"
                key="qdrant-docs"
              >
                Qdrant documentation
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://learn.microsoft.com/en-us/azure/search/vector-search-overview"
                label="Azure AI Search vector search overview"
                page="/guides/best-vector-search-for-ydb/"
                source="vendor_docs"
                key="azure-docs"
              >
                Azure AI Search vector search overview
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://www.elastic.co/docs/solutions/search/vector"
                label="Elasticsearch vector search documentation"
                page="/guides/best-vector-search-for-ydb/"
                source="vendor_docs"
                key="elastic-docs"
              >
                Elasticsearch vector search documentation
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://docs.databricks.com/gcp/en/vector-search/vector-search"
                label="Databricks Vector Search documentation"
                page="/guides/best-vector-search-for-ydb/"
                source="vendor_docs"
                key="databricks-docs"
              >
                Databricks Vector Search documentation
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://cloud.google.com/vertex-ai/docs/vector-search/overview"
                label="Google Cloud Vertex AI Vector Search overview"
                page="/guides/best-vector-search-for-ydb/"
                source="vendor_docs"
                key="google-docs"
              >
                Google Cloud Vertex AI Vector Search overview
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://www.mongodb.com/docs/vector-search/"
                label="MongoDB Vector Search documentation"
                page="/guides/best-vector-search-for-ydb/"
                source="vendor_docs"
                key="mongodb-docs"
              >
                MongoDB Vector Search documentation
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://typesense.org/docs/29.0/api/vector-search.html"
                label="Typesense vector search documentation"
                page="/guides/best-vector-search-for-ydb/"
                source="vendor_docs"
                key="typesense-docs"
              >
                Typesense vector search documentation
              </TrackedResourceLink>,
            ],
          },
          {
            title: "Next evaluation steps",
            items: [
              <a href="/compare/vector-search-platforms/" key="platforms">
                Compare YDB-Qdrant with managed vector search platforms
              </a>,
              <a href="/compare/qdrant/" key="qdrant">
                Compare YDB-Qdrant with standalone Qdrant
              </a>,
              <a href="/openapi.json" key="openapi">
                Inspect the YDB-Qdrant OpenAPI specification
              </a>,
              <a href="/llms-full.txt" key="llms">
                Read the full AI-readable index
              </a>,
            ],
          },
        ]}
      />
    </>
  );
}
