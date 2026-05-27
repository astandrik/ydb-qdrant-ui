import type { MetadataRoute } from "next";

const SITE_URL = "https://ydb-qdrant.tech";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/llms.txt",
        "/llms-full.txt",
        "/openapi.json",
        "/pricing/",
        "/pricing.md",
        "/auth.md",
        "/index.md",
        "/docs/llms.txt",
        "/docs/openapi/",
        "/docs/openapi.md",
        "/docs/mcp/",
        "/docs/mcp.md",
        "/.well-known/agent.json",
        "/.well-known/api-catalog",
        "/.well-known/mcp.json",
        "/.well-known/mcp/server-card.json",
      ],
      disallow: ["/code-indexer/dashboard/", "/code-indexer/admin/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
