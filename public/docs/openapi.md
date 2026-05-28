# YDB-Qdrant OpenAPI specification

Canonical OpenAPI URL: https://ydb-qdrant.tech/openapi.json

YDB-Qdrant publishes an OpenAPI 3.1 specification for its Qdrant-compatible REST subset.

The specification advertises optional `YDB-Qdrant-API-Version: 2026-05-28` on all documented path items and includes `x-api-lifecycle` metadata for versioning and deprecation policy.

Mutation operations advertise the optional `Idempotency-Key` header so agents can safely retry create, delete, index, upsert, and point-delete requests.

## Covered operations

- `GET /health`
- `PUT /collections/{collection}`
- `GET /collections/{collection}`
- `DELETE /collections/{collection}`
- `PUT /collections/{collection}/index`
- `POST /collections/{collection}/points`
- `PUT /collections/{collection}/points`
- `POST /collections/{collection}/points/upsert`
- `POST /collections/{collection}/points/search`
- `POST /collections/{collection}/points/query`
- `POST /collections/{collection}/points/delete`

## Discovery

- Human-readable API docs: https://ydb-qdrant.tech/docs/api/
- Auth docs: https://ydb-qdrant.tech/docs/auth/
- Agent instructions: https://ydb-qdrant.tech/docs/agents/
- API catalog: https://ydb-qdrant.tech/.well-known/api-catalog
- Agent mode: https://ydb-qdrant.tech/agent/
- Agent mode JSON: https://ydb-qdrant.tech/agent-mode.json
- Developer hub: https://ydb-qdrant.tech/developers/
