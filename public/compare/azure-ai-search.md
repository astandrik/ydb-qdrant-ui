# YDB-Qdrant vs Azure AI Search

YDB-Qdrant keeps vector storage close to YDB and exposes a focused Qdrant-compatible API. Azure AI Search is a managed search platform for applications that need Azure-native indexing, ranking, and search operations.

## Choose YDB-Qdrant when

- The application already depends on YDB and should avoid another database cluster.
- You need Qdrant-compatible vector collection and point operations.
- You prefer an open-source package and self-hosted deployment path.
- The workload is an internal RAG service, IDE-agent memory, prototype, or small-to-medium collection.

## Choose Azure AI Search when

- You need a fully managed Azure search service.
- Lexical search, vector search, hybrid ranking, indexers, and relevance tooling are central requirements.
- Your data sources, identity, networking, and operations are already Azure-centered.

## Resources

- YDB-Qdrant OpenAPI page: https://ydb-qdrant.tech/docs/openapi/
- Auth docs: https://ydb-qdrant.tech/docs/auth/
- Full AI-readable index: https://ydb-qdrant.tech/llms-full.txt
