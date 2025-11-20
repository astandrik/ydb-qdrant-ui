import type { WhySectionBaseProps } from "./WhySection";

export const whySectionEnProps: Omit<WhySectionBaseProps, "title" | "cards"> & {
  title: string;
  cards: WhySectionBaseProps["cards"];
} = {
  title: "Why YDB‑Qdrant",
  cards: [
    {
      title: "Transactional & consistent",
      body:
        "Built on YDB's distributed ACID transactions with Serializable isolation, so vectors live next to your source‑of‑truth data.",
    },
    {
      title: "Single data platform",
      body:
        "Store business rows, events, and vector embeddings together in YDB and query everything with one YQL engine.",
    },
    {
      title: "Reliability & operations",
      body:
        "Reuse YDB's multi‑AZ setups, backup/restore, and disaster recovery instead of operating a separate Qdrant cluster.",
    },
    {
      title: "Secure tenancy path",
      body:
        "Per‑tenant isolation via X‑Tenant‑Id header today, with a clear path to IAM/OAuth‑based tenancy in internal deployments.",
    },
  ],
};

export const whySectionRuProps: Omit<WhySectionBaseProps, "title" | "cards"> & {
  title: string;
  cards: WhySectionBaseProps["cards"];
} = {
  title: "Почему YDB‑Qdrant",
  cards: [
    {
      title: "Транзакционность и консистентность",
      body:
        "Сервис опирается на распределённые ACID‑транзакции YDB с изоляцией Serializable, поэтому векторы живут рядом с основными бизнес‑данными.",
    },
    {
      title: "Единая платформа данных",
      body:
        "Строки, события и векторы хранятся в одной базе YDB, запросы пишутся на YQL, без отдельного движка векторной БД.",
    },
    {
      title: "Надёжность и эксплуатация",
      body:
        "Используйте multi‑AZ, backup/restore и disaster recovery YDB вместо самостоятельной эксплуатации кластера Qdrant.",
    },
    {
      title: "Путь к безопасной мультитенантности",
      body:
        "Сейчас изоляция по арендаторам через заголовок X‑Tenant‑Id; далее — IAM/OAuth и ACL на коллекции для внутренних сценариев.",
    },
  ],
};

