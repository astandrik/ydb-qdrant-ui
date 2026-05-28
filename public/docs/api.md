# YDB-Qdrant REST API reference

OpenAPI: https://ydb-qdrant.tech/openapi.json

Base URLs:

- `https://ydb-qdrant.tech` for public HTTPS API routes such as `/health` and `/collections/...`; `/` serves the static site.
- `http://ydb-qdrant.tech:8080` for the HTTP-only public demo endpoint; use it only with non-sensitive demo credentials
- `http://localhost:8080`

Headers:

- `Content-Type: application/json` for write/search requests.
- `api-key: <stable-key>` for namespace isolation.
- Optional `X-Tenant-Id: <tenant>` for tenant suffixing.
- Optional `YDB-Qdrant-API-Version: 2026-05-28` for pinning the documented REST contract.
- Optional `Idempotency-Key: <stable-mutation-key>` for retrying create, delete, index, upsert, and point-delete mutation requests.

## API versioning and deprecation policy

YDB-Qdrant uses header-based API versioning instead of a `/v1` URL prefix. The current documented value is `2026-05-28`.

Backward-incompatible public REST API changes will be documented in OpenAPI and docs with at least 90 days of notice when the hosted API is affected. Deprecated fields or endpoints remain documented during the notice window with migration guidance. Do not probe `/v1` routes for version discovery; they are not published as the current contract.

Endpoints:

- `GET /`: service identity on self-hosted servers; the public HTTPS root serves the static site.
- `GET /health`: readiness check.
- `PUT /collections/{collection}`: create collection. Supports `Idempotency-Key`.
- `GET /collections/{collection}`: collection metadata.
- `DELETE /collections/{collection}`: delete collection. Supports `Idempotency-Key`.
- `PUT /collections/{collection}/index`: Qdrant compatibility no-op for index creation. Supports `Idempotency-Key`.
- `POST /collections/{collection}/points`: retrieve points by ids.
- `PUT /collections/{collection}/points`: upsert points. Supports `Idempotency-Key`.
- `POST /collections/{collection}/points/upsert`: upsert points. Supports `Idempotency-Key`.
- `POST /collections/{collection}/points/search`: exact top-k vector search.
- `POST /collections/{collection}/points/query`: Qdrant query compatibility search.
- `POST /collections/{collection}/points/delete`: delete by ids, empty filter, or supported `pathSegments.N` filters. Supports `Idempotency-Key`.

Response envelopes use Qdrant-style `{ "status": "ok", "result": ..., "time": number, "usage": null }`.

Error responses use JSON, not HTML:

```json
{
  "status": "error",
  "error": "collection not found",
  "code": "COLLECTION_NOT_FOUND",
  "message": "collection not found",
  "resolution": "Create the collection first, or check the collection name, api-key, and X-Tenant-Id namespace.",
  "request_id": "req-123",
  "details": {
    "collection": "documents"
  }
}
```

The `error` field remains a string for Qdrant-compatible clients. Agents should use `code`, `message`, `resolution`, `request_id`, and optional `details` for recovery and support workflows.

Error probes:

```bash
curl -i https://ydb-qdrant.tech/collections/__missing_probe \
  -H 'api-key: demo-key'

curl -i -X POST https://ydb-qdrant.tech/collections/__bad_json/points/upsert \
  -H 'Content-Type: application/json' \
  -H 'api-key: demo-key' \
  --data '{bad json'
```

- Missing collections return `COLLECTION_NOT_FOUND`.
- Invalid JSON returns `VALIDATION_ERROR`.
- Use the documented OpenAPI paths for agent probes.
