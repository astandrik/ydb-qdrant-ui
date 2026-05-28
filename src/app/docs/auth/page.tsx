import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant Auth and Scoped Access",
  description:
    "Authentication and scoped access model for YDB-Qdrant REST API keys and Code Indexer MCP bearer tokens.",
  alternates: {
    canonical: "/docs/auth/",
  },
};

export default function AuthDocsPage() {
  return (
    <AgentResourcePage
      eyebrow="Auth"
      title="YDB-Qdrant auth and scoped access"
      lead={
        <p>
          YDB-Qdrant uses namespace-oriented REST API keys for vector data and a
          separate bearer-token model for hosted Code Indexer MCP repository
          memory.
        </p>
      }
      actions={[
        {
          href: "/auth.md",
          label: "Markdown auth",
          view: "action",
        },
        {
          href: "/openapi.json",
          label: "OpenAPI security schemes",
        },
        {
          href: "/.well-known/oauth-protected-resource",
          label: "Protected resource metadata",
        },
      ]}
      sections={[
        {
          title: "REST API key namespace",
          body: (
            <>
              <p>
                Send <code>api-key</code> on REST requests. The server derives
                a stable namespace from the key, then stores collection metadata
                and points under that namespace.
              </p>
              <pre>{`api-key: my-stable-namespace-key`}</pre>
            </>
          ),
          items: [
            "Use separate keys for separate apps, environments, workspaces, or agents.",
            "The key is the namespace boundary for collection and point operations.",
            "Anonymous fallback can depend on request metadata and is not recommended for stable agent workflows.",
          ],
        },
        {
          title: "Version and retry headers",
          body: (
            <pre>{`YDB-Qdrant-API-Version: 2026-05-28
Idempotency-Key: stable-mutation-key`}</pre>
          ),
          items: [
            "YDB-Qdrant-API-Version is optional and pins the current documented REST API contract.",
            "Idempotency-Key is optional and should be reused when retrying the same intended mutation.",
            "Neither header grants access; authorization still comes from api-key for REST and bearer tokens for Code Indexer MCP.",
          ],
        },
        {
          title: "Optional tenant suffix",
          body: (
            <>
              <p>
                Send <code>X-Tenant-Id</code> when one integration key needs
                separate tenant or workspace namespaces.
              </p>
              <pre>{`X-Tenant-Id: workspace-42`}</pre>
            </>
          ),
          items: [
            "Tenant values are normalized for storage.",
            "The default tenant is used when the header is omitted.",
            "This is not OAuth and not a role-based permission system.",
          ],
        },
        {
          title: "Practical REST access model",
          items: [
            <span key="read">
              Read operations cover collection metadata, point retrieval,
              search, and query within the namespace.
            </span>,
            <span key="write">
              Write operations cover collection create/delete, point
              upsert/delete, and compatibility index calls within the namespace.
            </span>,
            "The current REST server does not enforce OAuth scopes or per-operation grants inside one api-key.",
          ],
        },
        {
          title: "Agent auth discovery metadata",
          body: (
            <>
              <p>
                Agents can discover the current auth contract through OAuth
                protected-resource metadata. This file documents the existing
                REST <code>api-key</code> namespace model. It intentionally
                omits <code>authorization_servers</code> and{" "}
                <code>scopes_supported</code> because the REST backend does not
                accept OAuth access tokens or enforce OAuth scopes.
              </p>
              <pre>{`/.well-known/oauth-protected-resource`}</pre>
            </>
          ),
          items: [
            <a
              href="/.well-known/oauth-protected-resource"
              key="oauth-protected-resource"
            >
              OAuth protected resource metadata
            </a>,
            "Root REST calls still send api-key rather than OAuth bearer access tokens.",
          ],
        },
        {
          title: "Code Indexer MCP tokens",
          body: (
            <>
              <p>
                Code Indexer auth is separate from REST API keys. Users install
                the GitHub App, sign in through GitHub OAuth, and create MCP
                tokens in the dashboard.
              </p>
              <pre>{`Authorization: Bearer <mcp-token>`}</pre>
            </>
          ),
          items: [
            "MCP tokens are shown once, stored as hashes, and revocable.",
            "Hosted MCP tools are read-only repository memory tools.",
            "Repository scope follows the GitHub App installation selection and linked user.",
          ],
        },
      ]}
    />
  );
}
