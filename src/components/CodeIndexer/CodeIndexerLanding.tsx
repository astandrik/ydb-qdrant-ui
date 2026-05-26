import Image from "next/image";
import { Button, Icon } from "@gravity-ui/uikit";
import type { IconData } from "@gravity-ui/uikit";
import {
  ArrowRight,
  Code,
  DatabaseMagnifier,
  Key,
  Rocket,
  ShieldCheck,
  Terminal,
} from "@gravity-ui/icons";
import "./CodeIndexer.scss";

export const CODE_INDEXER_BACKEND_URL = "https://code-indexer.ydb-qdrant.tech";
export const CODE_INDEXER_INSTALL_URL =
  "https://github.com/apps/ydb-qdrant-code-indexer/installations/new";
export const CODE_INDEXER_DASHBOARD_PATH = "/code-indexer/dashboard/";

type CodeIndexerHomePromoContent = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

export const codeIndexerHomePromoEn: CodeIndexerHomePromoContent = {
  eyebrow: "New hosted app",
  title: "YDB Qdrant Code Indexer",
  body:
    "Index GitHub repositories into YDB-backed Qdrant-compatible storage and give coding agents searchable project memory through hosted MCP.",
  cta: "Open Code Indexer",
};

export const codeIndexerHomePromoRu: CodeIndexerHomePromoContent = {
  eyebrow: "Новый hosted app",
  title: "YDB Qdrant Code Indexer",
  body:
    "Индексируйте GitHub-репозитории в Qdrant-совместимое хранилище на YDB и давайте coding agents проектную память через hosted MCP.",
  cta: "Открыть Code Indexer",
};

export function buildCodeIndexerLoginUrl(returnPath = CODE_INDEXER_DASHBOARD_PATH) {
  return `${CODE_INDEXER_BACKEND_URL}/github/oauth/start?return_to=${encodeURIComponent(
    returnPath
  )}`;
}

type Feature = {
  description: string;
  icon: IconData;
  title: string;
};

const landingFeatures: Feature[] = [
  {
    description:
      "The GitHub App receives repository webhooks and refreshes code chunks after pushes and pull requests.",
    icon: Code,
    title: "Repository aware",
  },
  {
    description:
      "Chunks, embeddings, GitHub metadata, and search payloads live in YDB-backed Qdrant-compatible storage.",
    icon: DatabaseMagnifier,
    title: "Vector memory on YDB",
  },
  {
    description:
      "Coding agents call one hosted MCP endpoint and search by owner, repository, and natural language query.",
    icon: Terminal,
    title: "Agent ready MCP",
  },
];

const trustItems: Feature[] = [
  {
    description:
      "GitHub permissions are scoped to metadata, contents, pull requests, and checks for installed repositories.",
    icon: ShieldCheck,
    title: "Least privilege",
  },
  {
    description:
      "MCP tokens are shown once, stored as hashes, and can be revoked from the dashboard.",
    icon: Key,
    title: "Token control",
  },
  {
    description:
      "Public beta quotas limit repository count, indexed chunks, and daily searches.",
    icon: Rocket,
    title: "Hosted beta",
  },
];

export function CodeIndexerHomePromo({
  content = codeIndexerHomePromoEn,
}: {
  content?: CodeIndexerHomePromoContent;
}) {
  return (
    <section className="code-indexer-promo" aria-labelledby="code-indexer-promo-title">
      <div>
        <p className="code-indexer-promo__eyebrow">{content.eyebrow}</p>
        <h2 id="code-indexer-promo-title">{content.title}</h2>
        <p>{content.body}</p>
      </div>
      <Button href="/code-indexer/" size="l" view="outlined">
        {content.cta}
        <Icon data={ArrowRight} size={16} />
      </Button>
    </section>
  );
}

export function CodeIndexerLanding() {
  return (
    <main className="code-indexer">
      <section className="code-indexer__hero" aria-labelledby="code-indexer-title">
        <div className="code-indexer__hero-copy">
          <p className="code-indexer__eyebrow">GitHub App for coding agents</p>
          <h1 id="code-indexer-title">YDB Qdrant Code Indexer</h1>
          <p className="code-indexer__lead">
            Install a GitHub App, index repositories into YDB-backed
            Qdrant-compatible storage, and give your coding agents searchable
            project memory.
          </p>
          <div className="code-indexer__actions">
            <Button
              href={CODE_INDEXER_INSTALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              view="action"
            >
              Install GitHub App
              <Icon data={ArrowRight} size={18} />
            </Button>
            <Button href={buildCodeIndexerLoginUrl()} size="xl" view="outlined">
              Open dashboard
            </Button>
          </div>
        </div>
        <div className="code-indexer__hero-visual" aria-hidden="true">
          <Image
            src="/assets/preview.png"
            alt=""
            width={1024}
            height={1024}
            className="code-indexer__hero-image"
            priority
            unoptimized
          />
          <div className="code-indexer__terminal">
            <div className="code-indexer__terminal-bar">
              <span />
              <span />
              <span />
            </div>
            <pre>{`search_code({
  owner: "astandrik",
  repo: "local-ydb-toolkit",
  query: "tenant bootstrap flow"
})`}</pre>
          </div>
        </div>
      </section>

      <section className="code-indexer__section" aria-labelledby="code-indexer-flow">
        <div className="code-indexer__section-heading">
          <p className="code-indexer__eyebrow">How it works</p>
          <h2 id="code-indexer-flow">From repository events to searchable memory</h2>
        </div>
        <div className="code-indexer__feature-grid">
          {landingFeatures.map((feature) => (
            <article className="code-indexer__feature" key={feature.title}>
              <Icon data={feature.icon} size={22} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="code-indexer__section" aria-labelledby="code-indexer-trust">
        <div className="code-indexer__section-heading">
          <p className="code-indexer__eyebrow">Public beta shape</p>
          <h2 id="code-indexer-trust">Built for narrow access and cost control</h2>
        </div>
        <div className="code-indexer__feature-grid">
          {trustItems.map((feature) => (
            <article className="code-indexer__feature" key={feature.title}>
              <Icon data={feature.icon} size={22} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
