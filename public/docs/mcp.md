# YDB-Qdrant MCP server discovery

The hosted MCP surface for this project is YDB Qdrant Code Indexer.

MCP endpoint:

```text
GET/POST https://code-indexer.ydb-qdrant.tech/mcp
Authorization: Bearer <mcp-token>
```

## Discovery resources

- MCP server card: https://ydb-qdrant.tech/.well-known/mcp/server-card.json
- MCP manifest: https://ydb-qdrant.tech/.well-known/mcp.json
- Code Indexer Agent Skill: https://ydb-qdrant.tech/.well-known/agent-skills/code-indexer/SKILL.md
- Agent mode: https://ydb-qdrant.tech/agent/
- Code Indexer product page: https://ydb-qdrant.tech/code-indexer/
- Code Indexer AI-readable page: https://ydb-qdrant.tech/code-indexer/llms.txt

## Tools

- `list_repositories`
- `list_repository_indexes`
- `search_code`

The root YDB-Qdrant vector REST product does not currently publish a separate hosted MCP server.
