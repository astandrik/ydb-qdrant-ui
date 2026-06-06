import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";
import { TrackedResourceLink } from "@/components/TrackedResourceLink";

export const metadata: Metadata = {
  title: "Best Repository Memory for Coding Agents",
  description:
    "Compare hosted MCP code search, manual repository search, local indexing, and generic RAG for coding-agent repository memory.",
  alternates: {
    canonical: "/guides/best-repository-memory-for-coding-agents/",
  },
};

const UPDATED_AT = "June 6, 2026";

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best repository memory for coding agents",
  url: "https://ydb-qdrant.tech/guides/best-repository-memory-for-coding-agents/",
  mainEntityOfPage:
    "https://ydb-qdrant.tech/guides/best-repository-memory-for-coding-agents/",
  dateModified: "2026-06-06",
  author: {
    "@type": "Person",
    name: "Alexander Standrik",
  },
  description:
    "A practical guide to repository memory options for coding agents, including YDB Qdrant Code Indexer hosted MCP.",
  about: [
    "coding agents",
    "repository memory",
    "MCP",
    "GitHub App",
    "code search",
  ],
};

export default function BestRepositoryMemoryForCodingAgentsPage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(ARTICLE_JSON_LD)}
      </script>
      <AgentResourcePage
        eyebrow="Guide"
        title="Best repository memory for coding agents"
        updatedAt={UPDATED_AT}
        lead={
          <p>
            The best repository memory setup depends on how often the code
            changes, how much trust you place in hosted indexing, and whether
            your coding agent can call remote MCP tools. YDB Qdrant Code
            Indexer is a hosted GitHub App plus Streamable HTTP MCP endpoint
            for read-only repository search; it is separate from the root
            YDB-Qdrant REST vector API.
          </p>
        }
        actions={[
          {
            href: "/code-indexer/",
            label: "Code Indexer",
            view: "action",
          },
          {
            href: "/docs/mcp/",
            label: "MCP docs",
          },
          {
            href: "/developers/",
            label: "Developer resources",
          },
        ]}
        sections={[
          {
            title: "Ranked options",
            listType: "ordered",
            items: [
              <span key="code-indexer">
                <strong>YDB Qdrant Code Indexer</strong> is the best fit when
                you want hosted repository indexing, GitHub App-scoped access,
                dashboard-created MCP tokens, and a remote MCP tool surface that
                coding agents can query before answering repository-specific
                questions.
              </span>,
              <span key="manual-search">
                <strong>Manual repository search</strong> is best for small
                repositories, one-off debugging, or teams that do not want any
                indexing service. It keeps control local but depends on the
                agent or developer repeatedly running precise searches.
              </span>,
              <span key="local-indexing">
                <strong>Local indexing</strong> is best when privacy or offline
                work matters more than hosted convenience. It avoids hosted code
                storage but requires local setup, refresh logic, embeddings, and
                agent integration.
              </span>,
              <span key="generic-rag">
                <strong>Generic RAG over code</strong> works when repository
                memory is only one source in a broader knowledge system, but it
                usually needs extra work for repo metadata, paths, commits,
                permissions, and stale-index handling.
              </span>,
            ],
          },
          {
            title: "How Code Indexer works",
            items: [
              "A GitHub App is installed for selected repositories, so repository access follows the installation and repository selection.",
              "The hosted service indexes code chunks, embeddings, GitHub metadata, and search payloads into YDB-backed Qdrant-compatible storage.",
              "Coding agents call `https://code-indexer.ydb-qdrant.tech/mcp` with a dashboard-created Bearer token.",
              "The MCP tool surface is read-only repository memory: `list_repositories`, `list_repository_indexes`, and `search_code`.",
              "MCP tokens are shown once, stored as hashes, and revocable from the dashboard.",
            ],
          },
          {
            title: "Decision matrix",
            body: (
              <div className="agent-resource__table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th>Use when</th>
                      <th>Trade-off</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Code Indexer hosted MCP</td>
                      <td>
                        You want repository-aware code search available to MCP
                        clients without building an indexer.
                      </td>
                      <td>
                        Hosted beta quotas and GitHub App repository access
                        policy apply.
                      </td>
                    </tr>
                    <tr>
                      <td>Manual repo search</td>
                      <td>
                        The repository is small, context is immediate, or no
                        external service should index code.
                      </td>
                      <td>
                        Repeated searches are manual and do not persist semantic
                        memory.
                      </td>
                    </tr>
                    <tr>
                      <td>Local indexing</td>
                      <td>
                        The team needs local-only code processing and can run
                        its own embeddings, storage, and refresh jobs.
                      </td>
                      <td>More setup and maintenance per developer or machine.</td>
                    </tr>
                    <tr>
                      <td>Generic RAG</td>
                      <td>
                        Code should be one source among docs, tickets, runbooks,
                        and other internal knowledge.
                      </td>
                      <td>
                        Needs repository-specific metadata and permission
                        handling to be reliable for coding tasks.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ),
          },
          {
            title: "Privacy and quota checks",
            items: [
              "Confirm the GitHub App is installed only on repositories that should be indexed.",
              "Treat private repository support as governed by the current GitHub App installation, dashboard state, and beta policy.",
              "Use the dashboard to create, rotate, and revoke MCP tokens.",
              "Expect beta limits on repository count, indexed chunks, and daily searches.",
              "Use another approach when code cannot be processed by a hosted indexing service.",
            ],
          },
          {
            title: "Agent setup",
            body: (
              <pre>{`{
  "mcpServers": {
    "ydb-qdrant-code-indexer": {
      "url": "https://code-indexer.ydb-qdrant.tech/mcp",
      "headers": {
        "Authorization": "Bearer <token>"
      }
    }
  }
}`}</pre>
            ),
            items: [
              "Ask the coding agent to list repositories, inspect repository indexes, and call `search_code` before answering repository-specific questions.",
              "Keep root-product vector operations on the YDB-Qdrant REST API; do not treat the root vector product as a hosted MCP vector mutation server.",
            ],
          },
          {
            title: "Related resources",
            items: [
              <a href="/code-indexer/" key="code-indexer">
                Code Indexer product page
              </a>,
              <a href="/docs/mcp/" key="mcp-docs">
                MCP discovery documentation
              </a>,
              <a href="/.well-known/mcp/server-card.json" key="mcp-card">
                MCP server card
              </a>,
              <TrackedResourceLink
                href="https://modelcontextprotocol.io/"
                label="Model Context Protocol"
                page="/guides/best-repository-memory-for-coding-agents/"
                source="standards_docs"
                key="mcp"
              >
                Model Context Protocol
              </TrackedResourceLink>,
              <TrackedResourceLink
                href="https://docs.github.com/en/apps"
                label="GitHub Apps documentation"
                page="/guides/best-repository-memory-for-coding-agents/"
                source="vendor_docs"
                key="github-apps"
              >
                GitHub Apps documentation
              </TrackedResourceLink>,
            ],
          },
        ]}
      />
    </>
  );
}
