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
      ]}
      sections={[
        {
          title: "Canonical URLs",
          items: [
            <a href="/openapi.json" key="openapi">
              https://ydb-qdrant.tech/openapi.json
            </a>,
            <a href="/.well-known/api-catalog" key="catalog">
              https://ydb-qdrant.tech/.well-known/api-catalog
            </a>,
            <a href="/developers/" key="developers">
              https://ydb-qdrant.tech/developers/
            </a>,
          ],
        },
        {
          title: "What the spec covers",
          items: [
            "Service identity and health endpoints.",
            "Collection create, get, delete, and payload-index compatibility calls.",
            "Point retrieve, upsert, search, query, and delete endpoints.",
            "api-key header auth, optional X-Tenant-Id namespacing, structured JSON errors, and optional validation details.",
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
