export type AskAIProviderId =
  | "chatgpt"
  | "perplexity"
  | "claude"
  | "deepseek"
  | "google-ai-mode"
  | "grok";

export type AskAIProviderTone = "mint" | "teal" | "coral" | "white";

export type AskAIProvider = {
  id: AskAIProviderId;
  label: string;
  tone: AskAIProviderTone;
  prefillMode: "url" | "clipboard";
  href: string;
};

export type AskAIProviderLink = {
  id: AskAIProviderId;
  label: string;
  href: string;
  prefillMode: AskAIProvider["prefillMode"];
};

export const ASK_AI_PROVIDERS: AskAIProvider[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    tone: "mint",
    prefillMode: "url",
    href: "https://chat.openai.com/?q=",
  },
  {
    id: "perplexity",
    label: "Perplexity",
    tone: "teal",
    prefillMode: "url",
    href: "https://www.perplexity.ai/search/new?q=",
  },
  {
    id: "claude",
    label: "Claude",
    tone: "coral",
    prefillMode: "url",
    href: "https://claude.ai/new?q=",
  },
  {
    id: "deepseek",
    label: "DeepSeek",
    tone: "white",
    prefillMode: "clipboard",
    href: "https://chat.deepseek.com/",
  },
  {
    id: "google-ai-mode",
    label: "Google AI Mode",
    tone: "white",
    prefillMode: "url",
    href: "https://www.google.com/search?udm=50&aep=11&q=",
  },
  {
    id: "grok",
    label: "Grok",
    tone: "white",
    prefillMode: "url",
    href: "https://grok.com/?q=",
  },
];

export const ASK_AI_PROVIDERS_BY_ID: ReadonlyMap<
  AskAIProviderId,
  AskAIProvider
> = new Map(
  ASK_AI_PROVIDERS.map((provider) => [provider.id, provider] as const),
);

export function buildAskAIProviderLinks(
  prompt: string,
): AskAIProviderLink[] {
  const encodedPrompt = encodeURIComponent(prompt);

  return ASK_AI_PROVIDERS.map((provider) => ({
    id: provider.id,
    label: provider.label,
    href:
      provider.prefillMode === "url"
        ? `${provider.href}${encodedPrompt}`
        : provider.href,
    prefillMode: provider.prefillMode,
  }));
}
