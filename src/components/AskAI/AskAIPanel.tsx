"use client";

import type { SVGProps } from "react";
import { useCallback, useId, useMemo } from "react";
import {
  SiClaude,
  SiGooglegemini,
  SiOpenai,
  SiPerplexity,
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
  contextId?: string;
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
  contextId,
}: AskAIPanelProps) {
  const titleId = useId();
  const links = useMemo(() => buildAskAIProviderLinks(prompt), [prompt]);

  const trackClick = useCallback((provider: AskAIProviderId) => {
    trackGoal("ask_ai_click", {
      product: productId,
      page,
      provider,
      prompt_variant: promptVariant,
      ...(contextId ? { context_id: contextId } : {}),
    });
  }, [contextId, page, productId, promptVariant]);

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
      return <GrokMark aria-hidden="true" width={22} height={22} />;
    default:
      return null;
  }
}

function GrokMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" focusable="false" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815"
      />
    </svg>
  );
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
