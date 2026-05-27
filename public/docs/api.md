# YDB-Qdrant REST API reference

OpenAPI: https://ydb-qdrant.tech/openapi.json

Base URLs:

- `https://ydb-qdrant.tech` for public HTTPS API routes such as `/health` and `/collections/...`; `/` serves the static site.
- `http://ydb-qdrant.tech:8080`
- `http://localhost:8080`

Headers:

- `Content-Type: application/json` for write/search requests.
- `api-key: <stable-key>` for namespace isolation.
- Optional `X-Tenant-Id: <tenant>` for tenant suffixing.

Endpoints:

- `GET /`: service identity on self-hosted servers; the public HTTPS root serves the static site.
- `GET /health`: readiness check.
- `PUT /collections/{collection}`: create collection.
- `GET /collections/{collection}`: collection metadata.
- `DELETE /collections/{collection}`: delete collection.
- `PUT /collections/{collection}/index`: Qdrant compatibility no-op for index creation.
- `POST /collections/{collection}/points`: retrieve points by ids.
- `PUT /collections/{collection}/points`: upsert points.
- `POST /collections/{collection}/points/upsert`: upsert points.
- `POST /collections/{collection}/points/search`: exact top-k vector search.
- `POST /collections/{collection}/points/query`: Qdrant query compatibility search.
- `POST /collections/{collection}/points/delete`: delete by ids, empty filter, or supported `pathSegments.N` filters.

Response envelopes use Qdrant-style `{ "status": "ok", "result": ..., "time": number, "usage": null }`.

Error responses use JSON, not HTML:

```json
{
  "status": "error",
  "error": "collection not found",
  "code": "COLLECTION_NOT_FOUND",
  "message": "collection not found",
  "resolution": "Create the collection first, or check the collection name, api-key, and X-Tenant-Id namespace.",
  "request_id": "req-123"
}
```

The `error` field remains a string for Qdrant-compatible clients. Agents should use `code`, `message`, `resolution`, and `request_id` for recovery and support workflows. Validation errors may include a `details` object with `fieldErrors` and `formErrors`.
