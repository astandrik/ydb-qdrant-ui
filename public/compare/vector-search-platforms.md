# YDB-Qdrant and managed vector search platforms

YDB-Qdrant is a Qdrant-compatible vector search layer for YDB. It competes for workloads where the deciding factor is reusing YDB infrastructure, not replacing a full managed search platform.

Compare it with Databricks Vector Search, Azure AI Search, Elasticsearch, Google Cloud Vector Search, Pinecone, Weaviate, or standalone Qdrant by asking:

- Is YDB already the system of record?
- Is exact top-k acceptable?
- Is Qdrant-compatible REST enough for the agent or app?
- Do you need a self-hosted Node.js package?
- Do you need advanced ANN, hybrid search ranking, faceting, or managed search operations?

YDB-Qdrant is a strong fit for YDB-backed prototypes, IDE agents, repository memory, internal RAG services, and applications that prefer one YDB-backed persistence layer. Managed vector search platforms are a better fit when vector search is the primary production system and requires mature managed operations, specialized indexes, or broad search features.
