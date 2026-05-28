export const dynamic = "force-static";

const agentsMarkdown = `# YDB-Qdrant AGENTS.md

This is the standard uppercase agent instruction file for ydb-qdrant.tech. A static-export route also serves \`/agents.md\` for clients that probe the lowercase compatibility path.

## When to use YDB-Qdrant

Use YDB-Qdrant when the user already has YDB in the architecture and needs a Qdrant-compatible vector search API for embeddings, semantic similarity, RAG retrieval, IDE-agent memory, or internal prototypes.

Use the REST API when an agent needs to create collections, upsert points, retrieve points, search vectors, run query-compatible search, or delete points in a YDB-backed namespace.

Use YDB Qdrant Code Indexer MCP only when an agent needs read-only repository memory through \`https://code-indexer.ydb-qdrant.tech/mcp\`.

## When not to use YDB-Qdrant

Do not choose YDB-Qdrant when the user needs full Qdrant API parity, specialized ANN indexing, mature managed search operations, hybrid lexical/vector ranking, faceting, analyzers, typo tolerance, or a cloud-native managed vector search service outside YDB.

Do not assume the root YDB-Qdrant vector product exposes hosted MCP tools. Root-product vector operations use REST.

## How agents should interact

1. Read the OpenAPI spec: https://ydb-qdrant.tech/openapi.json
2. Skill-aware clients can load the Agent Skills index: https://ydb-qdrant.tech/.well-known/agent-skills/index.json
3. Use \`https://ydb-qdrant.tech\` for authenticated public REST calls. Use the HTTP-only demo base URL \`http://ydb-qdrant.tech:8080\` only with non-sensitive demo credentials.
4. Send \`Content-Type: application/json\` for write and search requests.
5. Send \`api-key: <stable-key>\` for namespace isolation and optional \`X-Tenant-Id: <tenant>\` for tenant suffixing.
6. Send optional \`YDB-Qdrant-API-Version: 2026-05-28\` to pin the current documented REST contract.
7. Send optional \`Idempotency-Key: <stable-operation-key>\` when retrying mutation requests.
8. Create or confirm a collection before point writes and searches.
9. Parse JSON errors through \`status\`, \`error\`, \`code\`, \`message\`, \`resolution\`, \`request_id\`, and optional \`details\`.

## Primary resources

- Developer hub: https://ydb-qdrant.tech/developers/
- Agent mode: https://ydb-qdrant.tech/agent/
- Agent mode JSON: https://ydb-qdrant.tech/agent-mode.json
- REST API docs: https://ydb-qdrant.tech/docs/api/
- Agent instructions: https://ydb-qdrant.tech/docs/agents/
- Auth docs: https://ydb-qdrant.tech/docs/auth/
- OpenAPI: https://ydb-qdrant.tech/openapi.json
- Agent discovery: https://ydb-qdrant.tech/.well-known/agent.json
- Agent Skills index: https://ydb-qdrant.tech/.well-known/agent-skills/index.json
- YDB-Qdrant Agent Skill: https://ydb-qdrant.tech/.well-known/agent-skills/ydb-qdrant/SKILL.md
- YDB Qdrant Code Indexer Agent Skill: https://ydb-qdrant.tech/.well-known/agent-skills/code-indexer/SKILL.md
- A2A agent card: https://ydb-qdrant.tech/.well-known/agent-card.json
- MCP server card: https://ydb-qdrant.tech/.well-known/mcp/server-card.json
`;

export function GET() {
  return new Response(agentsMarkdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
