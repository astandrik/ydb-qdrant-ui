import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant Pricing",
  description:
    "Pricing for YDB-Qdrant self-hosting, the Apache-2.0 package, and the YDB Qdrant Code Indexer public beta.",
  alternates: {
    canonical: "/pricing/",
  },
};

const JSON_LD_ESCAPE_MAP = {
  "&": "\\u0026",
  "<": "\\u003c",
  ">": "\\u003e",
} as const;

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(
    /[&<>]/g,
    (char) => JSON_LD_ESCAPE_MAP[char as keyof typeof JSON_LD_ESCAPE_MAP],
  );
}

const PRICING_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "YDB-Qdrant",
  url: "https://ydb-qdrant.tech/",
  applicationCategory: "DeveloperApplication",
  offers: {
    "@type": "OfferCatalog",
    name: "YDB-Qdrant pricing",
    itemListElement: [
      {
        "@type": "Offer",
        name: "YDB-Qdrant package and self-hosted server",
        price: "0",
        priceCurrency: "USD",
        description:
          "Apache-2.0 open-source package and self-hosted HTTP server. Users pay their own YDB and infrastructure costs.",
        url: "https://ydb-qdrant.tech/pricing/",
      },
      {
        "@type": "Offer",
        name: "YDB Qdrant Code Indexer public beta",
        price: "0",
        priceCurrency: "USD",
        description:
          "Hosted Code Indexer public beta with repository, chunk, and daily search quotas.",
        url: "https://ydb-qdrant.tech/code-indexer/",
      },
    ],
  },
};

const PRICING_JSON_LD_SCRIPT = serializeJsonLd(PRICING_JSON_LD);

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json">{PRICING_JSON_LD_SCRIPT}</script>
      <AgentResourcePage
        eyebrow="Pricing"
        title="YDB-Qdrant pricing"
        lead={
          <p>
            YDB-Qdrant is available as an Apache-2.0 package and self-hosted
            HTTP server. The hosted Code Indexer MCP product is currently a
            free public beta with quotas and no paid hosted SLA.
          </p>
        }
        actions={[
          {
            href: "https://www.npmjs.com/package/ydb-qdrant",
            label: "npm package",
            view: "action",
          },
          {
            href: "/code-indexer/",
            label: "Code Indexer beta",
          },
          {
            href: "/developers/",
            label: "Developer resources",
          },
        ]}
        sections={[
          {
            title: "Package and self-hosting",
            items: [
              "The ydb-qdrant npm package is open source under Apache-2.0.",
              "Self-hosted REST API and Node.js library usage has no YDB-Qdrant license fee.",
              "You are responsible for your own YDB, compute, network, storage, backup, and monitoring costs.",
              "No hosted production SLA is published for the root YDB-Qdrant REST product.",
            ],
          },
          {
            title: "Code Indexer public beta",
            items: [
              "The hosted YDB Qdrant Code Indexer public beta is free to use while beta access is available.",
              "The beta limits repository count, indexed chunks, and daily searches to control hosted-service cost and abuse risk.",
              "MCP tokens are created in the dashboard and can be revoked there.",
              "Specific enterprise, SLA, or paid hosted plans are not published today.",
            ],
          },
          {
            title: "Cost drivers",
            items: [
              "Vector dimension, point count, payload size, and query volume affect YDB storage and compute usage.",
              "Exact top-k search can cost more than approximate vector indexes at high scale.",
              "Embedding generation is a separate cost from YDB-Qdrant and depends on the model provider you choose.",
            ],
          },
          {
            title: "Related resources",
            items: [
              <a href="/docs/api/" key="api">
                REST API reference
              </a>,
              <a href="/docs/auth/" key="auth">
                Auth and scoped access
              </a>,
              <a href="/compare/vector-search-platforms/" key="comparison">
                Vector search platform comparison
              </a>,
              <a href="/guides/best-vector-search-for-ydb/" key="guide">
                Best vector search for YDB-backed apps
              </a>,
            ],
          },
        ]}
      />
    </>
  );
}
