"use client";

import { useCallback, useId, useMemo } from "react";
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
  ASK_AI_PROVIDERS_BY_ID,
  buildAskAIProviderLinks,
  type AskAIProviderId,
} from "@/components/AskAI/ask-ai-links";
import "./AskAIPanel.scss";

type AskAIPanelProps = {
  productName: string;
  productId: string;
  label: string;
  helperText: string;
  providerAriaLabelTemplate: string;
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
  providerAriaLabelTemplate,
  prompt,
  page,
  promptVariant,
  className,
}: AskAIPanelProps) {
  const titleId = useId();
  const links = useMemo(() => buildAskAIProviderLinks(prompt), [prompt]);

  const trackClick = useCallback((provider: AskAIProviderId) => {
    trackGoal("ask_ai_click", {
      product: productId,
      page,
      provider,
      prompt_variant: promptVariant,
    });
  }, [page, productId, promptVariant]);

  return (
    <Card
      type="container"
      className={className ? `ask-ai-panel ${className}` : "ask-ai-panel"}
    >
      <div className="ask-ai-panel__content">
        <div className="ask-ai-panel__body">
          <h2 className="ask-ai-panel__title" id={titleId}>
            {label}
          </h2>
          <p className="ask-ai-panel__helper">{helperText}</p>
        </div>
        <ul className="ask-ai-panel__links" aria-labelledby={titleId}>
          {links.map((link) => {
            const provider = ASK_AI_PROVIDERS_BY_ID.get(link.id);

            return (
              <li className="ask-ai-panel__link-item" key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ask-ai-panel__link ask-ai-panel__link--${provider?.tone ?? "white"}`}
                  aria-label={formatProviderAriaLabel(
                    providerAriaLabelTemplate,
                    link.label,
                    productName,
                  )}
                  title={link.label}
                  onClick={() => trackClick(link.id)}
                >
                  <AskAIProviderIcon provider={link.id} />
                  <span className="ask-ai-panel__link-text">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
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
    default:
      return null;
  }
}

function formatProviderAriaLabel(
  template: string,
  providerLabel: string,
  productName: string,
) {
  return template
    .replace("{provider}", providerLabel)
    .replace("{product}", productName);
}
