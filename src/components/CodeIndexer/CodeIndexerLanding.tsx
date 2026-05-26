"use client";

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
import { AskAIPanel } from "@/components/AskAI";
import {
  ASK_AI_CODE_INDEXER,
  ASK_AI_CODE_INDEXER_PRODUCT_ID,
  ASK_AI_CODE_INDEXER_PRODUCT_NAME,
} from "@/components/AskAI/ask-ai-content";
import { trackGoal } from "@/shared/utils/metricsManager";
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

const CODE_INDEXER_MCP_CONFIG_SNIPPET = JSON.stringify(
  {
    mcpServers: {
      "ydb-qdrant-code-indexer": {
        headers: {
          Authorization: "Bearer <token>",
        },
        url: `${CODE_INDEXER_BACKEND_URL}/mcp`,
      },
    },
  },
  null,
  2
);

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

const faqItems = [
  {
    answer:
      "The app stores GitHub account, installation, and repository metadata, plus code snippets selected by repository permissions and indexing configuration.",
    question: "What repository data is indexed?",
  },
  {
    answer:
      "Repository access follows the repositories selected during GitHub App installation and the current beta policy. Treat a repository as available only after it appears ready in the dashboard.",
    question: "Are private repositories supported?",
  },
  {
    answer:
      "Code chunks, embeddings, GitHub metadata, and search payloads are stored in YDB-backed Qdrant-compatible collections.",
    question: "Where are embeddings stored?",
  },
  {
    answer:
      "Open the dashboard, find the MCP token, and revoke it. Tokens are stored as hashes, and revoked tokens stop future hosted MCP searches.",
    question: "How do I revoke an MCP token?",
  },
  {
    answer:
      "Uninstall the GitHub App or remove repository access to delete indexed collections for removed repositories. The dashboard delete-data action removes eligible user-linked data.",
    question: "How do I remove a repository index?",
  },
  {
    answer:
      "The public beta limits repository count, indexed chunks, and daily searches. Exact limits are enforced by the hosted service and may change during beta.",
    question: "What are public beta quotas?",
  },
  {
    answer:
      "Use an MCP client that can call a remote MCP endpoint with Bearer-token headers. Specific client support is intentionally not claimed until it is verified.",
    question: "Which agents can connect over MCP?",
  },
] as const;

function trackCodeIndexerFunnel(goal: string, source: string) {
  trackGoal(goal, {
    product: ASK_AI_CODE_INDEXER_PRODUCT_ID,
    page: ASK_AI_CODE_INDEXER.page,
    source,
  });
}

function CodeIndexerAskAI({
  className,
  contextId,
}: {
  className?: string;
  contextId: string;
}) {
  return (
    <AskAIPanel
      productName={ASK_AI_CODE_INDEXER_PRODUCT_NAME}
      productId={ASK_AI_CODE_INDEXER_PRODUCT_ID}
      label={ASK_AI_CODE_INDEXER.label}
      helperText={ASK_AI_CODE_INDEXER.helperText}
      providerAriaLabelTemplate={ASK_AI_CODE_INDEXER.providerAriaLabelTemplate}
      prompt={ASK_AI_CODE_INDEXER.prompt}
      page={ASK_AI_CODE_INDEXER.page}
      promptVariant={ASK_AI_CODE_INDEXER.promptVariant}
      contextId={contextId}
      className={className}
    />
  );
}

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
              onClick={() =>
                trackCodeIndexerFunnel("github_app_install_click", "hero")
              }
            >
              Install GitHub App
              <Icon data={ArrowRight} size={18} />
            </Button>
            <Button
              href={buildCodeIndexerLoginUrl()}
              size="xl"
              view="outlined"
              onClick={() =>
                trackCodeIndexerFunnel("dashboard_oauth_start", "hero")
              }
            >
              Open dashboard
            </Button>
          </div>
          <CodeIndexerAskAI
            className="code-indexer__ask-ai code-indexer__ask-ai--hero"
            contextId="hero"
          />
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

      <section className="code-indexer__section code-indexer__section--compact">
        <CodeIndexerAskAI
          className="code-indexer__ask-ai code-indexer__ask-ai--secondary"
          contextId="how_it_works"
        />
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

      <section className="code-indexer__section" aria-labelledby="code-indexer-mcp">
        <div className="code-indexer__section-heading">
          <p className="code-indexer__eyebrow">Connect your coding agent</p>
          <h2 id="code-indexer-mcp">Use hosted MCP as repository memory</h2>
          <p>
            Create a token in the dashboard, add it as a Bearer token, and point
            your MCP client at the hosted endpoint.
          </p>
        </div>
        <div className="code-indexer__setup-grid">
          <article className="code-indexer__setup-card">
            <h3>Generic MCP config</h3>
            <pre className="code-indexer__config-snippet">
              {CODE_INDEXER_MCP_CONFIG_SNIPPET}
            </pre>
          </article>
          <article className="code-indexer__setup-card">
            <h3>Agent prompt</h3>
            <p>
              Ask the agent to use <code>list_repositories</code>, inspect
              repository indexes, and call <code>search_code</code> before
              answering repository-specific questions.
            </p>
          </article>
        </div>
      </section>

      <section className="code-indexer__section" aria-labelledby="code-indexer-faq">
        <div className="code-indexer__section-heading">
          <p className="code-indexer__eyebrow">FAQ</p>
          <h2 id="code-indexer-faq">Evaluate before installing</h2>
        </div>
        <div className="code-indexer__faq-grid">
          {faqItems.map((item) => (
            <article className="code-indexer__faq" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
