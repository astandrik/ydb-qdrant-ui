# YDB-Qdrant vs Elasticsearch

YDB-Qdrant is a compact Qdrant-compatible vector layer over YDB. Elasticsearch is a broad search and analytics engine with mature lexical, vector, hybrid, and operational search features.

## Choose YDB-Qdrant when

- YDB is already where application data lives.
- You want Qdrant-compatible vector operations without running a full search cluster.
- Exact top-k behavior and the documented REST subset match the workload.
- Operational simplicity matters more than advanced search features.

## Choose Elasticsearch when

- Search is a primary application surface with lexical, vector, and hybrid relevance needs.
- You need mature faceting, aggregations, analyzers, index management, and search observability.
- You are operating a dedicated search cluster or managed Elastic deployment.

## Resources

- YDB-Qdrant pricing: https://ydb-qdrant.tech/pricing/
- REST API reference: https://ydb-qdrant.tech/docs/api/
- Semantic search on YDB guide: https://ydb-qdrant.tech/guides/semantic-search-ydb/
