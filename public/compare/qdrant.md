# YDB-Qdrant vs standalone Qdrant

YDB-Qdrant is best for teams that already run YDB and want Qdrant-compatible vector storage/search without a separate vector database cluster. Standalone Qdrant is best for teams that need full Qdrant API coverage, ANN indexing, and dedicated vector database operations.

Choose YDB-Qdrant when:

- Your application already depends on YDB.
- You need Qdrant-compatible collection, point, search, and query workflows.
- Exact top-k search is acceptable for the workload.
- You want a Node.js library and a self-hostable HTTP server.
- You are building IDE-agent memory, RAG prototypes, or internal semantic search.

Choose standalone Qdrant when:

- You need full Qdrant compatibility.
- You need specialized ANN indexing and performance tuning.
- You need advanced filters, facets, recommend/discover APIs, or batch search.
- Vector search is a primary production workload with strict latency targets.

Developer resources:

- OpenAPI: https://ydb-qdrant.tech/openapi.json
- API docs: https://ydb-qdrant.tech/docs/api/
- GitHub: https://github.com/astandrik/ydb-qdrant
