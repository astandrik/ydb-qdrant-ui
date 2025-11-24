import type { ReactNode, RefObject } from "react";
import type { MouseEvent } from "react";
import React from "react";
import { trackGoal } from "@/shared/utils/metricsManager";
import type {
  GettingStartedSectionBaseProps,
  DocsLink,
} from "./GettingStartedSection";

const DEMO_URL = "http://ydb-qdrant.tech:8080";

export type GettingStartedSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCopyDemoUrl: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const gettingStartedSectionEnProps = (): Omit<
  GettingStartedSectionBaseProps,
  "sectionRef" | "activeTab" | "onTabChange" | "onCopyDemoUrl"
> => {
  const demoUrl = DEMO_URL;
  const docsLinks: DocsLink[] = [
    { href: "/docs/", label: "Service diagrams (C4 + ER)" },
    { href: "https://ydb.tech/docs/en/", label: "YDB docs (overview)" },
    { href: "https://ydb.tech/docs/en/yql/reference/", label: "YQL reference" },
    {
      href: "https://ydb.tech/docs/en/concepts/vector_search",
      label: "Vector search (approximate)",
    },
    {
      href: "https://cloud.yandex.com/en/docs/ydb/",
      label: "YDB Cloud docs",
    },
    {
      href: "https://www.npmjs.com/package/ydb-qdrant",
      label: "npm: ydb-qdrant",
    },
  ];

  const selfHostedNodeBlock: ReactNode = (
    <>
      <h3 className="card-title">Configure self‑hosted (Node.js)</h3>
      <ol className="muted">
        <li>
          Clone and install: <code>npm install</code>
        </li>
        <li>
          Set env: <code>YDB_ENDPOINT</code>, <code>YDB_DATABASE</code>
        </li>
        <li>
          Auth via env: <code>YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS</code> |{" "}
          <code>YDB_METADATA_CREDENTIALS</code> |{" "}
          <code>YDB_ACCESS_TOKEN_CREDENTIALS</code> |{" "}
          <code>YDB_ANONYMOUS_CREDENTIALS</code>
        </li>
        <li>
          Run: <code>npm run dev</code> (dev) or <code>npm start</code> (prod)
        </li>
        <li>
          Point client to <code>http://localhost:8080</code>
        </li>
      </ol>
      <p className="muted">
        Or run as a container (Docker or docker-compose) using the published
        image <code>ghcr.io/astandrik/ydb-qdrant:latest</code>.
      </p>
    </>
  );

  const dockerBlock: ReactNode = (
    <>
      <h3 className="card-title">Run via Docker / docker-compose</h3>
      <ol className="muted">
        <li>
          Pull image:{" "}
          <code>docker pull ghcr.io/astandrik/ydb-qdrant:latest</code>
        </li>
        <li>
          Run with Docker:{" "}
          <code>
            docker run -d --name ydb-qdrant -p 8080:8080
            ghcr.io/astandrik/ydb-qdrant:latest
          </code>
        </li>
        <li>
          Or with docker-compose: <code>docker-compose up -d</code> using the
          sample config from the README.
        </li>
      </ol>
      <p className="muted">
        Details and full examples:{" "}
        <a
          href="https://github.com/astandrik/ydb-qdrant#docker-self-hosted-http-server"
          target="_blank"
          rel="noopener"
          onClick={() =>
            trackGoal("github_readme_click", { source: "getting_started_en" })
          }
        >
          GitHub README
        </a>
      </p>
    </>
  );

  const npmBlock: ReactNode = (
    <>
      <h3 className="card-title">Use as Node.js library</h3>
      <ol className="muted">
        <li>
          Install: <code>npm install ydb-qdrant</code>
        </li>
        <li>
          Usage:
          <pre>
            <code>
              {`import { createYdbQdrantClient } from "ydb-qdrant";

const client = createYdbQdrantClient({
  endpoint: "grpcs://ydb.serverless.yandexcloud.net:2135",
  database: "/ru-central1/...",
  token: "..."
});`}
            </code>
          </pre>
        </li>
      </ol>
      <p className="muted">
        See{" "}
        <a
          href="https://www.npmjs.com/package/ydb-qdrant"
          target="_blank"
          rel="noopener"
        >
          npm package
        </a>{" "}
        for more details.
      </p>
    </>
  );

  return {
    title: "Getting started",
    ideConfigSummary: "Configure in Roo Code/Kilo Code",
    ideConfigDescription: (
      <p className="muted">
        Public demo Qdrant base URL for IDEs: <code>{DEMO_URL}</code> (paste
        into your IDE/agent as the Qdrant base URL).
      </p>
    ),
    ideConfigImageAlt: "IDE agent configuration screenshot",
    ideUnderHoodSummary: "How it works under the hood",
    ideUnderHoodImageAlt:
      "Request flow: IDE/Agent → ydb-qdrant (Node.js) → YDB vectors + index",
    optionsTitle: "Options",
    optionsSelfHost: "Self‑host: http://localhost:8080/",
    optionsHosted: "Hosted demo endpoint for IDEs:",
    demoUrl,
    docsTitle: "Docs",
    docsLinks,
    selfHostedNodeBlock,
    dockerBlock,
    npmBlock,
    tabPublicDemoTitle: "Public Demo",
    tabSelfHostedTitle: "Self-hosted Node",
    tabDockerTitle: "Docker",
    tabNpmTitle: "NPM Package",
  };
};

export const gettingStartedSectionRuProps = (): Omit<
  GettingStartedSectionBaseProps,
  "ideDetailsRef" | "activeTab" | "onTabChange" | "sectionRef" | "onCopyDemoUrl"
> => {
  const demoUrl = DEMO_URL;
  const docsLinks: DocsLink[] = [
    { href: "/docs/", label: "Диаграммы сервиса (C4 + ER)" },
    {
      href: "https://ydb.tech/docs/en/",
      label: "Документация YDB (обзор)",
    },
    {
      href: "https://ydb.tech/docs/en/yql/reference/",
      label: "Справочник YQL",
    },
    {
      href: "https://ydb.tech/docs/en/concepts/vector_search",
      label: "Векторный поиск (приближённый)",
    },
    {
      href: "https://ydb.tech/docs/en/dev/vector-indexes",
      label: "Векторные индексы (vector_kmeans_tree)",
    },
    {
      href: "https://cloud.yandex.com/en/docs/ydb/",
      label: "Документация YDB Cloud",
    },
    {
      href: "https://www.npmjs.com/package/ydb-qdrant",
      label: "npm: ydb-qdrant",
    },
  ];

  const selfHostedNodeBlock: ReactNode = (
    <>
      <h3 className="card-title">Самостоятельный хостинг (Node.js)</h3>
      <ol className="muted">
        <li>
          Клонируйте репозиторий и установите зависимости:{" "}
          <code>npm install</code>
        </li>
        <li>
          Укажите переменные окружения: <code>YDB_ENDPOINT</code>,{" "}
          <code>YDB_DATABASE</code>
        </li>
        <li>
          Настройте аутентификацию через переменные окружения:{" "}
          <code>YDB_SERVICE_ACCOUNT_KEY_FILE_CREDENTIALS</code> |{" "}
          <code>YDB_METADATA_CREDENTIALS</code> |{" "}
          <code>YDB_ACCESS_TOKEN_CREDENTIALS</code> |{" "}
          <code>YDB_ANONYMOUS_CREDENTIALS</code>
        </li>
        <li>
          Запустите: <code>npm run dev</code> (разработка) или{" "}
          <code>npm start</code> (прод)
        </li>
        <li>
          Укажите клиенту базовый URL: <code>http://localhost:8080</code>
        </li>
      </ol>
      <p className="muted">
        Также можно запускать как контейнер (Docker или docker-compose) с
        публичным образом <code>ghcr.io/astandrik/ydb-qdrant:latest</code>.
      </p>
    </>
  );

  const dockerBlock: ReactNode = (
    <>
      <h3 className="card-title">Запуск через Docker / docker-compose</h3>
      <ol className="muted">
        <li>
          Скачайте образ:{" "}
          <code>docker pull ghcr.io/astandrik/ydb-qdrant:latest</code>
        </li>
        <li>
          Запустите через Docker:{" "}
          <code>
            docker run -d --name ydb-qdrant -p 8080:8080
            ghcr.io/astandrik/ydb-qdrant:latest
          </code>
        </li>
        <li>
          Или через docker-compose: <code>docker-compose up -d</code> с
          примером конфигурации из README.
        </li>
      </ol>
      <p className="muted">
        Подробнее и все примеры:{" "}
        <a
          href="https://github.com/astandrik/ydb-qdrant#docker-self-hosted-http-server"
          target="_blank"
          rel="noopener"
          onClick={() =>
            trackGoal("github_readme_click", { source: "getting_started_ru" })
          }
        >
          GitHub README
        </a>
      </p>
    </>
  );

  const npmBlock: ReactNode = (
    <>
      <h3 className="card-title">Использование как Node.js библиотеки</h3>
      <ol className="muted">
        <li>
          Установка: <code>npm install ydb-qdrant</code>
        </li>
        <li>
          Использование:
          <pre>
            <code>
              {`import { createYdbQdrantClient } from "ydb-qdrant";

const client = createYdbQdrantClient({
  endpoint: "grpcs://ydb.serverless.yandexcloud.net:2135",
  database: "/ru-central1/...",
  token: "..."
});`}
            </code>
          </pre>
        </li>
      </ol>
      <p className="muted">
        См.{" "}
        <a
          href="https://www.npmjs.com/package/ydb-qdrant"
          target="_blank"
          rel="noopener"
        >
          npm package
        </a>{" "}
        для подробностей.
      </p>
    </>
  );

  return {
    title: "Быстрый старт",
    ideConfigSummary: "Настройка в Roo Code/Kilo Code",
    ideConfigDescription: (
      <p className="muted">
        Публичный demo‑endpoint для IDE: <code>{DEMO_URL}</code> (вставьте в
        IDE/агент как базовый URL Qdrant).
      </p>
    ),
    ideConfigImageAlt: "Скриншот конфигурации IDE-агента",
    ideUnderHoodSummary: "Как это работает под капотом",
    ideUnderHoodImageAlt:
      "Поток запросов: IDE/Agent → ydb-qdrant (Node.js) → YDB векторы + индекс",
    optionsTitle: "Варианты",
    optionsSelfHost: "Самостоятельный хостинг: http://localhost:8080/",
    optionsHosted: "Публичный demo‑endpoint для IDE:",
    demoUrl,
    docsTitle: "Документация",
    docsLinks,
    selfHostedNodeBlock,
    dockerBlock,
    npmBlock,
    tabPublicDemoTitle: "Публичное демо",
    tabSelfHostedTitle: "Self-hosted Node",
    tabDockerTitle: "Docker",
    tabNpmTitle: "NPM пакет",
  };
};
