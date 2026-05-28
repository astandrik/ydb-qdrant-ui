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
          href: "/agent/",
          label: "Agent mode",
        },
        {
          href: "/agent-mode.json",
          label: "Agent JSON",
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
        {
          href: "/.well-known/agent-skills/index.json",
          label: "Agent Skills",
        },
        {
          href: "/.well-known/agent-card.json",
          label: "A2A agent card",
        },
        {
          href: "/pricing/",
          label: "Pricing",
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
            <a href="/agent/" key="agent-mode">
              YDB-Qdrant Agent Mode view
            </a>,
            <a href="/agent-mode.json" key="agent-mode-json">
              YDB-Qdrant Agent Mode JSON
            </a>,
            <a href="/openapi.json" key="openapi">
              OpenAPI specification
            </a>,
            <a href="/.well-known/agent.json" key="agent">
              Agent discovery JSON
            </a>,
            <a href="/.well-known/agent-instructions.md" key="agent-instructions">
              Agent instructions markdown
            </a>,
            <a href="/.well-known/agent-skills/index.json" key="agent-skills">
              Agent Skills index
            </a>,
            <a
              href="/.well-known/agent-skills/ydb-qdrant/SKILL.md"
              key="ydb-qdrant-skill"
            >
              YDB-Qdrant Agent Skill
            </a>,
            <a
              href="/.well-known/agent-skills/code-indexer/SKILL.md"
              key="code-indexer-skill"
            >
              YDB Qdrant Code Indexer Agent Skill
            </a>,
            <a href="/agents.md" key="agents-md">
              agents.md compatibility file
            </a>,
            <a href="/skills.sh" key="skills-sh">
              skills.sh compatibility script
            </a>,
            <a href="/.well-known/agent-card.json" key="agent-card">
              A2A agent card
            </a>,
            <a href="/.well-known/api-catalog" key="api-catalog">
              API catalog
            </a>,
            <a href="/.well-known/oauth-protected-resource" key="oauth-resource">
              OAuth protected resource metadata
            </a>,
            <a href="/.well-known/mcp/server-card.json" key="mcp-card">
              MCP server card
            </a>,
            <a href="/.well-known/mcp.json" key="mcp-manifest">
              MCP manifest
            </a>,
            <a href="/docs/openapi/" key="openapi-page">
              OpenAPI discovery page
            </a>,
            <a href="/docs/mcp/" key="mcp-page">
              MCP discovery page
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
            <a href="/about/" key="about">
              About YDB-Qdrant
            </a>,
            <a href="/contact/" key="contact">
              Contact YDB-Qdrant
            </a>,
            <a href="/privacy/" key="privacy">
              YDB-Qdrant privacy
            </a>,
            <a href="/docs/api/" key="api-docs">
              REST API reference
            </a>,
            <a href="/docs/auth/" key="auth-docs">
              Auth and scoped access
            </a>,
            <a href="/docs/agents/" key="agent-docs">
              Agent instructions and when-to-use guidance
            </a>,
            <a href="/docs/webhooks/" key="webhooks-docs">
              Webhooks and events
            </a>,
            <a href="/pricing/" key="pricing">
              Pricing
            </a>,
            <a href="/docs/" key="architecture-docs">
              Architecture diagrams
            </a>,
            <a href="/guides/semantic-search-ydb/" key="semantic-guide">
              Semantic search on YDB guide
            </a>,
            <a href="/guides/best-vector-search-for-ydb/" key="best-ydb-guide">
              Best vector search for YDB-backed apps
            </a>,
            <a
              href="/guides/vector-database-api-semantic-search/"
              key="vector-database-api-guide"
            >
              Vector database API for semantic search
            </a>,
            <a
              href="/guides/vector-search-api-semantic-similarity-embeddings/"
              key="semantic-similarity-guide"
            >
              Vector search API for semantic similarity and embeddings
            </a>,
            <a
              href="/compare/mongodb-atlas-vector-search/"
              key="mongodb-comparison"
            >
              YDB-Qdrant vs MongoDB Atlas Vector Search
            </a>,
          ],
        },
        {
          title: "Predictable URLs by resource name",
          body: (
            <p>
              Search engines and AI agents can discover YDB-Qdrant developer
              resources by stable names and direct URLs rather than navigating a
              JavaScript app.
            </p>
          ),
          items: [
            <span key="api">
              YDB-Qdrant API docs: <code>/docs/api/</code>
            </span>,
            <span key="openapi">
              YDB-Qdrant OpenAPI spec: <code>/openapi.json</code>
            </span>,
            <span key="auth">
              YDB-Qdrant auth docs: <code>/docs/auth/</code>
            </span>,
            <span key="mcp">
              YDB-Qdrant MCP discovery: <code>/docs/mcp/</code>
            </span>,
            <span key="skills">
              YDB-Qdrant Agent Skills:{" "}
              <code>/.well-known/agent-skills/index.json</code>
            </span>,
            <span key="mode">
              YDB-Qdrant Agent Mode: <code>/agent/</code>
            </span>,
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
