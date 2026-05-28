import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant OpenAPI Specification",
  description:
    "Named OpenAPI discovery page for the YDB-Qdrant Qdrant-compatible REST API.",
  alternates: {
    canonical: "/docs/openapi/",
  },
};

export default function OpenApiDocsPage() {
  return (
    <AgentResourcePage
      eyebrow="OpenAPI"
      title="YDB-Qdrant OpenAPI specification"
      lead={
        <p>
          The canonical machine-readable OpenAPI 3.1 document for YDB-Qdrant is
          published at a predictable URL for API clients, search engines, and AI
          agents.
        </p>
      }
      actions={[
        {
          href: "/openapi.json",
          label: "Open openapi.json",
          view: "action",
        },
        {
          href: "/docs/api/",
          label: "REST API docs",
        },
        {
          href: "/docs/auth/",
          label: "Auth docs",
        },
        {
          href: "/docs/agents/",
          label: "Agent instructions",
        },
      ]}
      sections={[
        {
          title: "Canonical URLs",
          items: [
            <a href="/openapi.json" key="openapi">
              https://ydb-qdrant.tech/openapi.json
            </a>,
            <a href="/agent/" key="agent-mode">
              https://ydb-qdrant.tech/agent/
            </a>,
            <a href="/agent-mode.json" key="agent-mode-json">
              https://ydb-qdrant.tech/agent-mode.json
            </a>,
            <a href="/.well-known/api-catalog" key="catalog">
              https://ydb-qdrant.tech/.well-known/api-catalog
            </a>,
            <a href="/developers/" key="developers">
              https://ydb-qdrant.tech/developers/
            </a>,
            <a href="/docs/agents/" key="agent-instructions">
              https://ydb-qdrant.tech/docs/agents/
            </a>,
          ],
        },
        {
          title: "What the spec covers",
          items: [
            "Service identity and health endpoints.",
            "Collection create, get, delete, and payload-index compatibility calls.",
            "Point retrieve, upsert, search, query, and delete endpoints.",
            "api-key header auth, optional X-Tenant-Id namespacing, optional YDB-Qdrant-API-Version, optional Idempotency-Key for mutations, and structured JSON errors.",
          ],
        },
        {
          title: "API lifecycle",
          body: (
            <p>
              The OpenAPI document includes <code>x-api-lifecycle</code> with
              the current version <code>2026-05-28</code>, a header-based
              versioning strategy, and a public deprecation notice policy. This
              is the canonical machine-readable source for generated clients.
            </p>
          ),
          items: [
            <span key="version">
              Version header: <code>YDB-Qdrant-API-Version</code>
            </span>,
            <span key="current">
              Current documented value: <code>2026-05-28</code>
            </span>,
            "The site does not publish /v1 URL-path versioning today.",
          ],
        },
        {
          title: "Agent-readable mirrors",
          items: [
            <a href="/docs/openapi.md" key="markdown">
              OpenAPI markdown mirror
            </a>,
            <a href="/llms.txt" key="llms">
              llms.txt
            </a>,
            <a href="/llms-full.txt" key="llms-full">
              Full AI-readable resource index
            </a>,
          ],
        },
      ]}
    />
  );
}
