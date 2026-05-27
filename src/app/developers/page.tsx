import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant Developer Resources",
  description:
    "OpenAPI, auth docs, MCP discovery, webhooks notes, GitHub, npm, and AI-readable files for YDB-Qdrant.",
  alternates: {
    canonical: "/developers/",
  },
};

export default function DevelopersPage() {
  return (
    <AgentResourcePage
      eyebrow="Developer resources"
      title="YDB-Qdrant API, auth, and MCP resources"
      lead={
        <p>
          Start here when wiring an agent, IDE, RAG service, or backend to
          YDB-Qdrant. The static resources below are available at predictable
          URLs for search engines, API clients, and AI agents.
        </p>
      }
      actions={[
        {
          href: "/openapi.json",
          label: "OpenAPI JSON",
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
          href: "/.well-known/mcp/server-card.json",
          label: "MCP server card",
        },
      ]}
      sections={[
        {
          title: "Machine-readable resources",
          items: [
            <a href="/openapi.json" key="openapi">
              OpenAPI specification
            </a>,
            <a href="/.well-known/agent.json" key="agent">
              Agent discovery JSON
            </a>,
            <a href="/.well-known/api-catalog" key="api-catalog">
              API catalog
            </a>,
            <a href="/.well-known/mcp/server-card.json" key="mcp-card">
              MCP server card
            </a>,
            <a href="/.well-known/mcp.json" key="mcp-manifest">
              MCP manifest
            </a>,
            <a href="/llms.txt" key="llms">
              llms.txt
            </a>,
            <a href="/llms-full.txt" key="llms-full">
              Full AI-readable index
            </a>,
            <a href="/docs/llms.txt" key="docs-llms">
              Docs llms.txt
            </a>,
          ],
        },
        {
          title: "Human-readable docs",
          items: [
            <a href="/docs/api/" key="api-docs">
              REST API reference
            </a>,
            <a href="/docs/auth/" key="auth-docs">
              Auth and scoped access
            </a>,
            <a href="/docs/webhooks/" key="webhooks-docs">
              Webhooks and events
            </a>,
            <a href="/docs/" key="architecture-docs">
              Architecture diagrams
            </a>,
            <a href="/guides/semantic-search-ydb/" key="semantic-guide">
              Semantic search on YDB guide
            </a>,
          ],
        },
        {
          title: "Packages and source",
          items: [
            <a
              href="https://github.com/astandrik/ydb-qdrant"
              key="github"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub repository
            </a>,
            <a
              href="https://www.npmjs.com/package/ydb-qdrant"
              key="npm"
              rel="noopener noreferrer"
              target="_blank"
            >
              npm package
            </a>,
            <span key="demo-url">
              Public demo Qdrant base URL:{" "}
              <code>http://ydb-qdrant.tech:8080</code>
            </span>,
          ],
        },
        {
          title: "Agent integration",
          body: (
            <p>
              The root product exposes a Qdrant-compatible REST API. The hosted
              MCP surface is YDB Qdrant Code Indexer, which gives coding agents
              read-only repository memory over Streamable HTTP MCP at{" "}
              <code>https://code-indexer.ydb-qdrant.tech/mcp</code>.
            </p>
          ),
          items: [
            <a href="/code-indexer/" key="code-indexer">
              Code Indexer product page
            </a>,
            <a href="/code-indexer/dashboard/" key="dashboard">
              Dashboard and MCP tokens
            </a>,
            <a href="/code-indexer/support/" key="support">
              Code Indexer support
            </a>,
          ],
        },
      ]}
    />
  );
}
