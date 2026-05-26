export const ASK_AI_PRODUCT_ID = "ydb-qdrant";
export const ASK_AI_PRODUCT_NAME = "YDB-Qdrant";
export const ASK_AI_PROMPT_VARIANT = "infra_evaluation_v1";

export const ASK_AI_PROMPT =
  "Act as a backend and AI infrastructure engineer evaluating vector search options for an application that already uses YDB. Using current information from https://ydb-qdrant.tech/, explain what YDB-Qdrant is, when it is a good fit compared with standalone Qdrant, how its HTTP server and Node.js library modes work, what its storage and consistency model is, how to get started, and what limitations or trade-offs I should consider before using it.";

export const ASK_AI_HOME_EN = {
  label: "Ask AI about YDB-Qdrant",
  helperText: "Open an AI assistant with a technical evaluation prompt.",
  page: "/",
  promptVariant: ASK_AI_PROMPT_VARIANT,
  prompt: ASK_AI_PROMPT,
} as const;

export const ASK_AI_HOME_RU = {
  label: "Спросить AI про YDB-Qdrant",
  helperText: "Откройте AI-ассистента с техническим prompt для оценки.",
  page: "/ru/",
  promptVariant: ASK_AI_PROMPT_VARIANT,
  prompt: ASK_AI_PROMPT,
} as const;

export const ASK_AI_DOCS_EN = {
  label: "Ask AI about YDB-Qdrant",
  helperText: "Open an AI assistant with a technical evaluation prompt.",
  page: "/docs/",
  promptVariant: ASK_AI_PROMPT_VARIANT,
  prompt: ASK_AI_PROMPT,
} as const;

export const ASK_AI_DOCS_RU = {
  label: "Спросить AI про YDB-Qdrant",
  helperText: "Откройте AI-ассистента с техническим prompt для оценки.",
  page: "/ru/docs/",
  promptVariant: ASK_AI_PROMPT_VARIANT,
  prompt: ASK_AI_PROMPT,
} as const;
