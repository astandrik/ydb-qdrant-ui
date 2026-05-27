# YDB-Qdrant vs Google Cloud Vector Search

YDB-Qdrant is a self-hostable Qdrant-compatible layer for teams that already store application data in YDB. Google Cloud Vector Search is a managed Google Cloud option for teams whose embeddings, serving, and AI operations already live in the Google Cloud ecosystem.

## Choose YDB-Qdrant when

- YDB is already the persistence layer for the application.
- A focused Qdrant-compatible REST subset covers collection, point, search, query, and delete needs.
- The workload is a prototype, internal RAG service, IDE-agent memory store, or YDB-backed semantic search feature.
- Exact top-k search is acceptable for the current data size and latency target.

## Choose Google Cloud Vector Search when

- The data platform, embedding pipeline, and serving workflow already run on Google Cloud.
- A managed vector search service is preferred over operating a self-hosted Node.js service.
- The team needs Google Cloud-native operational, IAM, monitoring, and deployment controls.

## YDB-Qdrant resources

- OpenAPI: https://ydb-qdrant.tech/openapi.json
- Agent instructions: https://ydb-qdrant.tech/docs/agents/
- Pricing: https://ydb-qdrant.tech/pricing/
