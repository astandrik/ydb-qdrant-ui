import type { Section, DocsPageBaseProps } from "./DocsPage";

const sectionsEn: Section[] = [
  {
    title: "Context (C4)",
    figures: [
      {
        src: "/assets/C4_Context.svg",
        alt: "C4 context diagram for YDB Qdrant-compatible service",
        caption: "High-level C4 context diagram.",
      },
    ],
  },
  {
    title: "Containers",
    figures: [
      {
        src: "/assets/C4_Container.svg",
        alt: "C4 container diagram for YDB-Qdrant service components",
        caption:
          "C4 container diagram showing service components, repositories, YDB client, and YDB with one-table layout.",
      },
    ],
  },
  {
    title: "Components",
    figures: [
      {
        src: "/assets/C4-Component-API-Server.svg",
        alt: "Component diagram of the REST API Server (Express application)",
        caption:
          "REST API server components: Express app, request logger, health endpoint, collections and points routers.",
      },
      {
        src: "/assets/C4-Component-Repository-Layer.svg",
        alt: "Component diagram of the repository layer",
        caption:
          "Repository layer: collections/points repositories with one-table layout, tenant utilities, and schema manager.",
      },
      {
        src: "/assets/C4-Component-YDB-Integration.svg",
        alt: "Component diagram of the YDB integration layer",
        caption:
          "YDB integration components: YDB driver, helpers, schema manager, environment config, logger, and database.",
      },
    ],
  },
  {
    title: "Entity–Relationship (ER) diagram",
    figures: [
      {
        src: "/assets/ER_Diagram.svg",
        alt: "ER diagram of YDB tables used by the service",
        caption: "ER diagram: qdrant_all_points global table with YDB auto-partitioning, plus collections metadata.",
      },
    ],
  },
];

const sectionsRu: Section[] = [
  {
    title: "Контекст (C4)",
    figures: [
      {
        src: "/assets/C4_Context.svg",
        alt: "Контекстная C4-диаграмма сервиса YDB Qdrant-совместимого API",
        caption: "Высокоуровневая C4-диаграмма контекста.",
      },
    ],
  },
  {
    title: "Контейнеры",
    figures: [
      {
        src: "/assets/C4_Container.svg",
        alt: "Диаграмма контейнеров C4 для компонентов сервиса YDB-Qdrant",
        caption:
          "Диаграмма контейнеров C4: компоненты сервиса, репозитории, YDB-клиент и YDB с one-table layout.",
      },
    ],
  },
  {
    title: "Компоненты",
    figures: [
      {
        src: "/assets/C4-Component-API-Server.svg",
        alt: "Диаграмма компонентов REST API-сервера (приложение Express)",
        caption:
          "Компоненты REST API-сервера: приложение Express, логгер запросов, endpoint /health, роутеры коллекций и точек.",
      },
      {
        src: "/assets/C4-Component-Repository-Layer.svg",
        alt: "Диаграмма компонентов слоя репозиториев",
        caption:
          "Слой репозиториев: репозитории коллекций и точек с однотабличным хранением, утилиты по тенантам и менеджер схем.",
      },
      {
        src: "/assets/C4-Component-YDB-Integration.svg",
        alt: "Диаграмма компонентов интеграции с YDB",
        caption:
          "Компоненты интеграции с YDB: драйвер YDB, хелперы, менеджер схем, конфигурация окружения, логгер и база данных.",
      },
    ],
  },
  {
    title: "Диаграмма связей сущностей (ER)",
    figures: [
      {
        src: "/assets/ER_Diagram.svg",
        alt: "ER-диаграмма таблиц YDB, используемых сервисом",
        caption: "ER-диаграмма: глобальная таблица qdrant_all_points с YDB auto-partitioning и метаданные коллекций.",
      },
    ],
  },
];

export const docsPageEnProps: DocsPageBaseProps = {
  title: "Architecture diagrams",
  lead: "Pre‑rendered diagrams generated from the PlantUML sources in schemas/ via npm run diagrams.",
  demoPrefix: "Public demo Qdrant base URL:",
  copyButtonLabel: "Copy",
  copySuccessLabel: "Copied!",
  metricsPageName: "docs",
  sections: sectionsEn,
  backLinkText: "Back to main page",
};

export const docsPageRuProps: DocsPageBaseProps = {
  title: "Диаграммы архитектуры",
  lead: "Предварительно отрисованные диаграммы, сгенерированные из PlantUML-схем в каталоге schemas/ через npm run diagrams.",
  demoPrefix: "Публичный demo-endpoint Qdrant:",
  copyButtonLabel: "Копировать",
  copySuccessLabel: "Скопировано!",
  metricsPageName: "docs",
  sections: sectionsRu,
  backLinkText: "Назад на главную",
};
