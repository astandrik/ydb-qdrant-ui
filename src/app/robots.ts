import type { MetadataRoute } from "next";

const SITE_URL = "https://ydb-qdrant.tech";

export const dynamic = "force-static";

const PUBLIC_ALLOW = [
  "/",
  "/agent/",
  "/agent-mode.json",
  "/about/",
  "/about.md",
  "/contact/",
  "/contact.md",
  "/privacy/",
  "/privacy.md",
  "/llms.txt",
  "/llms-full.txt",
  "/openapi.json",
  "/pricing/",
  "/pricing.md",
  "/auth.md",
  "/AGENTS.md",
  "/agents.md",
  "/skills.sh",
  "/index.md",
  "/docs/llms.txt",
  "/docs/agents/",
  "/docs/agents.md",
  "/docs/openapi/",
  "/docs/openapi.md",
  "/docs/mcp/",
  "/docs/mcp.md",
  "/compare/google-cloud-vector-search/",
  "/compare/google-cloud-vector-search.md",
  "/compare/mongodb-atlas-vector-search/",
  "/compare/mongodb-atlas-vector-search.md",
  "/compare/typesense/",
  "/compare/typesense.md",
  "/guides/vector-search-api-semantic-similarity-embeddings/",
  "/guides/vector-search-api-semantic-similarity-embeddings.md",
  "/guides/vector-database-api-semantic-search/",
  "/guides/vector-database-api-semantic-search.md",
  "/.well-known/agent.json",
  "/.well-known/agent-card.json",
  "/.well-known/agent-instructions.md",
  "/.well-known/agent-skills/index.json",
  "/.well-known/agent-skills/ydb-qdrant/SKILL.md",
  "/.well-known/agent-skills/code-indexer/SKILL.md",
  "/.well-known/api-catalog",
  "/.well-known/oauth-protected-resource",
  "/.well-known/mcp.json",
  "/.well-known/mcp",
  "/.well-known/mcp/server-card.json",
];

const PRIVATE_DISALLOW = ["/code-indexer/dashboard/", "/code-indexer/admin/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["ChatGPT-User", "OAI-SearchBot", "PerplexityBot"],
        allow: PUBLIC_ALLOW,
        disallow: PRIVATE_DISALLOW,
      },
      {
        userAgent: ["GPTBot", "CCBot", "ByteSpider", "Google-Extended"],
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: PUBLIC_ALLOW,
        disallow: PRIVATE_DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
