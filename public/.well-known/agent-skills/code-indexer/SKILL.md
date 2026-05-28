---
name: ydb-qdrant-code-indexer
description: Use YDB Qdrant Code Indexer when an agent needs read-only repository memory over hosted Streamable HTTP MCP.
---

# YDB Qdrant Code Indexer

Use this skill when a coding agent needs searchable project memory for GitHub repositories that are installed in YDB Qdrant Code Indexer.

## Capabilities

- List repositories visible to the MCP token.
- Inspect repository index state for default branches and pull requests.
- Search indexed code chunks with the `search_code` MCP tool.
- Use hosted read-only repository memory through Streamable HTTP MCP at `https://code-indexer.ydb-qdrant.tech/mcp`.

## Auth

- Send `Authorization: Bearer <mcp-token>` to the MCP endpoint.
- MCP tokens are created in the Code Indexer dashboard, shown once, stored as hashes, and revocable.
- Repository scope follows the GitHub App installation and the linked user.

## Resources

- Product page: https://ydb-qdrant.tech/code-indexer/
- Dashboard: https://ydb-qdrant.tech/code-indexer/dashboard/
- MCP docs: https://ydb-qdrant.tech/docs/mcp/
- MCP card: https://ydb-qdrant.tech/.well-known/mcp/server-card.json
- MCP manifest: https://ydb-qdrant.tech/.well-known/mcp.json
- AI-readable page: https://ydb-qdrant.tech/code-indexer/llms.txt

## Constraints

- Code Indexer MCP is read-only repository memory.
- Do not use it for root-product vector collection mutations.
- Do not assume access to repositories outside the GitHub App installation.
- If a repository or index is missing, ask the user to install/select the repository or refresh indexing in the dashboard.
