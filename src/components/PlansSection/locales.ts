import type { PlansSectionBaseProps } from "./PlansSection";

export const plansSectionEnProps: PlansSectionBaseProps = {
  title: "Plans",
  items: [
    "Hardening for production workloads with strict SLAs and strong multi‑tenant auth/z (IAM/OAuth, per‑collection ACLs).",
    "Quotas and rate limiting per tenant (collections, RPS, payload and batch sizes) plus richer audit logging.",
    "Support for larger collections (>100K vectors) and frequent bulk upserts via batch‑upsert and index tuning.",
    "Better support for high‑throughput, multi‑million‑vector search with tighter latency through scaling patterns.",
    "Extending Qdrant API coverage on YDB (filters, facets, recommend/discover, batch search and other advanced modes).",
  ],
};

export const plansSectionRuProps: PlansSectionBaseProps = {
  title: "Планы",
  items: [
    "Усиление production‑сценариев с жёсткими SLA и сильной мультитенантной auth/z (IAM/OAuth, ACL на коллекции).",
    "Квоты и rate limiting по арендаторам (коллекции, RPS, размеры payload и батчей) плюс расширенный аудит операций.",
    "Поддержка больших коллекций (>100K векторов) и частых bulk‑upsert через батч‑операции и тюнинг индексов.",
    "Лучшая поддержка высоконагруженных сценариев с миллионами векторов и более жёсткими требованиями по задержкам.",
    "Расширение покрытия Qdrant API на YDB (фильтры, facets, recommend/discover, batch‑поиск и др. расширенные режимы).",
  ],
};
