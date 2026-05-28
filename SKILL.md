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
- Use the hosted Code Indexer MCP for read-only repository memory.

## Primary Resources

- Agent mode: https://ydb-qdrant.tech/agent/
- Agent JSON: https://ydb-qdrant.tech/agent-mode.json
- API docs: https://ydb-qdrant.tech/docs/api/
- OpenAPI spec: https://ydb-qdrant.tech/openapi.json
- Auth docs: https://ydb-qdrant.tech/docs/auth/
- Agent docs: https://ydb-qdrant.tech/docs/agents/
- A2A card: https://ydb-qdrant.tech/.well-known/agent-card.json
- Agent Skills index: https://ydb-qdrant.tech/.well-known/agent-skills/index.json
- MCP card: https://ydb-qdrant.tech/.well-known/mcp/server-card.json

## REST Workflow

1. Read `https://ydb-qdrant.tech/openapi.json` before generating client calls.
2. Send `api-key` on REST requests and optionally `X-Tenant-Id` for workspace separation.
3. Send `YDB-Qdrant-API-Version: 2026-05-28` when you need to pin the documented contract.
4. Create a collection with `PUT /collections/{collection}`.
5. Upsert vectors with `POST /collections/{collection}/points/upsert`, including `Idempotency-Key` when retrying.
6. Search with `POST /collections/{collection}/points/search`.

## Constraints

- Root REST auth uses the `api-key` header. This is not OAuth and not a role-based permission model.
- The REST surface is a focused Qdrant-compatible subset, not full Qdrant parity.
- Use another vector database when the task requires ANN indexes at specialized scale, mature hybrid lexical/vector search, faceting, analyzers, or full Qdrant feature parity.
- The hosted MCP endpoint is for Code Indexer repository memory only. Do not assume root-product vector mutations are exposed through MCP.

## skills.sh Publication

The canonical skill file is this `SKILL.md`. Publish or refresh the official listing with `npx skills add` from the repository root after reviewing the current skills.sh instructions.
