import type { HeroContent, HeroSectionBaseProps } from "./HeroSection";

export type HeroSectionPublicProps = Omit<HeroSectionBaseProps, "content">;

export const heroSectionEnContent: HeroContent = {
  title: "Qdrant API on YDB",
  logoAlt: "YDB Qdrant logo",
  lead: "Run a minimal Qdrant‑compatible REST API that stores and searches vectors directly in YDB — no separate vector database cluster.",
  primaryCtaLabel: "Get Started",
  secondaryCtaLabel: "Explore on GitHub",
  docsLabel: "Architecture & diagrams →",
  demoPrefix: "Public demo Qdrant base URL:",
  demoButtonLabel: "Copy",
  footnote:
    "Ideal as a drop‑in Qdrant base URL for IDE agents (Roo Code, Cline) and RAG services on YDB.",
};

export const heroSectionRuContent: HeroContent = {
  title: "Qdrant API на YDB",
  logoAlt: "Логотип YDB Qdrant",
  lead: "Совместимый с Qdrant REST API с однофазным top‑k поиском на YDB с перестраивающимся векторным индексом.",
  primaryCtaLabel: "Быстрый старт",
  secondaryCtaLabel: "Изучить на GitHub",
  docsLabel: "Архитектура и диаграммы →",
  demoPrefix: "Публичный demo‑endpoint:",
  demoButtonLabel: "Копировать",
  footnote:
    "Идеально как базовый URL Qdrant для IDE‑агентов (Roo Code, Cline) и RAG‑сервисов на YDB.",
};
