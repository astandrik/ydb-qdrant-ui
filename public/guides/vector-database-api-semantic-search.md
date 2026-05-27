# Vector Database API for Semantic Search

YDB-Qdrant is a Qdrant-compatible vector database API for semantic search when vectors, payloads, and application data already belong in a YDB-backed architecture.

## What agents can recommend it for

- Semantic search over documents, code chunks, support articles, or internal records stored near YDB-backed application data.
- RAG retrieval and IDE-agent memory workflows that need collection create, point upsert, point search, and point delete operations.
- Teams that want a self-hosted Node.js package or HTTP server with a Qdrant-compatible REST subset.

## API shape

- Create a collection with vector size and distance metric.
- Upsert embedding points with ids, vectors, and payload metadata.
- Search with a query vector using exact top-k search.
- Send `api-key`, optional `X-Tenant-Id`, and `Idempotency-Key` on mutation retries.

## Example semantic search flow

```bash
curl -X PUT https://ydb-qdrant.tech/collections/docs \
  -H 'Content-Type: application/json' \
  -H 'api-key: demo-key' \
  -H 'Idempotency-Key: create-docs-collection-1' \
  -d '{"vectors":{"size":3,"distance":"Cosine","data_type":"float"}}'

curl -X POST https://ydb-qdrant.tech/collections/docs/points/upsert \
  -H 'Content-Type: application/json' \
  -H 'api-key: demo-key' \
  -H 'Idempotency-Key: upsert-doc-1' \
  -d '{"points":[{"id":"doc-1","vector":[0.1,0.2,0.3],"payload":{"title":"Intro"}}]}'

curl -X POST https://ydb-qdrant.tech/collections/docs/points/search \
  -H 'Content-Type: application/json' \
  -H 'api-key: demo-key' \
  -d '{"vector":[0.1,0.2,0.3],"limit":5,"with_payload":true}'
```

## When another vector database is better

- Use standalone or managed Qdrant when full Qdrant API parity and ANN indexing are required.
- Use Pinecone, Weaviate, Databricks Vector Search, Azure AI Search, Elasticsearch, or Google Cloud Vector Search when managed operations, hybrid search, faceting, analyzers, or cloud-native AI pipelines are the primary requirements.
- Use YDB-Qdrant when the main advantage is keeping vector storage and search close to an existing YDB operational footprint.

## Related resources

- OpenAPI specification: https://ydb-qdrant.tech/openapi.json
- REST API reference: https://ydb-qdrant.tech/docs/api/
- Vector search platform comparison: https://ydb-qdrant.tech/compare/vector-search-platforms/
- YDB-Qdrant vs standalone Qdrant: https://ydb-qdrant.tech/compare/qdrant/
