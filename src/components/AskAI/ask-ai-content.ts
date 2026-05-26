export const ASK_AI_PRODUCT_ID = "ydb-qdrant";
export const ASK_AI_PRODUCT_NAME = "YDB-Qdrant";
export const ASK_AI_PROMPT_VARIANT = "infra_evaluation_v1";
export const ASK_AI_CODE_INDEXER_PRODUCT_ID = "code-indexer";
export const ASK_AI_CODE_INDEXER_PRODUCT_NAME = "Code Indexer";
export const ASK_AI_CODE_INDEXER_PROMPT_VARIANT = "code_memory_eval_v1";

export const ASK_AI_PROMPT =
  "Act as a backend and AI infrastructure engineer evaluating vector search options for an application that already uses YDB. Using current information from https://ydb-qdrant.tech/, explain what YDB-Qdrant is, when it is a good fit compared with standalone Qdrant, how its HTTP server and Node.js library modes work, what its storage and consistency model is, how to get started, and what limitations or trade-offs I should consider before using it.";

export const ASK_AI_CODE_INDEXER_PROMPT =
  "Act as a coding-agent platform engineer evaluating repository memory tools. Using current information from https://ydb-qdrant.tech/code-indexer/, summarize how YDB Qdrant Code Indexer works, what the GitHub App indexes, how the hosted MCP endpoint is used by coding agents, what GitHub permissions it needs, how MCP tokens are created and revoked, what privacy and quota trade-offs matter, and when I should install it.";

export const ASK_AI_HOME_EN = {
  label: "Ask AI about YDB-Qdrant",
  helperText: "Open an AI assistant with a technical evaluation prompt.",
  providerAriaLabelTemplate: "Ask {provider} about {product}",
  page: "/",
  promptVariant: ASK_AI_PROMPT_VARIANT,
  prompt: ASK_AI_PROMPT,
} as const;

export const ASK_AI_HOME_RU = {
  label: "Спросить AI про YDB-Qdrant",
  helperText: "Откройте AI-ассистента с техническим prompt для оценки.",
  providerAriaLabelTemplate: "Спросить {provider} про {product}",
  page: "/ru/",
  promptVariant: ASK_AI_PROMPT_VARIANT,
  prompt: ASK_AI_PROMPT,
} as const;

export const ASK_AI_DOCS_EN = {
  label: "Ask AI about YDB-Qdrant",
  helperText: "Open an AI assistant with a technical evaluation prompt.",
  providerAriaLabelTemplate: "Ask {provider} about {product}",
  page: "/docs/",
  promptVariant: ASK_AI_PROMPT_VARIANT,
  prompt: ASK_AI_PROMPT,
} as const;

export const ASK_AI_DOCS_RU = {
  label: "Спросить AI про YDB-Qdrant",
  helperText: "Откройте AI-ассистента с техническим prompt для оценки.",
  providerAriaLabelTemplate: "Спросить {provider} про {product}",
  page: "/ru/docs/",
  promptVariant: ASK_AI_PROMPT_VARIANT,
  prompt: ASK_AI_PROMPT,
} as const;

export const ASK_AI_CODE_INDEXER = {
  label: "Ask AI about Code Indexer",
  helperText:
    "Open an AI assistant with a product evaluation prompt before installing the GitHub App.",
  providerAriaLabelTemplate: "Ask {provider} about {product}",
  page: "/code-indexer/",
  promptVariant: ASK_AI_CODE_INDEXER_PROMPT_VARIANT,
  prompt: ASK_AI_CODE_INDEXER_PROMPT,
} as const;
