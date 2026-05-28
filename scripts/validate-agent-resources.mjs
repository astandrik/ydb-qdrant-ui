import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
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

const validatorSource = readFileSync(
  resolveRoot("scripts/validate-agent-resources.mjs"),
  "utf8",
);
for (const forbiddenReference of [
  ["private", "deploy-static.sh"].join("/"),
  ["deploy", "Script", "Path"].join(""),
  ["PUBLIC", "PROXY", "HOST"].join("_"),
  ["REMOTE", "APP", "HOST"].join("_"),
]) {
  assert(
    !validatorSource.includes(forbiddenReference),
    "Agent resource validator must not depend on ignored deploy scripts",
  );
}

const requiredFiles = [
  "AGENTS.md",
  "SKILL.md",
  "public/openapi.json",
  "public/.well-known/agent.json",
  "public/.well-known/agent-card.json",
  "public/.well-known/api-catalog",
  "public/.well-known/oauth-protected-resource",
  "public/.well-known/mcp/server-card.json",
  "public/.well-known/mcp.json",
  "public/about.md",
  "public/contact.md",
  "public/privacy.md",
  "public/auth.md",
  "public/AGENTS.md",
  "public/skills.sh",
  "public/pricing.md",
  "public/index.md",
  "public/llms-full.txt",
  "public/docs/llms.txt",
  "public/developers.md",
  "public/docs/api.md",
  "public/docs/agents.md",
  "public/docs/auth.md",
  "public/docs/openapi.md",
  "public/docs/mcp.md",
  "public/docs/webhooks.md",
  "public/compare/qdrant.md",
  "public/compare/vector-search-platforms.md",
  "public/compare/databricks-vector-search.md",
  "public/compare/azure-ai-search.md",
  "public/compare/elasticsearch.md",
  "public/compare/google-cloud-vector-search.md",
  "public/compare/mongodb-atlas-vector-search.md",
  "public/compare/typesense.md",
  "public/guides/semantic-search-ydb.md",
  "public/guides/best-vector-search-for-ydb.md",
  "public/guides/vector-database-api-semantic-search.md",
  "public/guides/vector-search-api-semantic-similarity-embeddings.md",
  "public/.well-known/agent-instructions.md",
  "public/.well-known/agent-skills/index.json",
  "public/.well-known/agent-skills/ydb-qdrant/SKILL.md",
  "public/.well-known/agent-skills/code-indexer/SKILL.md",
  "src/shared/agentModeData.ts",
  "src/app/agent/page.tsx",
  "src/app/agent-mode.json/route.ts",
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/agents.md/route.ts",
  "src/app/developers/page.tsx",
  "src/app/pricing/page.tsx",
  "src/app/docs/api/page.tsx",
  "src/app/docs/agents/page.tsx",
  "src/app/docs/auth/page.tsx",
  "src/app/docs/openapi/page.tsx",
  "src/app/docs/mcp/page.tsx",
  "src/app/docs/webhooks/page.tsx",
  "src/app/compare/qdrant/page.tsx",
  "src/app/compare/vector-search-platforms/page.tsx",
  "src/app/compare/databricks-vector-search/page.tsx",
  "src/app/compare/azure-ai-search/page.tsx",
  "src/app/compare/elasticsearch/page.tsx",
  "src/app/compare/google-cloud-vector-search/page.tsx",
  "src/app/compare/mongodb-atlas-vector-search/page.tsx",
  "src/app/compare/typesense/page.tsx",
  "src/app/guides/semantic-search-ydb/page.tsx",
  "src/app/guides/best-vector-search-for-ydb/page.tsx",
  "src/app/guides/vector-database-api-semantic-search/page.tsx",
  "src/app/guides/vector-search-api-semantic-similarity-embeddings/page.tsx",
];

for (const file of requiredFiles) {
  assertFile(file);
}

assert(
  !existsSync(resolveRoot("public/.well-known/oauth-authorization-server")),
  "OAuth authorization server metadata must not be published until a real REST OAuth authorization server exists",
);

const appDirectoryEntries = readdirSync(resolveRoot("src/app"), {
  withFileTypes: true,
});
assert(
  !appDirectoryEntries.some((entry) => entry.name === "AGENTS.md" && entry.isDirectory()),
  "src/app/AGENTS.md must not exist as a directory; publish public/AGENTS.md as a file",
);
assert(
  appDirectoryEntries.some((entry) => entry.name === "agents.md" && entry.isDirectory()),
  "src/app/agents.md route directory must serve lowercase /agents.md for static export",
);

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
assert(
  !Object.hasOwn(openapi.components.securitySchemes.ApiKeyAuth, "x-scopes") &&
    !Object.hasOwn(openapi.components.securitySchemes.CodeIndexerBearer, "x-scopes"),
  "OpenAPI security schemes must not advertise unsupported OAuth-like scopes",
);
assert(
  openapi.components?.parameters?.IdempotencyKey?.name === "Idempotency-Key" &&
    openapi.components.parameters.IdempotencyKey.in === "header" &&
    openapi.components.parameters.IdempotencyKey.required === false,
  "OpenAPI must define reusable optional Idempotency-Key header parameter",
);
assert(
  openapi.components?.parameters?.ApiVersion?.name === "YDB-Qdrant-API-Version" &&
    openapi.components.parameters.ApiVersion.in === "header" &&
    openapi.components.parameters.ApiVersion.required === false &&
    openapi.components.parameters.ApiVersion.schema?.enum?.includes("2026-05-28"),
  "OpenAPI must define reusable optional YDB-Qdrant-API-Version header parameter",
);
assert(
  openapi["x-api-lifecycle"]?.current_version === "2026-05-28" &&
    openapi["x-api-lifecycle"]?.versioning?.includes("YDB-Qdrant-API-Version") &&
    openapi["x-api-lifecycle"]?.deprecation_policy?.includes("90 days"),
  "OpenAPI must document API versioning and deprecation policy",
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
  assert(
    openapi.paths[apiPath].parameters?.some(
      (parameter) => parameter.$ref === "#/components/parameters/ApiVersion",
    ),
    `OpenAPI ${apiPath} must advertise YDB-Qdrant-API-Version`,
  );
}

const idempotentMutationOperations = [
  ["put", "/collections/{collection}"],
  ["delete", "/collections/{collection}"],
  ["put", "/collections/{collection}/index"],
  ["put", "/collections/{collection}/points"],
  ["post", "/collections/{collection}/points/upsert"],
  ["post", "/collections/{collection}/points/delete"],
];

for (const [method, apiPath] of idempotentMutationOperations) {
  assert(
    openapi.paths?.[apiPath]?.[method]?.parameters?.some(
      (parameter) => parameter.$ref === "#/components/parameters/IdempotencyKey",
    ),
    `OpenAPI ${method.toUpperCase()} ${apiPath} must advertise Idempotency-Key`,
  );
}

for (const [apiPath, pathItem] of Object.entries(openapi.paths)) {
  for (const [method, operation] of Object.entries(pathItem)) {
    if (!["get", "post", "put", "delete", "patch", "head", "options"].includes(method)) {
      continue;
    }
    assert(
      !Object.hasOwn(operation, "x-permissions"),
      `OpenAPI ${method.toUpperCase()} ${apiPath} must not advertise unsupported per-operation permissions`,
    );
  }
}

assert(
  openapi.servers?.[0]?.url === "https://ydb-qdrant.tech" &&
    openapi.servers[0].description?.includes("root path serves the static"),
  "Public OpenAPI server must document that / is the static site",
);
const publicDemoServer = openapi.servers?.find(
  (server) => server.url === "http://ydb-qdrant.tech:8080",
);
assert(
  publicDemoServer?.description?.includes("HTTP-only") &&
    publicDemoServer.description.includes("non-sensitive demo credentials"),
  "Public demo OpenAPI server must document HTTP-only demo credential limits",
);
assert(
  openapi.paths["/"].get?.servers?.[0]?.url === "http://localhost:8080",
  "GET / must override the public static-site server",
);
const publicDemoRootServer = openapi.paths["/"].get?.servers?.find(
  (server) => server.url === "http://ydb-qdrant.tech:8080",
);
assert(
  publicDemoRootServer?.description?.includes("HTTP-only") &&
    publicDemoRootServer.description.includes("non-sensitive demo credentials"),
  "GET / public demo server must document HTTP-only demo credential limits",
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
assert(
  Object.hasOwn(openapi.components?.schemas?.ErrorResponse?.properties ?? {}, "details"),
  "ErrorResponse must document optional details",
);
assert(
  openapi.components?.schemas?.ErrorResponse?.properties?.details?.type === "object",
  "ErrorResponse.details must be typed as object",
);
for (const [apiPath, pathItem] of Object.entries(openapi.paths)) {
  for (const [method, operation] of Object.entries(pathItem)) {
    if (!["get", "post", "put", "delete", "patch", "head", "options"].includes(method)) {
      continue;
    }
    assert(
      operation.responses?.default?.$ref === "#/components/responses/Error",
      `OpenAPI ${method.toUpperCase()} ${apiPath} must reference default Error response`,
    );
  }
}

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
  agent.agent_card === "https://ydb-qdrant.tech/.well-known/agent-card.json",
  "Agent discovery must link the A2A agent card",
);
assert(
  agent.pricing === "https://ydb-qdrant.tech/pricing/",
  "Agent discovery must link pricing",
);
assert(
  agent.agent_instructions ===
    "https://ydb-qdrant.tech/.well-known/agent-instructions.md",
  "Agent discovery must link agent instructions",
);
assert(
  agent.protocolVersion === "0.3" &&
    agent.awp_version === "0.2" &&
    agent.domain === "ydb-qdrant.tech" &&
    agent.protocols?.openapi?.endpoint === "https://ydb-qdrant.tech/openapi.json" &&
    agent.protocols?.mcp?.endpoint === "https://code-indexer.ydb-qdrant.tech/mcp" &&
    typeof agent.capabilities === "object" &&
    agent.capabilities.vectorSearch === true &&
    agent.capabilities.idempotency === true &&
    Array.isArray(agent.capability_tags) &&
    agent.capability_tags.includes("vector-search") &&
    Array.isArray(agent.actions) &&
    agent.actions.some((action) => action.id === "search_points") &&
    [
      "get_collection",
      "delete_collection",
      "put_collection_index",
      "retrieve_points",
      "search_points",
      "query_points",
    ].every((id) => agent.auth_model?.required_for?.includes(id)) &&
    typeof agent.a2a_capabilities === "object" &&
    Array.isArray(agent.skills),
  "Agent discovery must include agent-card compatible metadata",
);

const agentSkillsIndex = readJson("public/.well-known/agent-skills/index.json");
const ydbQdrantSkillPath =
  "public/.well-known/agent-skills/ydb-qdrant/SKILL.md";
const codeIndexerSkillPath =
  "public/.well-known/agent-skills/code-indexer/SKILL.md";
const ydbQdrantSkill = readFileSync(resolveRoot(ydbQdrantSkillPath), "utf8");
const codeIndexerSkill = readFileSync(resolveRoot(codeIndexerSkillPath), "utf8");
const ydbQdrantSkillDigest = `sha256:${createHash("sha256")
  .update(readFileSync(resolveRoot(ydbQdrantSkillPath)))
  .digest("hex")}`;
const codeIndexerSkillDigest = `sha256:${createHash("sha256")
  .update(readFileSync(resolveRoot(codeIndexerSkillPath)))
  .digest("hex")}`;
assert(
  agent.agent_skills ===
    "https://ydb-qdrant.tech/.well-known/agent-skills/index.json",
  "Agent discovery must link the Agent Skills index",
);
assert(
  agentSkillsIndex.$schema ===
    "https://schemas.agentskills.io/discovery/0.2.0/schema.json" &&
    agentSkillsIndex.skills?.some(
      (skill) =>
        skill.name === "ydb-qdrant" &&
        skill.type === "skill-md" &&
        skill.url === "/.well-known/agent-skills/ydb-qdrant/SKILL.md" &&
        skill.digest === ydbQdrantSkillDigest,
    ),
  "Agent Skills index must describe the YDB-Qdrant SKILL.md with a valid digest",
);
assert(
  agentSkillsIndex.skills?.some(
    (skill) =>
      skill.name === "ydb-qdrant-code-indexer" &&
      skill.type === "skill-md" &&
      skill.url === "/.well-known/agent-skills/code-indexer/SKILL.md" &&
      skill.digest === codeIndexerSkillDigest,
  ),
  "Agent Skills index must describe the Code Indexer SKILL.md with a valid digest",
);
assert(
  ydbQdrantSkill.includes("name: ydb-qdrant") &&
    ydbQdrantSkill.includes("Idempotency-Key") &&
    ydbQdrantSkill.includes("https://ydb-qdrant.tech/openapi.json") &&
    ydbQdrantSkill.includes("Do not assume root-product vector mutations"),
  "YDB-Qdrant Agent Skill must describe capabilities, constraints, and links",
);
assert(
  codeIndexerSkill.includes("name: ydb-qdrant-code-indexer") &&
    codeIndexerSkill.includes("https://code-indexer.ydb-qdrant.tech/mcp") &&
    codeIndexerSkill.includes("search_code") &&
    codeIndexerSkill.includes("read-only repository memory"),
  "Code Indexer Agent Skill must describe MCP endpoint, tools, and read-only scope",
);

const agentCard = readJson("public/.well-known/agent-card.json");
assert(agentCard.name === "YDB-Qdrant", "A2A agent card must name YDB-Qdrant");
assert(
  agentCard.url === "https://ydb-qdrant.tech/" &&
    agentCard.protocolVersion &&
    Array.isArray(agentCard.defaultInputModes) &&
    Array.isArray(agentCard.defaultOutputModes) &&
    agentCard.supportedInterfaces?.some(
      (agentInterface) =>
        agentInterface.url === "https://ydb-qdrant.tech/openapi.json" &&
        agentInterface.protocolBinding === "https://spec.openapis.org/oas/3.1" &&
        agentInterface.protocolVersion === "3.1.0",
    ) &&
    agentCard.supportedInterfaces?.some(
      (agentInterface) =>
        agentInterface.url === "https://code-indexer.ydb-qdrant.tech/mcp" &&
        agentInterface.protocolBinding ===
          "https://modelcontextprotocol.io/specification/2025-06-18" &&
        agentInterface.protocolVersion === "2025-06-18",
    ) &&
    !Object.hasOwn(agentCard, "additionalInterfaces") &&
    typeof agentCard.capabilities === "object" &&
    Array.isArray(agentCard.skills),
  "A2A agent card must include required AgentCard fields",
);
assert(
  agentCard.skills.some((skill) => skill.id === "qdrant-compatible-rest-api") &&
    agentCard.skills.some((skill) => skill.id === "repository-code-search-mcp"),
  "A2A agent card must list REST and Code Indexer MCP skills",
);
assert(
  agentCard.security?.some((entry) => Object.hasOwn(entry, "ApiKeyAuth")) &&
    agentCard.security?.some((entry) => Object.hasOwn(entry, "CodeIndexerBearer")) &&
    agentCard.skills
      .find((skill) => skill.id === "qdrant-compatible-rest-api")
      ?.security?.some((entry) => Object.hasOwn(entry, "ApiKeyAuth")) &&
    agentCard.skills
      .find((skill) => skill.id === "repository-code-search-mcp")
      ?.security?.some((entry) => Object.hasOwn(entry, "CodeIndexerBearer")),
  "A2A agent card must advertise REST api-key and MCP bearer auth separately",
);

const protectedResource = readJson("public/.well-known/oauth-protected-resource");
assert(
  protectedResource.resource === "https://ydb-qdrant.tech/",
  "OAuth protected resource metadata must describe the public REST resource",
);
assert(
  !Object.hasOwn(protectedResource, "authorization_servers"),
  "OAuth protected resource metadata must not advertise OAuth authorization servers for api-key REST auth",
);
assert(
  !Object.hasOwn(protectedResource, "bearer_methods_supported"),
  "OAuth protected resource metadata must not advertise bearer auth for the REST resource",
);
assert(
  !Object.hasOwn(protectedResource, "scopes_supported"),
  "OAuth protected resource metadata must not advertise unsupported OAuth scopes",
);
assert(
  !Object.hasOwn(protectedResource, "agent_auth"),
  "OAuth protected resource metadata must not advertise unsupported agent_auth endpoints",
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
  apiCatalog.linkset?.[0]?.item?.some(
    (item) => item.href === "https://ydb-qdrant.tech/.well-known/agent-card.json",
  ),
  "API catalog linkset must include A2A agent card item entries",
);
assert(
  apiCatalog.linkset?.[0]?.item?.some(
    (item) =>
      item.href === "https://ydb-qdrant.tech/.well-known/agent-skills/index.json",
  ),
  "API catalog linkset must include Agent Skills index item entries",
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
  mcpManifest.serverUrl === "https://code-indexer.ydb-qdrant.tech/mcp" &&
    mcpManifest.mcpServers?.["ydb-qdrant-code-indexer"]?.url ===
      "https://code-indexer.ydb-qdrant.tech/mcp" &&
  Array.isArray(mcpManifest.servers) &&
    mcpManifest.servers.some(
      (server) => server.url === "https://code-indexer.ydb-qdrant.tech/mcp",
    ),
  "MCP manifest must list the hosted MCP endpoint",
);

const llms = readFileSync(resolveRoot("public/llms.txt"), "utf8");
const rootAgentsMd = readFileSync(resolveRoot("AGENTS.md"), "utf8");
const rootSkill = readFileSync(resolveRoot("SKILL.md"), "utf8");
const agentsMd = readFileSync(resolveRoot("public/AGENTS.md"), "utf8");
const lowercaseAgentsRoute = readFileSync(
  resolveRoot("src/app/agents.md/route.ts"),
  "utf8",
);
const skillsScript = readFileSync(resolveRoot("public/skills.sh"), "utf8");
const robotsRoute = readFileSync(resolveRoot("src/app/robots.ts"), "utf8");
const agentModeData = readFileSync(resolveRoot("src/shared/agentModeData.ts"), "utf8");
const agentModePage = readFileSync(resolveRoot("src/app/agent/page.tsx"), "utf8");
const developersPage = readFileSync(resolveRoot("src/app/developers/page.tsx"), "utf8");
const docsAgentsPage = readFileSync(resolveRoot("src/app/docs/agents/page.tsx"), "utf8");
const docsAgentsMarkdown = readFileSync(resolveRoot("public/docs/agents.md"), "utf8");
const developersMarkdown = readFileSync(resolveRoot("public/developers.md"), "utf8");
assert(
  rootSkill.includes("name: ydb-qdrant") &&
    rootSkill.includes("npx skills add") &&
    rootSkill.includes("YDB-Qdrant-API-Version") &&
    rootSkill.includes("https://ydb-qdrant.tech/agent/"),
  "Root SKILL.md must describe official skill publication and versioned agent resources",
);
assert(
  rootAgentsMd.includes(
    "/.well-known/oauth-protected-resource` should be served as `application/json`",
  ),
  "Root AGENTS.md must document JSON content type for extensionless OAuth metadata",
);
assert(
  agentsMd.includes("https://ydb-qdrant.tech/.well-known/agent-skills/index.json") &&
    agentsMd.includes("Idempotency-Key") &&
    agentsMd.includes("static-export route also serves `/agents.md`"),
  "public/AGENTS.md must document Agent Skills, Idempotency-Key, and lowercase static-export compatibility",
);
assert(
  lowercaseAgentsRoute.includes("text/markdown; charset=utf-8") &&
    lowercaseAgentsRoute.includes("static-export route also serves") &&
    lowercaseAgentsRoute.includes("https://ydb-qdrant.tech/.well-known/agent-skills/index.json"),
  "src/app/agents.md route must serve lowercase markdown compatibility content",
);
assert(
  skillsScript.includes('base_url="${base_url%/}"'),
  "skills.sh must normalize a trailing slash from the provided base URL",
);
assert(
  robotsRoute.includes("ChatGPT-User") &&
    robotsRoute.includes("OAI-SearchBot") &&
    robotsRoute.includes("GPTBot") &&
    robotsRoute.includes("CCBot") &&
    robotsRoute.includes("ByteSpider") &&
    robotsRoute.includes("Google-Extended"),
  "robots.ts must explicitly differentiate AI search agents and training crawlers",
);
assert(
  agentModeData.includes("YDB-Qdrant Agent Mode") &&
    agentModeData.includes("YDB-Qdrant-API-Version") &&
    agentModeData.includes("https://ydb-qdrant.tech/openapi.json") &&
    agentModeData.includes("https://code-indexer.ydb-qdrant.tech/mcp"),
  "Agent mode data must expose key API, auth, and MCP capabilities",
);
assert(
  !agentModePage.includes("/?mode=agent") &&
    !developersPage.includes("/?mode=agent"),
  "Tracked UI must advertise /agent/ as the canonical static agent mode URL",
);
assert(
  !agentModePage.includes("human-readable companion") &&
    agentModePage.includes("machine-readable JSON version"),
  "Agent mode page copy must avoid self-referencing /agent/ as a companion resource",
);
for (const expected of [
  "https://ydb-qdrant.tech/agent/",
  "https://ydb-qdrant.tech/agent-mode.json",
  "YDB-Qdrant-API-Version",
  "https://ydb-qdrant.tech/.well-known/agent-skills/code-indexer/SKILL.md",
]) {
  assert(
    docsAgentsPage.includes(expected) && docsAgentsMarkdown.includes(expected),
    `Agent docs page and markdown mirror must include ${expected}`,
  );
}
for (const expected of [
  "https://ydb-qdrant.tech/agent/",
  "https://ydb-qdrant.tech/agent-mode.json",
  "https://ydb-qdrant.tech/.well-known/agent-skills/code-indexer/SKILL.md",
  "https://ydb-qdrant.tech/about/",
  "https://ydb-qdrant.tech/contact/",
  "https://ydb-qdrant.tech/privacy/",
  "https://ydb-qdrant.tech/compare/mongodb-atlas-vector-search/",
]) {
  assert(developersMarkdown.includes(expected), `public/developers.md missing ${expected}`);
}
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
const semanticSimilarityGuidePage = readFileSync(
  resolveRoot("src/app/guides/vector-search-api-semantic-similarity-embeddings/page.tsx"),
  "utf8",
);
assert(
  !semanticSimilarityGuidePage.includes('"@type": "FAQPage"'),
  "Semantic similarity guide must not publish FAQPage JSON-LD without a visible FAQ section",
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
for (const relativePath of [
  "src/app/docs/api/page.tsx",
  "public/docs/api.md",
  "src/app/guides/vector-search-api-semantic-similarity-embeddings/page.tsx",
  "public/guides/vector-search-api-semantic-similarity-embeddings.md",
]) {
  const content = readFileSync(resolveRoot(relativePath), "utf8");
  assert(
    !/^\s*curl .*http:\/\/ydb-qdrant\.tech:8080/m.test(content),
    `${relativePath} must use HTTPS for public authenticated curl examples`,
  );
}
for (const relativePath of ["src/app/docs/api/page.tsx", "public/docs/api.md"]) {
  const content = readFileSync(resolveRoot(relativePath), "utf8");
  assert(
    !content.includes("/api/__unknown_probe") && !content.includes("/v1/__unknown_probe"),
    `${relativePath} must not advertise undocumented /api or /v1 probes`,
  );
}
for (const expected of [
  "https://ydb-qdrant.tech/agent/",
  "https://ydb-qdrant.tech/agent-mode.json",
  "https://ydb-qdrant.tech/about/",
  "https://ydb-qdrant.tech/about.md",
  "https://ydb-qdrant.tech/contact/",
  "https://ydb-qdrant.tech/contact.md",
  "https://ydb-qdrant.tech/privacy/",
  "https://ydb-qdrant.tech/privacy.md",
  "https://ydb-qdrant.tech/openapi.json",
  "https://ydb-qdrant.tech/AGENTS.md",
  "https://ydb-qdrant.tech/agents.md",
  "https://ydb-qdrant.tech/skills.sh",
  "https://ydb-qdrant.tech/pricing/",
  "https://ydb-qdrant.tech/docs/api/",
  "https://ydb-qdrant.tech/docs/agents/",
  "https://ydb-qdrant.tech/docs/openapi/",
  "https://ydb-qdrant.tech/docs/auth/",
  "https://ydb-qdrant.tech/docs/mcp/",
  "https://ydb-qdrant.tech/docs/webhooks/",
  "https://ydb-qdrant.tech/.well-known/mcp/server-card.json",
  "https://ydb-qdrant.tech/.well-known/agent-skills/index.json",
  "https://ydb-qdrant.tech/.well-known/agent-skills/ydb-qdrant/SKILL.md",
  "https://ydb-qdrant.tech/.well-known/agent-skills/code-indexer/SKILL.md",
  "https://ydb-qdrant.tech/.well-known/agent-card.json",
  "https://ydb-qdrant.tech/.well-known/oauth-protected-resource",
  "https://ydb-qdrant.tech/compare/databricks-vector-search/",
  "https://ydb-qdrant.tech/compare/azure-ai-search/",
  "https://ydb-qdrant.tech/compare/elasticsearch/",
  "https://ydb-qdrant.tech/compare/google-cloud-vector-search/",
  "https://ydb-qdrant.tech/compare/mongodb-atlas-vector-search/",
  "https://ydb-qdrant.tech/compare/typesense/",
  "https://ydb-qdrant.tech/guides/best-vector-search-for-ydb/",
  "https://ydb-qdrant.tech/guides/vector-database-api-semantic-search/",
  "https://ydb-qdrant.tech/guides/vector-search-api-semantic-similarity-embeddings/",
]) {
  assert(llms.includes(expected), `llms.txt missing ${expected}`);
}

for (const relativePath of [
  "public/about.md",
  "public/contact.md",
  "public/privacy.md",
]) {
  const content = readFileSync(resolveRoot(relativePath), "utf8");
  assert(content.length >= 500, `${relativePath} must contain at least 500 chars`);
}

console.log("Agent resources validated.");
