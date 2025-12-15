import type { PlansSectionBaseProps } from "./PlansSection";

export const plansSectionEnProps: PlansSectionBaseProps = {
  title: "Plans",
  items: [
    "Stronger per-tenant authentication (IAM/OAuth binding, per‑collection ACLs) beyond the existing X‑Tenant‑Id header and forTenant() API.",
    "Quotas and rate limiting per tenant (collections, RPS, payload and batch sizes) plus richer audit logging.",
    "Support for larger collections (>100K vectors) via index tuning and YDB auto-partitioning optimizations.",
    "Better support for high‑throughput, multi‑million‑vector search with tighter latency through scaling patterns.",
    "Extending Qdrant API coverage on YDB (filters, facets, recommend/discover, batch search and other advanced modes).",
    "Hybrid search combining vector similarity with payload filtering for more precise retrieval.",
  ],
};

export const plansSectionRuProps: PlansSectionBaseProps = {
  title: "Планы",
  items: [
    "Усиление аутентификации по тенантам (IAM/OAuth, ACL на коллекции) поверх уже реализованных X‑Tenant‑Id и forTenant() API.",
    "Квоты и rate limiting по тенантам (коллекции, RPS, размеры payload и батчей) плюс расширенный аудит операций.",
    "Поддержка больших коллекций (>100K векторов) через тюнинг индексов и оптимизацию auto-partitioning YDB.",
    "Лучшая поддержка высоконагруженных сценариев с миллионами векторов и более жёсткими требованиями по задержкам.",
    "Расширение покрытия Qdrant API на YDB (фильтры, facets, recommend/discover, batch‑поиск и др. расширенные режимы).",
    "Гибридный поиск, сочетающий векторное сходство с фильтрацией по payload для более точной выборки.",
  ],
};
