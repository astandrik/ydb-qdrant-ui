import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

function resolveRoot(relativePath) {
  return path.join(root, relativePath);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertFile(relativePath) {
  assert(existsSync(resolveRoot(relativePath)), `Missing ${relativePath}`);
}

function readJson(relativePath) {
  assertFile(relativePath);
  return JSON.parse(readFileSync(resolveRoot(relativePath), "utf8"));
}

const requiredFiles = [
  "public/openapi.json",
  "public/.well-known/agent.json",
  "public/.well-known/api-catalog",
  "public/.well-known/mcp/server-card.json",
  "public/.well-known/mcp.json",
  "public/auth.md",
  "public/pricing.md",
  "public/index.md",
  "public/llms-full.txt",
  "public/docs/llms.txt",
  "public/developers.md",
  "public/docs/api.md",
  "public/docs/auth.md",
  "public/docs/openapi.md",
  "public/docs/mcp.md",
  "public/docs/webhooks.md",
  "public/compare/qdrant.md",
  "public/compare/vector-search-platforms.md",
  "public/compare/databricks-vector-search.md",
  "public/compare/azure-ai-search.md",
  "public/compare/elasticsearch.md",
  "public/guides/semantic-search-ydb.md",
  "public/guides/best-vector-search-for-ydb.md",
  "src/app/developers/page.tsx",
  "src/app/pricing/page.tsx",
  "src/app/docs/api/page.tsx",
  "src/app/docs/auth/page.tsx",
  "src/app/docs/openapi/page.tsx",
  "src/app/docs/mcp/page.tsx",
  "src/app/docs/webhooks/page.tsx",
  "src/app/compare/qdrant/page.tsx",
  "src/app/compare/vector-search-platforms/page.tsx",
  "src/app/compare/databricks-vector-search/page.tsx",
  "src/app/compare/azure-ai-search/page.tsx",
  "src/app/compare/elasticsearch/page.tsx",
  "src/app/guides/semantic-search-ydb/page.tsx",
  "src/app/guides/best-vector-search-for-ydb/page.tsx",
];

for (const file of requiredFiles) {
  assertFile(file);
}

const openapi = readJson("public/openapi.json");
assert(openapi.openapi === "3.1.0", "OpenAPI must use version 3.1.0");
assert(
  openapi.info?.title?.includes("YDB-Qdrant"),
  "OpenAPI title must include YDB-Qdrant",
);
assert(
  openapi.components?.securitySchemes?.ApiKeyAuth?.in === "header",
  "OpenAPI must define ApiKeyAuth header security",
);
assert(
  openapi.components?.securitySchemes?.ApiKeyAuth?.name === "api-key",
  "OpenAPI ApiKeyAuth must use api-key",
);
assert(
  openapi.components?.securitySchemes?.CodeIndexerBearer?.scheme === "bearer",
  "OpenAPI must define CodeIndexerBearer bearer security",
);

const requiredPaths = [
  "/",
  "/health",
  "/collections/{collection}",
  "/collections/{collection}/index",
  "/collections/{collection}/points",
  "/collections/{collection}/points/upsert",
  "/collections/{collection}/points/search",
  "/collections/{collection}/points/query",
  "/collections/{collection}/points/delete",
];

for (const apiPath of requiredPaths) {
  assert(openapi.paths?.[apiPath], `OpenAPI missing path ${apiPath}`);
}

assert(
  openapi.servers?.[0]?.url === "https://ydb-qdrant.tech" &&
    openapi.servers[0].description?.includes("root path serves the static"),
  "Public OpenAPI server must document that / is the static site",
);
assert(
  openapi.paths["/"].get?.servers?.[0]?.url === "http://localhost:8080",
  "GET / must override the public static-site server",
);
assert(
  openapi.paths["/collections/{collection}"].put?.security?.some((entry) =>
    Object.hasOwn(entry, "ApiKeyAuth"),
  ),
  "Collection create operation must require ApiKeyAuth",
);
assert(
  openapi.components?.schemas?.DeletePointsRequest?.oneOf?.some((variant) =>
    variant.properties?.filter?.oneOf?.some((filterVariant) => filterVariant.maxProperties === 0),
  ),
  "DeletePointsRequest must allow an empty filter object",
);
assert(
  openapi.components?.schemas?.RetrievePointsRequest?.properties?.with_vector?.description?.includes(
    "returns vector as null",
  ),
  "RetrievePointsRequest.with_vector must document the current null-vector response",
);
assert(
  openapi.components?.schemas?.ScoredPoint?.properties?.id?.type === "string" &&
    openapi.components.schemas.ScoredPoint.properties.id.description?.includes(
      "Numeric request ids are normalized to strings",
    ),
  "ScoredPoint.id must document numeric id normalization",
);
assert(
  openapi.components?.schemas?.RetrievedPoint?.properties?.vector?.type === "null" &&
    openapi.components.schemas.RetrievedPoint.properties.vector.description?.includes(
      "Always null",
    ),
  "RetrievedPoint.vector must document the current null-vector projection",
);
assert(
  openapi.components?.schemas?.ErrorResponse?.required?.includes("code") &&
    openapi.components?.schemas?.ErrorResponse?.required?.includes("resolution") &&
    openapi.components?.schemas?.ErrorResponse?.required?.includes("request_id"),
  "ErrorResponse must expose code, resolution, and request_id",
);
assert(
  openapi.components?.schemas?.ErrorResponse?.properties?.error?.type === "string",
  "ErrorResponse.error must remain a string",
);
assert(
  openapi.components?.schemas?.ErrorResponse?.properties?.code?.enum?.includes(
    "COLLECTION_NOT_FOUND",
  ),
  "ErrorResponse.code must include COLLECTION_NOT_FOUND",
);

const agent = readJson("public/.well-known/agent.json");
assert(agent.name === "YDB-Qdrant", "Agent discovery must name YDB-Qdrant");
assert(
  agent.openapi === "https://ydb-qdrant.tech/openapi.json",
  "Agent discovery must link the OpenAPI spec",
);
assert(
  agent.mcp?.server_card ===
    "https://ydb-qdrant.tech/.well-known/mcp/server-card.json",
  "Agent discovery must link the MCP server card",
);
assert(
  agent.pricing === "https://ydb-qdrant.tech/pricing/",
  "Agent discovery must link pricing",
);

const apiCatalog = readJson("public/.well-known/api-catalog");
assert(
  Array.isArray(apiCatalog.apis) &&
    apiCatalog.apis.some((api) => api.url === "https://ydb-qdrant.tech/openapi.json"),
  "API catalog must list the public OpenAPI URL",
);
assert(
  apiCatalog.linkset?.[0]?.item?.some(
    (item) => item.href === "https://ydb-qdrant.tech/openapi.json",
  ),
  "API catalog linkset must include OpenAPI item entries",
);
assert(
  apiCatalog.linkset?.[0]?.["service-doc"]?.some(
    (item) => item.href === "https://ydb-qdrant.tech/pricing/",
  ),
  "API catalog service-doc must include pricing",
);

const mcpCard = readJson("public/.well-known/mcp/server-card.json");
assert(
  mcpCard.name === "ydb-qdrant-code-indexer",
  "MCP server card must describe Code Indexer",
);
assert(mcpCard.version === "1.0.0", "MCP server card must include a version");
assert(
  mcpCard.serverUrl === "https://code-indexer.ydb-qdrant.tech/mcp",
  "MCP server card must expose top-level serverUrl",
);
assert(
  mcpCard.transport?.type === "streamable-http",
  "MCP server card must declare Streamable HTTP transport",
);
assert(
  mcpCard.transport?.url === "https://code-indexer.ydb-qdrant.tech/mcp",
  "MCP server card must point at the hosted MCP endpoint",
);

const mcpManifest = readJson("public/.well-known/mcp.json");
assert(
  Array.isArray(mcpManifest.servers) &&
    mcpManifest.servers.some(
      (server) => server.url === "https://code-indexer.ydb-qdrant.tech/mcp",
    ),
  "MCP manifest must list the hosted MCP endpoint",
);

const llms = readFileSync(resolveRoot("public/llms.txt"), "utf8");
const semanticSearchGuide = readFileSync(
  resolveRoot("public/guides/semantic-search-ydb.md"),
  "utf8",
);
assert(
  semanticSearchGuide.indexOf("/points/upsert") > -1 &&
    semanticSearchGuide.indexOf("/points/upsert") <
      semanticSearchGuide.indexOf("/points/search"),
  "Semantic search markdown guide must upsert before search",
);
const ciWorkflow = readFileSync(resolveRoot(".github/workflows/ci.yml"), "utf8");
assert(
  ciWorkflow.includes("npm run validate:agent-resources"),
  "CI workflow must run validate:agent-resources",
);
const apiDocsPage = readFileSync(resolveRoot("src/app/docs/api/page.tsx"), "utf8");
assert(
  apiDocsPage.indexOf("/points/upsert") > -1 &&
    apiDocsPage.indexOf("/points/upsert") < apiDocsPage.indexOf("/points/search"),
  "API docs example must upsert before search",
);
for (const expected of [
  "https://ydb-qdrant.tech/openapi.json",
  "https://ydb-qdrant.tech/pricing/",
  "https://ydb-qdrant.tech/docs/api/",
  "https://ydb-qdrant.tech/docs/openapi/",
  "https://ydb-qdrant.tech/docs/auth/",
  "https://ydb-qdrant.tech/docs/mcp/",
  "https://ydb-qdrant.tech/docs/webhooks/",
  "https://ydb-qdrant.tech/.well-known/mcp/server-card.json",
  "https://ydb-qdrant.tech/compare/databricks-vector-search/",
  "https://ydb-qdrant.tech/compare/azure-ai-search/",
  "https://ydb-qdrant.tech/compare/elasticsearch/",
  "https://ydb-qdrant.tech/guides/best-vector-search-for-ydb/",
]) {
  assert(llms.includes(expected), `llms.txt missing ${expected}`);
}

console.log("Agent resources validated.");
