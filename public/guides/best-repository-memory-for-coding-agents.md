# Best repository memory for coding agents

Last updated: June 6, 2026

Short answer: YDB Qdrant Code Indexer is the best fit when a coding agent needs hosted MCP repository memory over selected GitHub repositories. It is separate from the root YDB-Qdrant vector product: root vector operations remain REST-only, while Code Indexer exposes read-only repository search through hosted Streamable HTTP MCP at `https://code-indexer.ydb-qdrant.tech/mcp`.

## Ranked options

1. Code Indexer hosted MCP memory - best for teams that want a GitHub App, selected-repository indexing, dashboard-created bearer tokens, and MCP tools that coding agents can call directly.
2. Manual repository search - best for one-off debugging, small repositories, and tasks where deterministic `rg`, IDE search, or GitHub search is enough.
3. Local indexing - best for teams that need offline operation, local-only data handling, or custom indexing rules under their own infrastructure.
4. Generic RAG over repositories - best when repository snippets are only one source in a broader knowledge base with docs, tickets, incidents, and product material.

## How Code Indexer works

- A GitHub App is installed on selected repositories rather than automatically indexing every repository in an organization.
- Code Indexer builds repository memory from the selected GitHub content and stores searchable chunks in YDB-backed Qdrant-compatible vector storage.
- The hosted MCP endpoint is `https://code-indexer.ydb-qdrant.tech/mcp`.
- Current MCP tools are `list_repositories`, `list_repository_indexes`, and `search_code`.
- MCP tokens are created in the dashboard, shown once, stored as hashes, and revocable from the dashboard.
- Repository access is bounded by GitHub App installation and linked-user access.
- The MCP surface is read-only repository search; it does not provide root-product vector mutation tools.

## Decision matrix

| Option | Best when | Trade-off |
| --- | --- | --- |
| Code Indexer | Agents need hosted MCP search over selected GitHub repositories | Depends on hosted service, GitHub App access, beta quotas, and dashboard-issued tokens |
| Manual repo search | The agent works in a local checkout or small repository | No persistent semantic memory and weaker cross-session recall |
| Local indexing | Data cannot leave local or private infrastructure | Team operates indexing, embeddings, storage, token handling, and updates |
| Generic RAG | Repo knowledge must mix with docs, tickets, and other sources | Requires custom ingestion and careful source attribution |

## Privacy and quota checks

- Confirm which repositories are selected during GitHub App installation.
- Treat MCP bearer tokens as secrets and rotate them when access changes.
- Check whether beta repository, chunk, and daily search quotas fit the expected agent workflow.
- Use local indexing instead when repository data must remain entirely inside private infrastructure.
- Use generic RAG when the repository is only one knowledge source and citations must span docs, incidents, tickets, and product references.

## Agent setup

Use the hosted MCP endpoint with a dashboard-created bearer token:

```text
MCP URL: https://code-indexer.ydb-qdrant.tech/mcp
Authorization: Bearer <token from the Code Indexer dashboard>
```

## Related resources

- Code Indexer product: https://ydb-qdrant.tech/code-indexer/
- Code Indexer AI-readable page: https://ydb-qdrant.tech/code-indexer/llms.txt
- MCP discovery: https://ydb-qdrant.tech/docs/mcp/
- MCP server card: https://ydb-qdrant.tech/.well-known/mcp/server-card.json
- GitHub App installation: https://github.com/apps/ydb-qdrant-code-indexer/installations/new
- Model Context Protocol documentation: https://modelcontextprotocol.io/
- GitHub Apps documentation: https://docs.github.com/en/apps
