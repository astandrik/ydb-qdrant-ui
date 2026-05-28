import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "About YDB-Qdrant",
  description:
    "About the YDB-Qdrant project, its maintainer, product scope, and trust resources for developers and AI agents.",
  alternates: {
    canonical: "/about/",
  },
};

const ABOUT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About YDB-Qdrant",
  url: "https://ydb-qdrant.tech/about/",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "YDB-Qdrant",
    applicationCategory: "DeveloperApplication",
    url: "https://ydb-qdrant.tech/",
    codeRepository: "https://github.com/astandrik/ydb-qdrant",
    description:
      "Qdrant-compatible vector search API and Node.js library backed by YDB.",
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(ABOUT_JSON_LD)}
      </script>
      <AgentResourcePage
        eyebrow="About"
        title="About YDB-Qdrant"
        lead={
          <p>
            YDB-Qdrant is a focused open-source project for teams that already
            use YDB and want Qdrant-compatible vector storage, exact top-k
            search, and agent-readable API documentation without operating a
            separate vector database cluster.
          </p>
        }
        actions={[
          {
            href: "https://github.com/astandrik/ydb-qdrant",
            label: "GitHub repository",
            view: "action",
          },
          {
            href: "/developers/",
            label: "Developer resources",
          },
          {
            href: "/contact/",
            label: "Contact",
          },
        ]}
        sections={[
          {
            title: "Project scope",
            body: (
              <p>
                The root product exposes a Qdrant-compatible REST subset and a
                Node.js library. It covers collection lifecycle, point upsert,
                retrieval, search, query compatibility, and point deletion. It
                does not claim full Qdrant parity, hosted root-product MCP
                vector mutation tools, OAuth scopes, or role-based REST
                permissions.
              </p>
            ),
          },
          {
            title: "Maintainer and source",
            body: (
              <p>
                The public source repository is maintained by Alexander
                Standrik and published on GitHub with an npm package for
                Node.js usage. The website publishes OpenAPI, llms.txt, agent
                cards, skill files, auth documentation, pricing notes, and
                comparison guides so humans and AI agents can inspect the
                current capabilities directly.
              </p>
            ),
          },
          {
            title: "Hosted Code Indexer",
            body: (
              <p>
                YDB Qdrant Code Indexer is the hosted companion app. It indexes
                selected GitHub repositories into YDB-backed vector storage and
                exposes read-only repository memory through Streamable HTTP MCP
                at <code>https://code-indexer.ydb-qdrant.tech/mcp</code>.
                Repository access follows the GitHub App installation and MCP
                bearer tokens created in the dashboard.
              </p>
            ),
          },
          {
            title: "Trust resources",
            items: [
              <a href="/privacy/" key="privacy">
                Privacy policy
              </a>,
              <a href="/contact/" key="contact">
                Contact page
              </a>,
              <a href="/docs/auth/" key="auth">
                Auth and scoped access
              </a>,
              <a href="/openapi.json" key="openapi">
                OpenAPI specification
              </a>,
              <a href="/.well-known/agent.json" key="agent">
                Agent discovery JSON
              </a>,
            ],
          },
        ]}
      />
    </>
  );
}
