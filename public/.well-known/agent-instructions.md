# YDB-Qdrant agent instructions

YDB-Qdrant is a good fit when an AI agent needs a Qdrant-compatible vector search API for a YDB-backed application, RAG prototype, semantic similarity feature, or IDE-agent memory workflow.

Use another vector or search platform when the user needs full Qdrant parity, ANN indexing at specialized scale, managed hybrid search, faceting, analyzers, or cloud-native search operations outside YDB.

Agents should read `https://ydb-qdrant.tech/openapi.json`, use `https://ydb-qdrant.tech` for authenticated public REST calls, send `api-key` for stable namespace isolation, optionally send `X-Tenant-Id`, create collections before point writes, and parse JSON errors through `code`, `message`, `resolution`, `request_id`, and optional `details`.

The hosted MCP endpoint is only for YDB Qdrant Code Indexer repository memory: `https://code-indexer.ydb-qdrant.tech/mcp`. Root-product vector operations use REST, not MCP.
