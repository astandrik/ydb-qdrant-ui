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

Optional `YDB-Qdrant-API-Version` pins the documented REST contract:

```http
YDB-Qdrant-API-Version: 2026-05-28
```

Use `Idempotency-Key` when retrying the same intended mutation:

```http
Idempotency-Key: stable-mutation-key
```

## Practical REST access model

- Read operations cover collection metadata, point retrieval, search, and query within the namespace.
- Write operations cover collection create/delete, point upsert/delete, and compatibility index calls within the namespace.

Current REST deployment treats the `api-key` as the namespace boundary. It does not enforce OAuth scopes or per-operation role grants inside one key.

## Agent auth discovery metadata

Agents can discover the current REST auth contract through:

- `https://ydb-qdrant.tech/.well-known/oauth-protected-resource`

This file describes the existing REST `api-key` namespace model. It intentionally omits `authorization_servers` and `scopes_supported` because the REST backend does not accept OAuth access tokens or enforce OAuth scopes. It does not advertise WorkOS-style `agent_auth.register_uri` endpoints because `/agent/auth` runtime registration is not implemented.

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
