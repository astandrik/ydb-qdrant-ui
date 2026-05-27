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
  "public/index.md",
  "public/llms-full.txt",
  "public/docs/llms.txt",
  "public/developers.md",
  "public/docs/api.md",
  "public/docs/auth.md",
  "public/docs/webhooks.md",
  "public/compare/qdrant.md",
  "public/compare/vector-search-platforms.md",
  "public/guides/semantic-search-ydb.md",
  "src/app/developers/page.tsx",
  "src/app/docs/api/page.tsx",
  "src/app/docs/auth/page.tsx",
  "src/app/docs/webhooks/page.tsx",
  "src/app/compare/qdrant/page.tsx",
  "src/app/compare/vector-search-platforms/page.tsx",
  "src/app/guides/semantic-search-ydb/page.tsx",
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
  openapi.paths["/collections/{collection}"].put?.security?.some((entry) =>
    Object.hasOwn(entry, "ApiKeyAuth"),
  ),
  "Collection create operation must require ApiKeyAuth",
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

const apiCatalog = readJson("public/.well-known/api-catalog");
assert(
  Array.isArray(apiCatalog.apis) &&
    apiCatalog.apis.some((api) => api.url === "https://ydb-qdrant.tech/openapi.json"),
  "API catalog must list the public OpenAPI URL",
);

const mcpCard = readJson("public/.well-known/mcp/server-card.json");
assert(
  mcpCard.name === "ydb-qdrant-code-indexer",
  "MCP server card must describe Code Indexer",
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
for (const expected of [
  "https://ydb-qdrant.tech/openapi.json",
  "https://ydb-qdrant.tech/docs/api/",
  "https://ydb-qdrant.tech/docs/auth/",
  "https://ydb-qdrant.tech/docs/webhooks/",
  "https://ydb-qdrant.tech/.well-known/mcp/server-card.json",
]) {
  assert(llms.includes(expected), `llms.txt missing ${expected}`);
}

console.log("Agent resources validated.");
