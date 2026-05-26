import type { LimitationsSectionBaseProps } from "./LimitationsSection";

export const limitationsSectionEnProps: LimitationsSectionBaseProps = {
  title: "When not to use YDB-Qdrant",
  body:
    "YDB-Qdrant is useful when vectors should live close to YDB-backed application data or when you want a Qdrant-compatible API without operating a separate vector database cluster. Standalone Qdrant may be a better fit for workloads that require the full Qdrant feature set, specialized ANN indexing behavior, or a mature dedicated vector search deployment with tuned latency characteristics.",
};

export const limitationsSectionRuProps: LimitationsSectionBaseProps = {
  title: "Когда не стоит использовать YDB-Qdrant",
  body:
    "YDB-Qdrant полезен, когда векторы должны жить рядом с прикладными данными в YDB или когда нужен Qdrant-совместимый API без отдельного кластера векторной базы данных. Standalone Qdrant может лучше подойти для нагрузок, которым нужен полный набор возможностей Qdrant, специализированное поведение ANN-индексов или зрелый выделенный vector search deployment с настроенными характеристиками задержки.",
};
