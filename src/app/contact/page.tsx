import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "Contact YDB-Qdrant",
  description:
    "Contact and support channels for YDB-Qdrant, including GitHub issues, Code Indexer support, and agent-readable resources.",
  alternates: {
    canonical: "/contact/",
  },
};

const CONTACT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact YDB-Qdrant",
  url: "https://ydb-qdrant.tech/contact/",
  mainEntity: {
    "@type": "Organization",
    name: "YDB-Qdrant",
    url: "https://ydb-qdrant.tech/",
    sameAs: ["https://github.com/astandrik/ydb-qdrant"],
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(CONTACT_JSON_LD)}
      </script>
      <AgentResourcePage
        eyebrow="Contact"
        title="Contact YDB-Qdrant"
        lead={
          <p>
            Use the public GitHub repository for project questions, bug
            reports, and API behavior reports. Use the Code Indexer support
            page for hosted GitHub App, dashboard, and MCP-token issues.
          </p>
        }
        actions={[
          {
            href: "https://github.com/astandrik/ydb-qdrant/issues",
            label: "GitHub issues",
            view: "action",
          },
          {
            href: "/code-indexer/support/",
            label: "Code Indexer support",
          },
          {
            href: "/docs/api/",
            label: "API docs",
          },
        ]}
        sections={[
          {
            title: "Best channel by topic",
            items: [
              "Use GitHub issues for REST API behavior, OpenAPI corrections, package usage, documentation gaps, and reproducible self-hosting problems.",
              "Use Code Indexer support for GitHub App installation, dashboard sessions, repository indexing, MCP token creation, and hosted search behavior.",
              "Use the public documentation and llms.txt resources when an AI assistant needs the current product contract before suggesting an integration.",
            ],
          },
          {
            title: "What to include",
            body: (
              <p>
                Include the endpoint or page URL, expected behavior, observed
                response, request ID if an API error returned one, and whether
                the issue affects self-hosted REST, the public demo endpoint,
                or hosted Code Indexer MCP. Do not share production API keys,
                MCP tokens, GitHub OAuth tokens, private repository contents,
                or customer data in public issues.
              </p>
            ),
          },
          {
            title: "Public resources",
            items: [
              <a href="/developers/" key="developers">
                Developer hub
              </a>,
              <a href="/openapi.json" key="openapi">
                OpenAPI specification
              </a>,
              <a href="/docs/auth/" key="auth">
                Auth and scoped access
              </a>,
              <a href="/llms-full.txt" key="llms">
                Full AI-readable index
              </a>,
              <a href="/about/" key="about">
                About YDB-Qdrant
              </a>,
              <a href="/privacy/" key="privacy">
                Privacy policy
              </a>,
            ],
          },
        ]}
      />
    </>
  );
}
