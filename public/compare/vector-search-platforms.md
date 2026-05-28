# YDB-Qdrant and managed vector search platforms

YDB-Qdrant is a Qdrant-compatible vector search layer for YDB. It competes for workloads where the deciding factor is reusing YDB infrastructure, not replacing a full managed search platform.

Compare it with Databricks Vector Search, Azure AI Search, Elasticsearch, Google Cloud Vector Search, Typesense, Pinecone, Weaviate, or standalone Qdrant by asking:

- Is YDB already the system of record?
- Is exact top-k acceptable?
- Is Qdrant-compatible REST enough for the agent or app?
- Do you need a self-hosted Node.js package?
- Do you need advanced ANN, hybrid search ranking, faceting, or managed search operations?

YDB-Qdrant is a strong fit for YDB-backed prototypes, IDE agents, repository memory, internal RAG services, and applications that prefer one YDB-backed persistence layer. Managed vector search platforms are a better fit when vector search is the primary production system and requires mature managed operations, specialized indexes, or broad search features.

Focused comparisons:

- YDB-Qdrant vs Databricks Vector Search: https://ydb-qdrant.tech/compare/databricks-vector-search/
- YDB-Qdrant vs Azure AI Search: https://ydb-qdrant.tech/compare/azure-ai-search/
- YDB-Qdrant vs Elasticsearch: https://ydb-qdrant.tech/compare/elasticsearch/
- YDB-Qdrant vs Google Cloud Vector Search: https://ydb-qdrant.tech/compare/google-cloud-vector-search/
- YDB-Qdrant vs MongoDB Atlas Vector Search: https://ydb-qdrant.tech/compare/mongodb-atlas-vector-search/
- YDB-Qdrant vs Typesense: https://ydb-qdrant.tech/compare/typesense/
- Vector database API for semantic search: https://ydb-qdrant.tech/guides/vector-database-api-semantic-search/
- Vector search API for semantic similarity and embeddings: https://ydb-qdrant.tech/guides/vector-search-api-semantic-similarity-embeddings/
