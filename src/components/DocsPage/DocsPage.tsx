import type { MouseEvent } from "react";
import Image from "next/image";
import { trackGoal } from "@/shared/utils/metricsManager";

export const DEMO_URL = "http://ydb-qdrant.tech:8080";

export type Figure = {
  src: string;
  alt: string;
  caption: string;
};

export type Section = {
  title: string;
  figures: Figure[];
};

export type DocsPageBaseProps = {
  title: string;
  lead: string;
  demoPrefix: string;
  copyButtonLabel: string;
  copySuccessLabel: string;
  metricsPageName: string;
  sections: Section[];
};

export const DocsPageBase = ({
  title,
  lead,
  demoPrefix,
  copyButtonLabel,
  copySuccessLabel,
  metricsPageName,
  sections,
}: DocsPageBaseProps) => {
  const handleCopy = async (text: string, e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const originalText = btn.textContent;

    const trackCopy = (success: boolean) => {
      trackGoal("demo_url_copy", {
        page: metricsPageName,
        area: "hero",
        success,
      });
    };

    const showFeedback = () => {
      btn.textContent = copySuccessLabel;
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

  return (
    <main className="wrap">
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
      <p className="hero-demo">
        {demoPrefix} <code>{DEMO_URL}</code>
        <button
          type="button"
          className="copy-btn"
          onClick={(e) => handleCopy(DEMO_URL, e)}
        >
          {copyButtonLabel}
        </button>
      </p>

      {sections.map((section) => (
        <section className="section" key={section.title}>
          <h2 className="section-title">{section.title}</h2>
          {section.figures.map((figure) => (
            <figure style={{ margin: "24px 0" }} key={figure.src}>
              <Image
                src={figure.src}
                alt={figure.alt}
                width={960}
                height={540}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  border: "1px solid #19212b",
                  borderRadius: "8px",
                  display: "block",
                  margin: "0 auto",
                }}
                unoptimized
              />
              <figcaption className="muted">{figure.caption}</figcaption>
            </figure>
          ))}
        </section>
      ))}
    </main>
  );
};


