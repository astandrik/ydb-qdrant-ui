import type { WhereSectionBaseProps } from "./WhereSection";

export const whereSectionEnProps: WhereSectionBaseProps = {
  title: "Where it fits best",
  heading: "Great for",
  items: [
    "Prototyping and experiments with vector search on YDB.",
    "Datasets roughly up to 10K–50K vectors per collection.",
    "IDE agents (Roo Code, Cline) expecting a Qdrant API.",
    "Apps that already use YDB and need a quick vector API (HTTP or in‑process via the ydb-qdrant Node.js package).",
  ],
};

export const whereSectionRuProps: WhereSectionBaseProps = {
  title: "Где лучше всего подходит",
  heading: "Отлично подходит",
  items: [
    "Для прототипов и экспериментов с векторным поиском на YDB.",
    "Для коллекций примерно до 10K–50K векторов.",
    "Для IDE‑агентов (Roo Code, Cline), ожидающих Qdrant API.",
    "Для сервисов, которые уже используют YDB и хотят быстро добавить векторный поиск (через HTTP или как Node.js‑пакет ydb-qdrant).",
  ],
};

