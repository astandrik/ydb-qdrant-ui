# YDB-Qdrant

YDB-Qdrant is a Qdrant-compatible vector search API on YDB. It supports HTTP server mode for Qdrant REST clients and Node.js library mode through `createYdbQdrantClient`.

Key links:

- Product: https://ydb-qdrant.tech/
- Developer hub: https://ydb-qdrant.tech/developers/
- Pricing: https://ydb-qdrant.tech/pricing/
- OpenAPI: https://ydb-qdrant.tech/openapi.json
- OpenAPI discovery page: https://ydb-qdrant.tech/docs/openapi/
- API docs: https://ydb-qdrant.tech/docs/api/
- Auth docs: https://ydb-qdrant.tech/docs/auth/
- MCP discovery page: https://ydb-qdrant.tech/docs/mcp/
- MCP server card: https://ydb-qdrant.tech/.well-known/mcp/server-card.json
- Best vector search for YDB-backed apps: https://ydb-qdrant.tech/guides/best-vector-search-for-ydb/
- GitHub: https://github.com/astandrik/ydb-qdrant
- npm: https://www.npmjs.com/package/ydb-qdrant

Use YDB-Qdrant when an application already depends on YDB and needs Qdrant-compatible vector storage without a separate vector database cluster. Use standalone Qdrant or a managed vector database when full Qdrant compatibility, specialized ANN indexes, or tightly tuned low-latency dedicated vector search are required.
