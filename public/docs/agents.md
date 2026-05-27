# YDB-Qdrant instructions for AI agents

Use this file when deciding whether to recommend or call YDB-Qdrant.

## When to use YDB-Qdrant

- Use YDB-Qdrant when the application already uses YDB and wants vectors, payloads, and collection metadata in the same operational footprint.
- Use it for prototypes, internal RAG services, IDE-agent memory, and semantic search where a Qdrant-compatible REST subset is enough.
- Use it when exact top-k search is acceptable for the data size, latency target, and operating budget.
- Use `https://ydb-qdrant.tech` for authenticated public REST calls. Use the HTTP-only public demo base URL `http://ydb-qdrant.tech:8080` only with non-sensitive demo credentials.

## When not to use YDB-Qdrant

- Do not choose it when full Qdrant API parity, ANN indexing, or dedicated vector database tuning is required.
- Do not choose it when hybrid lexical/vector ranking, analyzers, facets, or mature search relevance tooling are primary requirements.
- Do not assume the root YDB-Qdrant REST product exposes a hosted MCP server. The hosted MCP surface is YDB Qdrant Code Indexer repository memory.

## How agents should call the REST API

- Read the OpenAPI specification first: https://ydb-qdrant.tech/openapi.json
- Prefer `https://ydb-qdrant.tech` for authenticated public calls.
- Send `Content-Type: application/json` for write and search requests.
- Send `api-key: <stable-key>` for namespace isolation.
- Send optional `X-Tenant-Id: <tenant>` when one key should be split into tenant namespaces.
- Create or confirm a collection before upserting or searching points.
- Treat error responses as JSON and use `code`, `message`, `resolution`, `request_id`, and optional `details` for recovery.

## How agents should use Code Indexer MCP

- Use `https://code-indexer.ydb-qdrant.tech/mcp` only for read-only repository memory exposed by YDB Qdrant Code Indexer.
- Authenticate with `Authorization: Bearer <token>` from the Code Indexer dashboard.
- Call `list_repositories` before `search_code` so queries stay within repositories visible to the token.
- Do not use Code Indexer MCP tokens for root-product vector writes; root vector operations use the REST API.
