"use client";

import { Button, Icon } from "@gravity-ui/uikit";
import { ArrowRight } from "@gravity-ui/icons";
import { AskAIPanel } from "@/components/AskAI";
import {
  ASK_AI_CODE_INDEXER,
  ASK_AI_CODE_INDEXER_PRODUCT_ID,
  ASK_AI_CODE_INDEXER_PRODUCT_NAME,
} from "@/components/AskAI/ask-ai-content";
import { trackGoal } from "@/shared/utils/metricsManager";
import {
  buildCodeIndexerLoginUrl,
  CODE_INDEXER_INSTALL_URL,
} from "./constants";

function trackCodeIndexerFunnel(goal: string, source: string) {
  trackGoal(goal, {
    product: ASK_AI_CODE_INDEXER_PRODUCT_ID,
    page: ASK_AI_CODE_INDEXER.page,
    source,
  });
}

export function CodeIndexerHeroActions() {
  return (
    <div className="code-indexer__actions">
      <Button
        href={CODE_INDEXER_INSTALL_URL}
        target="_blank"
        rel="noopener noreferrer"
        size="xl"
        view="action"
        onClick={() => trackCodeIndexerFunnel("github_app_install_click", "hero")}
      >
        Install GitHub App
        <Icon data={ArrowRight} size={18} />
      </Button>
      <Button
        href={buildCodeIndexerLoginUrl()}
        size="xl"
        view="outlined"
        onClick={() => trackCodeIndexerFunnel("dashboard_oauth_start", "hero")}
      >
        Open dashboard
      </Button>
    </div>
  );
}

export function CodeIndexerAskAI({ contextId }: { contextId: string }) {
  return (
    <AskAIPanel
      productName={ASK_AI_CODE_INDEXER_PRODUCT_NAME}
      productId={ASK_AI_CODE_INDEXER_PRODUCT_ID}
      label={ASK_AI_CODE_INDEXER.label}
      helperText={ASK_AI_CODE_INDEXER.helperText}
      providerAriaLabelTemplate={ASK_AI_CODE_INDEXER.providerAriaLabelTemplate}
      prompt={ASK_AI_CODE_INDEXER.prompt}
      page={ASK_AI_CODE_INDEXER.page}
      promptVariant={ASK_AI_CODE_INDEXER.promptVariant}
      contextId={contextId}
      className="code-indexer__ask-ai"
    />
  );
}
