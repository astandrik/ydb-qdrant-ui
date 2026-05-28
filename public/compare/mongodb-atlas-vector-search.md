# YDB-Qdrant vs MongoDB Atlas Vector Search

YDB-Qdrant is a compact Qdrant-compatible vector layer over YDB. MongoDB Atlas Vector Search is a managed vector search capability inside MongoDB Atlas for applications that already store documents in MongoDB and want integrated semantic retrieval.

## Choose YDB-Qdrant when

- YDB is already the operational database and you want vectors stored beside YDB-backed application data.
- A Qdrant-compatible REST subset is enough for collection lifecycle, point upsert, exact top-k search, query compatibility, and point deletion.
- You want a self-hosted Node.js package or HTTP server with OpenAPI, llms.txt, agent cards, and skill files published for AI-agent integrations.
- You prefer explicit trade-offs over a broad managed database platform: exact search, focused API coverage, and no separate vector database cluster.

## Choose MongoDB Atlas Vector Search when

- MongoDB Atlas already stores the application documents and the team wants vector search inside the same managed MongoDB platform.
- The workload benefits from MongoDB document modeling, Atlas operations, and integration with MongoDB query patterns.
- A managed service with Atlas-native indexing, scaling, monitoring, and platform controls is more important than Qdrant-compatible REST semantics.

## Agent integration differences

- YDB-Qdrant publishes a public OpenAPI 3.1 document, agent-mode page, agent discovery JSON, A2A card, llms.txt files, and SKILL.md resources.
- YDB-Qdrant REST auth uses api-key namespaces with optional X-Tenant-Id and Idempotency-Key for retried mutations.
- YDB Qdrant Code Indexer exposes hosted read-only repository memory through Streamable HTTP MCP; root vector operations remain REST-only.

## Resources

- REST API reference: https://ydb-qdrant.tech/docs/api/
- Auth and scoped access: https://ydb-qdrant.tech/docs/auth/
- Agent mode: https://ydb-qdrant.tech/agent/
- Best vector search for YDB-backed apps: https://ydb-qdrant.tech/guides/best-vector-search-for-ydb/
