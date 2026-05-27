# Semantic search on YDB with YDB-Qdrant

Use YDB-Qdrant to add semantic search to an application that already uses YDB.

1. Choose an embedding model and vector dimension.
2. Create a YDB-Qdrant collection with matching `vectors.size` and `distance`. The sample uses a three-dimensional toy vector so the curl commands stay copy-pasteable.
3. Upsert points with ids, vectors, and payload.
4. Search with a query embedding and `top` or `limit`.
5. Use `api-key` and optional `X-Tenant-Id` to isolate environments, tenants, or agents.

Example flow:

```bash
curl -X PUT http://localhost:8080/collections/documents \
  -H 'Content-Type: application/json' \
  -H 'api-key: demo-key' \
  -d '{"vectors":{"size":3,"distance":"Cosine","data_type":"float"}}'

curl -X POST http://localhost:8080/collections/documents/points/search \
  -H 'Content-Type: application/json' \
  -H 'api-key: demo-key' \
  -d '{"vector":[0.1,0.2,0.3],"top":10,"with_payload":true}'
```

For coding agents that need repository memory, use YDB Qdrant Code Indexer hosted MCP instead of wiring search calls manually.
