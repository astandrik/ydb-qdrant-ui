# YDB-Qdrant auth and scoped access

REST API auth uses the `api-key` request header. The key is not an account password; it is a stable namespace key. Use different keys for different apps, environments, workspaces, or agents.

Optional `X-Tenant-Id` creates a tenant suffix under the same key. This is useful for isolating workspaces while using one integration key.

The REST permission model is namespace-based:

- Read operations search and retrieve data inside the namespace.
- Write operations create/delete collections and upsert/delete points inside the namespace.

The current REST server does not enforce OAuth scopes or per-operation roles inside one key.

Agent auth discovery metadata:

- OAuth protected resource metadata: https://ydb-qdrant.tech/.well-known/oauth-protected-resource
- OAuth authorization server metadata: https://ydb-qdrant.tech/.well-known/oauth-authorization-server

These metadata files document the current auth surfaces for AI agents. They describe REST `api-key` namespace access and Code Indexer bearer-token access, but they intentionally omit `scopes_supported` because the REST backend does not enforce OAuth scopes. They do not advertise unsupported `/agent/auth` registration endpoints.

Code Indexer auth is separate. Users install the GitHub App, sign in through GitHub OAuth, then create MCP tokens in the dashboard. MCP tokens are bearer tokens for read-only repository memory tools and are scoped by the repositories selected in the GitHub App installation.
