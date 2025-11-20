import type { MouseEvent } from "react";
import { trackGoal } from "@/shared/utils/metricsManager";

type CopyToClipboardOptions = {
  page: string;
  area: string;
  successLabel: string;
};

export function createCopyToClipboardHandler({
  page,
  area,
  successLabel,
}: CopyToClipboardOptions) {
  return async (text: string, e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const originalText = btn.textContent;

    const trackCopy = (success: boolean) => {
      trackGoal("demo_url_copy", { page, area, success });
    };

    const showFeedback = () => {
      btn.textContent = successLabel;
      btn.style.background = "var(--acc)";
      btn.style.color = "#041013";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "transparent";
        btn.style.color = "var(--acc)";
      }, 2000);
    };

    function fallbackCopy(val: string) {
      try {
        const ta = document.createElement("textarea");
        ta.value = val;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        trackCopy(ok);
        if (ok) showFeedback();
      } catch {
        trackCopy(false);
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        trackCopy(true);
        showFeedback();
      } catch {
        fallbackCopy(text);
      }
    } else {
      fallbackCopy(text);
    }
  };
}
