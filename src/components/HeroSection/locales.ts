import type { HeroContent, HeroSectionBaseProps } from "./HeroSection";

export type HeroSectionPublicProps = Omit<HeroSectionBaseProps, "content">;

export const heroSectionEnContent: HeroContent = {
  title: "Qdrant API on YDB",
  logoAlt: "YDB Qdrant logo",
  lead: "Qdrant‑compatible REST API service and Node.js library for storing vectors in YDB with exact top‑k search over a global one-table layout — no separate vector database cluster.",
  primaryCtaLabel: "Get Started",
  secondaryCtaLabel: "Explore on GitHub",
  docsLabel: "Architecture & diagrams →",
  demoPrefix: "Public demo Qdrant base URL:",
  demoButtonLabel: "Copy",
  footnote:
    "Ideal as a drop‑in Qdrant base URL for IDE agents (Roo Code, Cline), RAG services, and million‑vector YDB-backed collections.",
};

export const heroSectionRuContent: HeroContent = {
  title: "Qdrant API на YDB",
  logoAlt: "Логотип YDB Qdrant",
  lead: "Qdrant‑совместимый REST API сервис и Node.js‑библиотека для хранения векторов в YDB с точным top‑k поиском поверх глобальной one-table схемы — без отдельного кластера векторной БД.",
  primaryCtaLabel: "Быстрый старт",
  secondaryCtaLabel: "Изучить на GitHub",
  docsLabel: "Архитектура и диаграммы →",
  demoPrefix: "Публичный demo‑endpoint:",
  demoButtonLabel: "Копировать",
  footnote:
    "Идеально как базовый URL Qdrant для IDE‑агентов (Roo Code, Cline), RAG‑сервисов и коллекций на миллионы векторов в YDB.",
};
