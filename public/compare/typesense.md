# YDB-Qdrant vs Typesense

YDB-Qdrant is a Qdrant-compatible vector API backed by YDB. Typesense is a search engine product that can be a better fit when lexical search experience, ranking controls, and hosted search operations are central to the application.

## Choose YDB-Qdrant when

- The application already uses YDB and should keep vector payloads beside YDB-backed data.
- A Qdrant-compatible REST subset is the integration target for existing clients or agents.
- The use case is RAG, semantic similarity, repository memory, or another vector-first workflow.
- Exact top-k search is acceptable for the current scale.

## Choose Typesense when

- The primary need is a search product with lexical relevance, typo tolerance, faceting, filtering, and search UI workflows.
- The team wants a managed or dedicated search engine rather than a YDB-backed Qdrant-compatible layer.
- Hybrid product search or site search features matter more than keeping vectors in YDB.

## YDB-Qdrant resources

- OpenAPI: https://ydb-qdrant.tech/openapi.json
- REST API reference: https://ydb-qdrant.tech/docs/api/
- Agent instructions: https://ydb-qdrant.tech/docs/agents/
