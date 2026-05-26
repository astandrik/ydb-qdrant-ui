"use client";

import {
  SiClaude,
  SiGooglegemini,
  SiOpenai,
  SiPerplexity,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Card } from "@gravity-ui/uikit";

import { trackGoal } from "@/shared/utils/metricsManager";
import {
  ASK_AI_PROVIDERS,
  buildAskAIProviderLinks,
  type AskAIProviderId,
} from "@/components/AskAI/ask-ai-links";
import "./AskAIPanel.scss";

type AskAIPanelProps = {
  productName: string;
  productId: string;
  label: string;
  helperText: string;
  prompt: string;
  page: string;
  promptVariant: string;
  className?: string;
};

export function AskAIPanel({
  productName,
  productId,
  label,
  helperText,
  prompt,
  page,
  promptVariant,
  className,
}: AskAIPanelProps) {
  const links = buildAskAIProviderLinks(prompt);
  const providersById = new Map(
    ASK_AI_PROVIDERS.map((provider) => [provider.id, provider]),
  );

  function trackClick(provider: AskAIProviderId) {
    trackGoal("ask_ai_click", {
      product: productId,
      page,
      provider,
      prompt_variant: promptVariant,
    });
  }

  return (
    <Card
      type="container"
      className={className ? `ask-ai-panel ${className}` : "ask-ai-panel"}
    >
      <div className="ask-ai-panel__content">
        <div className="ask-ai-panel__body">
          <h2 className="ask-ai-panel__title">{label}</h2>
          <p className="ask-ai-panel__helper">{helperText}</p>
        </div>
        <div className="ask-ai-panel__links" aria-label={label}>
          {links.map((link) => {
            const provider = providersById.get(link.id);

            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`ask-ai-panel__link ask-ai-panel__link--${provider?.tone ?? "white"}`}
                aria-label={`Ask ${link.label} about ${productName}`}
                title={link.label}
                onClick={() => trackClick(link.id)}
              >
                <AskAIProviderIcon provider={link.id} />
                <span className="ask-ai-panel__link-text">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function AskAIProviderIcon({ provider }: { provider: AskAIProviderId }) {
  switch (provider) {
    case "chatgpt":
      return <SiOpenai aria-hidden="true" size={22} />;
    case "perplexity":
      return <SiPerplexity aria-hidden="true" size={22} />;
    case "claude":
      return <SiClaude aria-hidden="true" size={22} />;
    case "google-ai-mode":
      return <SiGooglegemini aria-hidden="true" size={22} />;
    case "grok":
      return <SiX aria-hidden="true" size={22} />;
  }
}
