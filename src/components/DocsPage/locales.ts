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
          "C4 container diagram showing service components, repositories, index scheduler, YDB client, and YDB.",
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
          "Repository layer: collections/points repositories, tenant utilities, type/schemas, and schema manager.",
      },
      {
        src: "/assets/C4-Component-Index-Scheduler.svg",
        alt: "Component diagram of the index scheduler",
        caption:
          "Index scheduler components: in-memory scheduler state, notifyUpsert, requestIndexBuild, timer logic, and threshold gate.",
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
        caption: "ER diagram of the YDB metadata and collection tables.",
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
          "Диаграмма контейнеров C4: компоненты сервиса, репозитории, планировщик индексов, YDB-клиент и YDB.",
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
          "Слой репозиториев: репозитории коллекций и точек, утилиты по арендаторам, типы/схемы и менеджер схем.",
      },
      {
        src: "/assets/C4-Component-Index-Scheduler.svg",
        alt: "Диаграмма компонентов планировщика индексов",
        caption:
          "Компоненты планировщика индексов: состояние планировщика в памяти, notifyUpsert, requestIndexBuild, логика таймера и пороговый гейт.",
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
        caption: "ER-диаграмма таблиц метаданных и коллекций YDB.",
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
