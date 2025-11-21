import type { ReactNode, RefObject } from "react";
import React from "react";
import type {
  GettingStartedSectionBaseProps,
  DocsLink,
} from "./GettingStartedSection";

const DEMO_URL = "http://ydb-qdrant.tech:8080";

export type GettingStartedSectionProps = {
  ideDetailsRef: RefObject<HTMLDetailsElement | null>;
};

export const gettingStartedSectionEnProps = (): Omit<
  GettingStartedSectionBaseProps,
  "ideDetailsRef"
> => {
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

  const selfHostedBlock: ReactNode = (
    <>
      <strong>Configure self‑hosted</strong>
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
        Details:{" "}
        <a
          href="https://github.com/astandrik/ydb-qdrant"
          target="_blank"
          rel="noopener"
        >
          GitHub README
        </a>
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
    optionsHosted: (
      <>
        Hosted demo endpoint for IDEs:{" "}
        <a href={`${DEMO_URL}/`} target="_blank" rel="noopener">
          {DEMO_URL}/
        </a>{" "}
        (copy into IDE/agent as Qdrant base URL)
      </>
    ),
    docsTitle: "Docs",
    docsLinks,
    selfHostedBlock,
  };
};

export const gettingStartedSectionRuProps = (): Omit<
  GettingStartedSectionBaseProps,
  "ideDetailsRef"
> => {
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

  const selfHostedBlock: ReactNode = (
    <>
      <strong>Самостоятельный хостинг</strong>
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
        Подробнее:{" "}
        <a
          href="https://github.com/astandrik/ydb-qdrant"
          target="_blank"
          rel="noopener"
        >
          GitHub README
        </a>
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
    optionsHosted: (
      <>
        Хостируемый demo‑endpoint для IDE:{" "}
        <a href={`${DEMO_URL}/`} target="_blank" rel="noopener">
          {DEMO_URL}/
        </a>{" "}
        (скопируйте в IDE/агент как базовый URL Qdrant)
      </>
    ),
    docsTitle: "Документация",
    docsLinks,
    selfHostedBlock,
  };
};

