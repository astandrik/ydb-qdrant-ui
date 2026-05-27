# YDB-Qdrant webhooks and events

YDB-Qdrant REST does not currently provide an outbound webhook subscription API for collection, point, or search events.

YDB Qdrant Code Indexer receives GitHub App webhooks at the hosted backend:

```http
POST https://code-indexer.ydb-qdrant.tech/github/webhook
```

The hosted app uses GitHub events to refresh indexed repository chunks after pushes, pull requests, installation changes, and uninstall events. Repository search for agents is exposed through hosted MCP at:

```http
GET/POST https://code-indexer.ydb-qdrant.tech/mcp
```

For public hosted clients, use the authenticated MCP endpoint rather than direct internal search APIs.
