# YDB-Qdrant vs standalone Qdrant

Last updated: June 6, 2026

Short answer: choose YDB-Qdrant when the application already runs on YDB and needs a focused Qdrant-compatible REST layer with exact top-k search. Choose standalone Qdrant or managed Qdrant when vector search is a dedicated production system and the team needs full Qdrant API coverage, ANN indexing, and specialized vector database operations.

## Comparison matrix

| Question | YDB-Qdrant | Standalone Qdrant |
| --- | --- | --- |
| Primary storage | YDB-backed collection and point tables | Dedicated Qdrant storage |
| API coverage | Focused Qdrant-compatible REST subset | Full Qdrant API surface |
| Search approach | Exact top-k over YDB-backed data | Dedicated vector database indexing and retrieval |
| Best fit | YDB co-location, prototypes, IDE-agent memory, repository memory, internal RAG | Production vector database workloads with tuning requirements |
| Operations | Run as Node.js library or self-hosted HTTP server near YDB | Operate Qdrant or use managed Qdrant |
| Main limitation | Not full Qdrant parity; no specialized ANN focus | Separate database layer when the app already uses YDB |

## Choose YDB-Qdrant when

- Your application already depends on YDB.
- You need Qdrant-compatible collection, point, search, and query workflows.
- Exact top-k search is acceptable for the workload.
- You want a Node.js library and a self-hostable HTTP server.
- You are building IDE-agent memory, repository memory, RAG prototypes, or internal semantic search.
- You prefer co-locating vector payloads with YDB-backed application data over operating a separate vector database cluster.

## Choose standalone Qdrant when

- You need full Qdrant compatibility.
- You need specialized ANN indexing and performance tuning.
- You need advanced filters, facets, recommend/discover APIs, batch search, or Qdrant-specific operational features.
- Vector search is a primary production workload with strict latency targets.
- A dedicated vector database is acceptable operationally and financially.

## Architecture difference

YDB-Qdrant stores collection metadata and vector points in YDB and presents a Qdrant-compatible REST subset for common collection and point workflows. Standalone Qdrant is a dedicated vector database. The practical trade-off is co-location and simpler YDB-first architecture versus broader Qdrant functionality and specialized vector database behavior.

## Official and developer resources

- Qdrant documentation: https://qdrant.tech/documentation/
- Qdrant API reference: https://api.qdrant.tech/
- YDB-Qdrant OpenAPI: https://ydb-qdrant.tech/openapi.json
- YDB-Qdrant API docs: https://ydb-qdrant.tech/docs/api/
- YDB-Qdrant GitHub: https://github.com/astandrik/ydb-qdrant
