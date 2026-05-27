import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant Webhooks and Events",
  description:
    "Webhook and event behavior for YDB-Qdrant REST and the hosted YDB Qdrant Code Indexer GitHub App.",
  alternates: {
    canonical: "/docs/webhooks/",
  },
};

export default function WebhooksDocsPage() {
  return (
    <AgentResourcePage
      eyebrow="Webhooks"
      title="YDB-Qdrant webhooks and events"
      lead={
        <p>
          The root YDB-Qdrant REST API does not currently expose outbound
          webhook subscriptions. The hosted Code Indexer product receives
          GitHub webhooks to refresh repository indexes.
        </p>
      }
      actions={[
        {
          href: "/docs/api/",
          label: "REST API docs",
        },
        {
          href: "/code-indexer/",
          label: "Code Indexer",
          view: "action",
        },
      ]}
      sections={[
        {
          title: "Root REST API",
          items: [
            "No outbound webhook subscription API is currently published for collection, point, search, or query events.",
            "Use the REST API directly for collection and point operations.",
            "Use the OpenAPI spec to discover currently supported endpoints.",
          ],
        },
        {
          title: "Code Indexer GitHub webhooks",
          body: (
            <pre>{`POST https://code-indexer.ydb-qdrant.tech/github/webhook`}</pre>
          ),
          items: [
            "GitHub App installation events update repository access.",
            "Push and pull request events refresh indexed code chunks.",
            "Uninstall and repository removal events remove eligible indexed collections.",
          ],
        },
        {
          title: "Agent access",
          body: (
            <pre>{`GET/POST https://code-indexer.ydb-qdrant.tech/mcp`}</pre>
          ),
          items: [
            "Public hosted clients should use MCP instead of direct internal search APIs.",
            "MCP tokens are created and revoked in the dashboard.",
            "The MCP server card is published at /.well-known/mcp/server-card.json.",
          ],
        },
      ]}
    />
  );
}
