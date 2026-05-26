export type AskAIProviderId =
  | "chatgpt"
  | "perplexity"
  | "claude"
  | "google-ai-mode"
  | "grok";

export type AskAIProviderTone = "mint" | "teal" | "coral" | "white";

export type AskAIProvider = {
  id: AskAIProviderId;
  label: string;
  tone: AskAIProviderTone;
  urlPrefix: string;
};

export type AskAIProviderLink = {
  id: AskAIProviderId;
  label: string;
  href: string;
};

export const ASK_AI_PROVIDERS: AskAIProvider[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    tone: "mint",
    urlPrefix: "https://chat.openai.com/?q=",
  },
  {
    id: "perplexity",
    label: "Perplexity",
    tone: "teal",
    urlPrefix: "https://www.perplexity.ai/search/new?q=",
  },
  {
    id: "claude",
    label: "Claude",
    tone: "coral",
    urlPrefix: "https://claude.ai/new?q=",
  },
  {
    id: "google-ai-mode",
    label: "Google AI Mode",
    tone: "white",
    urlPrefix: "https://www.google.com/search?udm=50&aep=11&q=",
  },
  {
    id: "grok",
    label: "Grok",
    tone: "white",
    urlPrefix: "https://grok.com/?q=",
  },
];

export function buildAskAIProviderLinks(
  prompt: string,
): AskAIProviderLink[] {
  const encodedPrompt = encodeURIComponent(prompt);

  return ASK_AI_PROVIDERS.map((provider) => ({
    id: provider.id,
    label: provider.label,
    href: `${provider.urlPrefix}${encodedPrompt}`,
  }));
}
