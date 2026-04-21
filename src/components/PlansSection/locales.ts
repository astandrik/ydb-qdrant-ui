import type { PlansSectionBaseProps } from "./PlansSection";

export const plansSectionEnProps: PlansSectionBaseProps = {
  title: "Plans",
  items: [
    "Stronger per-tenant authentication (IAM/OAuth binding, per‑collection ACLs) beyond the current api-key/userUid namespace isolation.",
    "Quotas and rate limiting per tenant (collections, RPS, payload and batch sizes) plus richer audit logging.",
    "Operational presets for million‑vector deployments: capacity planning, load-test profiles, and SLO dashboards.",
    "Lower latency for high‑throughput workloads through query tuning, batching, and scaling patterns.",
    "Extending Qdrant API coverage on YDB (broader filters, facets, recommend/discover, batch search and other advanced modes).",
    "Hybrid search combining vector similarity with payload filtering for more precise retrieval.",
  ],
};

export const plansSectionRuProps: PlansSectionBaseProps = {
  title: "Планы",
  items: [
    "Усиление аутентификации по тенантам (IAM/OAuth, ACL на коллекции) поверх текущей namespace-изоляции через api-key/userUid.",
    "Квоты и rate limiting по тенантам (коллекции, RPS, размеры payload и батчей) плюс расширенный аудит операций.",
    "Операционные профили для deployment с миллионами векторов: capacity planning, load-тесты и SLO-дашборды.",
    "Снижение задержек для высоконагруженных сценариев через тюнинг запросов, батчинг и scaling patterns.",
    "Расширение покрытия Qdrant API на YDB (более широкие фильтры, facets, recommend/discover, batch‑поиск и др. расширенные режимы).",
    "Гибридный поиск, сочетающий векторное сходство с фильтрацией по payload для более точной выборки.",
  ],
};
