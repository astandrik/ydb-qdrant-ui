# About YDB-Qdrant

YDB-Qdrant is a focused open-source project for developers who already use YDB and want Qdrant-compatible vector storage, exact top-k search, and agent-readable API documentation without operating a separate vector database cluster.

## Project scope

The root product exposes a Qdrant-compatible REST subset and a Node.js library. It covers collection lifecycle, point upsert, retrieval, search, query compatibility, and point deletion. It does not claim full Qdrant parity, hosted root-product MCP vector mutation tools, OAuth scopes, or role-based REST permissions.

## Maintainer and source

The public source repository is maintained by Alexander Standrik and published at https://github.com/astandrik/ydb-qdrant. The package is available on npm as `ydb-qdrant`. The website publishes OpenAPI, llms.txt, agent cards, skill files, auth documentation, pricing notes, and comparison guides so humans and AI agents can inspect the current capabilities directly.

## Hosted Code Indexer

YDB Qdrant Code Indexer is the hosted companion app. It indexes selected GitHub repositories into YDB-backed vector storage and exposes read-only repository memory through Streamable HTTP MCP at `https://code-indexer.ydb-qdrant.tech/mcp`.

## Trust resources

- Privacy: https://ydb-qdrant.tech/privacy/
- Contact: https://ydb-qdrant.tech/contact/
- Developer resources: https://ydb-qdrant.tech/developers/
- OpenAPI: https://ydb-qdrant.tech/openapi.json
- Agent discovery: https://ydb-qdrant.tech/.well-known/agent.json
