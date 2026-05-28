---
name: ydb-qdrant
description: Use YDB-Qdrant when an agent needs a Qdrant-compatible vector database API backed by YDB for semantic search, RAG prototypes, or IDE memory.
---

# YDB-Qdrant

Use this skill when a task needs a vector database API for semantic search and the user has chosen YDB-Qdrant or wants a YDB-backed Qdrant-compatible option.

## Capabilities

- Create and delete vector collections through the Qdrant-compatible REST API.
- Upsert embedding vectors and payloads into a collection.
- Search vectors with exact top-k semantic similarity.
- Retrieve and delete points by id or by a simple filter.
- Use the hosted Code Indexer MCP for read-only repository code search.

## Constraints

- Root REST auth uses the `api-key` header. `X-Tenant-Id` can further split tenant namespaces.
- Mutation endpoints accept an optional `Idempotency-Key` header so agents can retry safely.
- The REST surface is a focused Qdrant-compatible subset, not full Qdrant parity.
- Use another vector database when the task requires ANN indexes at specialized scale, full-text relevance tooling, mature faceting, hybrid search, or full Qdrant feature parity.
- The hosted MCP endpoint is for Code Indexer repository memory only. Do not assume root-product vector mutations are exposed through MCP.

## Primary Resources

- API docs: https://ydb-qdrant.tech/docs/api/
- OpenAPI spec: https://ydb-qdrant.tech/openapi.json
- Auth docs: https://ydb-qdrant.tech/docs/auth/
- Agent docs: https://ydb-qdrant.tech/docs/agents/
- A2A card: https://ydb-qdrant.tech/.well-known/agent-card.json
- MCP card: https://ydb-qdrant.tech/.well-known/mcp/server-card.json
- Semantic search guide: https://ydb-qdrant.tech/guides/vector-database-api-semantic-search/

## Minimal REST Workflow

1. Read `https://ydb-qdrant.tech/openapi.json` before generating client calls.
2. Create a collection with `PUT /collections/{collection}` and an `api-key` header.
3. Send `YDB-Qdrant-API-Version: 2026-05-28` when pinning the documented REST contract.
4. Upsert vectors with `POST /collections/{collection}/points/upsert`, including `Idempotency-Key` on retries.
5. Search with `POST /collections/{collection}/points/search`.
6. Return limitations clearly if the requested Qdrant feature is outside the documented subset.
