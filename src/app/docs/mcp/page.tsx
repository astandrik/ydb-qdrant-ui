import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant MCP Server Discovery",
  description:
    "Named MCP discovery page for YDB Qdrant Code Indexer hosted Streamable HTTP MCP.",
  alternates: {
    canonical: "/docs/mcp/",
  },
};

export default function McpDocsPage() {
  return (
    <AgentResourcePage
      eyebrow="MCP"
      title="YDB-Qdrant MCP server discovery"
      lead={
        <p>
          The hosted MCP surface for this project is YDB Qdrant Code Indexer,
          which gives coding agents read-only repository memory over Streamable
          HTTP MCP.
        </p>
      }
      actions={[
        {
          href: "/.well-known/mcp/server-card.json",
          label: "MCP server card",
          view: "action",
        },
        {
          href: "/.well-known/mcp.json",
          label: "MCP manifest",
        },
        {
          href: "/code-indexer/",
          label: "Code Indexer",
        },
      ]}
      sections={[
        {
          title: "Hosted MCP endpoint",
          body: (
            <pre>{`GET/POST https://code-indexer.ydb-qdrant.tech/mcp
Authorization: Bearer <mcp-token>`}</pre>
          ),
          items: [
            "MCP tokens are created in the Code Indexer dashboard and shown once.",
            "Tools are read-only and scoped by GitHub App installation and repository access.",
            "The root vector REST product does not publish a separate hosted MCP server.",
          ],
        },
        {
          title: "Discovery resources",
          items: [
            <a href="/.well-known/mcp/server-card.json" key="server-card">
              YDB Qdrant Code Indexer MCP server card
            </a>,
            <a href="/.well-known/mcp.json" key="manifest">
              YDB-Qdrant MCP manifest
            </a>,
            <a href="/code-indexer/llms.txt" key="llms">
              Code Indexer AI-readable page
            </a>,
            <a href="/docs/mcp.md" key="markdown">
              MCP markdown mirror
            </a>,
          ],
        },
        {
          title: "Tools",
          items: [
            "list_repositories: list repositories visible to the token.",
            "list_repository_indexes: inspect default-branch and pull-request indexes.",
            "search_code: search indexed repository chunks by owner, repository, and query.",
          ],
        },
      ]}
    />
  );
}
