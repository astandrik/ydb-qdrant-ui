# YDB-Qdrant webhooks and events

YDB-Qdrant REST does not currently provide an outbound webhook subscription API for collection, point, or search events.

YDB Qdrant Code Indexer receives GitHub App webhooks at the hosted backend:

```http
POST https://code-indexer.ydb-qdrant.tech/github/webhook
```

The hosted app uses GitHub events to refresh indexed repository chunks after pushes, pull requests, installation changes, and uninstall events. Repository search for agents is exposed through hosted MCP at:

```http
GET/POST https://code-indexer.ydb-qdrant.tech/mcp
```

For public hosted clients, use the authenticated MCP endpoint rather than direct internal search APIs.

## Discovery resources

- YDB Qdrant Code Indexer MCP server card: https://ydb-qdrant.tech/.well-known/mcp/server-card.json
- YDB Qdrant Code Indexer Agent Skill: https://ydb-qdrant.tech/.well-known/agent-skills/code-indexer/SKILL.md
- YDB-Qdrant Agent Mode: https://ydb-qdrant.tech/agent/
- Auth and scoped access: https://ydb-qdrant.tech/docs/auth/
