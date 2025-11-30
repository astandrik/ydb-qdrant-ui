import type { WhySectionBaseProps } from "./WhySection";

export const whySectionEnProps: WhySectionBaseProps = {
  title: "Why YDB‑Qdrant",
  cards: [
    {
      title: "Persistent storage",
      body:
        "All data is written to YDB's distributed storage and survives restarts. No in‑memory‑only mode — your vectors are safe.",
    },
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
    {
      title: "Flexible integration",
      body:
        "Use either the hosted HTTP endpoint or the ydb-qdrant Node.js package directly inside your backend services.",
    },
  ],
  comparisonTitle: "Comparison: YDB-Qdrant vs. Standalone Qdrant",
  comparisonHeaders: {
    feature: "Feature",
    ydbQdrant: "YDB-Qdrant",
    qdrant: "Standalone Qdrant",
  },
  comparisonRows: [
    {
      feature: "Storage Engine",
      ydbQdrant: "YDB (Distributed SQL)",
      qdrant: "RocksDB / In-memory",
    },
    {
      feature: "Consistency",
      ydbQdrant: "Strong (ACID Serializable)",
      qdrant: "Eventual / Tunable",
    },
    {
      feature: "Scalability",
      ydbQdrant: "Horizontal (YDB native)",
      qdrant: "Sharding (manual/managed)",
    },
    {
      feature: "Query Language",
      ydbQdrant: "Qdrant API + YQL",
      qdrant: "Qdrant API (gRPC/REST)",
    },
    {
      feature: "Operational Complexity",
      ydbQdrant: "Low (Reuse YDB ops)",
      qdrant: "Medium (Separate cluster)",
    },
  ],
};

export const whySectionRuProps: WhySectionBaseProps = {
  title: "Почему YDB‑Qdrant",
  cards: [
    {
      title: "Персистентное хранение",
      body:
        "Все данные записываются в распределённое хранилище YDB и сохраняются при перезапусках. Никакого in‑memory режима — ваши векторы в безопасности.",
    },
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
    {
      title: "Гибкая интеграция",
      body:
        "Можно использовать как hosted HTTP‑endpoint, так и Node.js‑пакет ydb-qdrant прямо внутри вашего бэкенда.",
    },
  ],
  comparisonTitle: "Сравнение: YDB-Qdrant vs. Standalone Qdrant",
  comparisonHeaders: {
    feature: "Функция",
    ydbQdrant: "YDB-Qdrant",
    qdrant: "Standalone Qdrant",
  },
  comparisonRows: [
    {
      feature: "Движок хранения",
      ydbQdrant: "YDB (Distributed SQL)",
      qdrant: "RocksDB / In-memory",
    },
    {
      feature: "Консистентность",
      ydbQdrant: "Строгая (ACID Serializable)",
      qdrant: "Eventual / Настраиваемая",
    },
    {
      feature: "Масштабируемость",
      ydbQdrant: "Горизонтальная (YDB)",
      qdrant: "Шардирование (ручное/managed)",
    },
    {
      feature: "Язык запросов",
      ydbQdrant: "Qdrant API + YQL",
      qdrant: "Qdrant API (gRPC/REST)",
    },
    {
      feature: "Сложность эксплуатации",
      ydbQdrant: "Низкая (переиспользование YDB)",
      qdrant: "Средняя (отдельный кластер)",
    },
  ],
};
