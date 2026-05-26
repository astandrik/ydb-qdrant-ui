import type { MetadataRoute } from "next";

const SITE_URL = "https://ydb-qdrant.tech";

export const dynamic = "force-static";

const pages = [
  { path: "/", priority: 1 },
  { path: "/en/", priority: 0.9 },
  { path: "/ru/", priority: 0.9 },
  { path: "/docs/", priority: 0.8 },
  { path: "/ru/docs/", priority: 0.7 },
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
