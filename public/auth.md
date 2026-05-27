# YDB-Qdrant auth and scoped access

## REST API

YDB-Qdrant REST calls use the `api-key` header as a stable namespace key:

```http
api-key: my-stable-namespace-key
```

The backend derives a namespace from the key and stores collection metadata and points under that namespace. Use a distinct key per app, environment, workspace, or agent when you need separate data.

Optional `X-Tenant-Id` adds a tenant suffix inside the same api-key namespace:

```http
X-Tenant-Id: workspace-42
```

This is useful when one integration key must isolate multiple workspaces. It is not OAuth and it is not a role-based permission system.

## Practical REST permission model

- `namespace:read`: collection metadata, point retrieval, search, and query within the namespace.
- `namespace:write`: collection create/delete, point upsert/delete, and compatibility index calls within the namespace.

Current REST deployment treats the `api-key` as the namespace boundary. It does not enforce per-operation role grants inside one key.

## Code Indexer MCP

Code Indexer uses GitHub OAuth and a GitHub App installation to determine repository access. MCP tokens are created in the dashboard, shown once, stored as hashes, and revocable.

Use the hosted MCP endpoint with:

```http
Authorization: Bearer <mcp-token>
```

The token can call read-only MCP tools for repositories visible through the linked GitHub App installation:

- `list_repositories`
- `list_repository_indexes`
- `search_code`

Revoking a token stops future hosted MCP searches with that token.
