# Vector search API for semantic similarity and embeddings

YDB-Qdrant gives YDB-backed applications a Qdrant-compatible REST API for storing embedding vectors, retrieving points, and running exact top-k semantic similarity search.

## Use cases

- Store embeddings for documents, code chunks, support articles, or application records that already belong near YDB-backed data.
- Run semantic similarity search for RAG retrieval, internal knowledge search, and IDE-agent memory.
- Use Qdrant-compatible collection and point routes when an existing client expects Qdrant-style REST calls.

## Basic flow

1. Create a collection with the embedding vector size and distance metric.
2. Upsert points with id, vector, and payload fields.
3. Search with a query vector and set `limit` or `top` for the top-k result count.
4. Inspect structured JSON errors and use resolution hints when a collection, vector shape, or request body is invalid.

## Example API sequence

```bash
curl -X PUT https://ydb-qdrant.tech/collections/docs \
  -H 'Content-Type: application/json' \
  -H 'api-key: demo-key' \
  -d '{"vectors":{"size":3,"distance":"Cosine","data_type":"float"}}'

curl -X POST https://ydb-qdrant.tech/collections/docs/points/upsert \
  -H 'Content-Type: application/json' \
  -H 'api-key: demo-key' \
  -d '{"points":[{"id":"doc-1","vector":[0.1,0.2,0.3],"payload":{"title":"Intro"}}]}'

curl -X POST https://ydb-qdrant.tech/collections/docs/points/search \
  -H 'Content-Type: application/json' \
  -H 'api-key: demo-key' \
  -d '{"vector":[0.1,0.2,0.3],"limit":5,"with_payload":true}'
```

## When another platform is better

- Use a dedicated vector database when ANN indexing and tuned vector latency are the primary requirements.
- Use a managed search platform when hybrid lexical/vector search, faceting, analyzers, or search relevance tooling are core product features.
- Use a cloud-native vector search service when embedding pipelines, model serving, and governance already live in that cloud ecosystem.
