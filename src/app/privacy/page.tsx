import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant Privacy",
  description:
    "Privacy notes for YDB-Qdrant self-hosted REST usage, public demo endpoint, analytics, and hosted Code Indexer MCP.",
  alternates: {
    canonical: "/privacy/",
  },
};

const PRIVACY_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "PrivacyPolicy",
  name: "YDB-Qdrant Privacy",
  url: "https://ydb-qdrant.tech/privacy/",
  about: {
    "@type": "SoftwareApplication",
    name: "YDB-Qdrant",
    url: "https://ydb-qdrant.tech/",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(PRIVACY_JSON_LD)}
      </script>
      <AgentResourcePage
        eyebrow="Privacy"
        title="YDB-Qdrant privacy"
        lead={
          <p>
            This page summarizes privacy expectations for the YDB-Qdrant
            website, self-hosted REST package, public demo endpoint, and hosted
            Code Indexer MCP product. It is written for developers and AI
            agents evaluating whether the product is appropriate for a use
            case.
          </p>
        }
        actions={[
          {
            href: "/code-indexer/privacy/",
            label: "Code Indexer privacy",
            view: "action",
          },
          {
            href: "/docs/auth/",
            label: "Auth docs",
          },
          {
            href: "/contact/",
            label: "Contact",
          },
        ]}
        sections={[
          {
            title: "Self-hosted REST and library usage",
            body: (
              <p>
                When you run the npm package, Node.js library, or self-hosted
                REST server, your vectors, payloads, API keys, tenant IDs, and
                YDB credentials stay in the environment you operate. The public
                website does not receive that self-hosted data unless you send
                it to a hosted demo or support channel yourself.
              </p>
            ),
          },
          {
            title: "Public demo endpoint",
            body: (
              <p>
                The public HTTP demo endpoint is intended only for non-sensitive
                testing. Do not send secrets, private documents, customer data,
                regulated data, production embeddings, or proprietary payloads
                to the demo endpoint. Use your own hosted server and YDB
                database for controlled production or confidential evaluation.
              </p>
            ),
          },
          {
            title: "Website analytics",
            body: (
              <p>
                The public website uses Yandex Metrika to understand page
                visits and interaction patterns. Analytics are separate from
                REST API namespaces and Code Indexer MCP tokens. The site also
                publishes machine-readable files such as OpenAPI, llms.txt,
                agent cards, and skill files so crawlers and AI agents can
                discover the documented product surface.
              </p>
            ),
          },
          {
            title: "Code Indexer",
            body: (
              <p>
                Hosted Code Indexer has its own privacy page because it uses a
                GitHub App, GitHub OAuth session flow, repository indexing, and
                MCP bearer tokens. Its tokens are shown once, stored as hashes,
                and scoped by the GitHub App installation and selected
                repositories.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
