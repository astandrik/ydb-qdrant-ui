import type { MetadataRoute } from "next";

const SITE_URL = "https://ydb-qdrant.tech";

export const dynamic = "force-static";

const pages = [
  { path: "/", priority: 1 },
  { path: "/en/", priority: 0.9 },
  { path: "/ru/", priority: 0.9 },
  { path: "/developers/", priority: 0.9 },
  { path: "/agents.md", priority: 0.65 },
  { path: "/pricing/", priority: 0.85 },
  { path: "/docs/", priority: 0.8 },
  { path: "/docs/api/", priority: 0.8 },
  { path: "/docs/agents/", priority: 0.8 },
  { path: "/docs/auth/", priority: 0.8 },
  { path: "/docs/openapi/", priority: 0.8 },
  { path: "/docs/mcp/", priority: 0.8 },
  { path: "/docs/webhooks/", priority: 0.7 },
  { path: "/ru/docs/", priority: 0.7 },
  { path: "/compare/qdrant/", priority: 0.7 },
  { path: "/compare/vector-search-platforms/", priority: 0.7 },
  { path: "/compare/databricks-vector-search/", priority: 0.65 },
  { path: "/compare/azure-ai-search/", priority: 0.65 },
  { path: "/compare/elasticsearch/", priority: 0.65 },
  { path: "/compare/google-cloud-vector-search/", priority: 0.65 },
  { path: "/compare/typesense/", priority: 0.65 },
  { path: "/guides/semantic-search-ydb/", priority: 0.75 },
  { path: "/guides/best-vector-search-for-ydb/", priority: 0.75 },
  { path: "/guides/vector-database-api-semantic-search/", priority: 0.8 },
  {
    path: "/guides/vector-search-api-semantic-similarity-embeddings/",
    priority: 0.75,
  },
  { path: "/code-indexer/", priority: 0.9 },
  { path: "/code-indexer/privacy/", priority: 0.5 },
  { path: "/code-indexer/support/", priority: 0.5 },
  { path: "/code-indexer/status/", priority: 0.5 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority,
  }));
}
