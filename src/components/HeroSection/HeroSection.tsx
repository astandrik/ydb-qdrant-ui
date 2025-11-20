import type { MouseEvent } from "react";
import Image from "next/image";
import { trackGoal } from "@/shared/utils/metricsManager";

export type HeroContent = {
  title: string;
  logoAlt: string;
  lead: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  docsLabel: string;
  demoPrefix: string;
  demoButtonLabel: string;
  footnote: string;
};

export type HeroSectionBaseProps = {
  content: HeroContent;
  onOpenIdeDetails: (scrollSmooth: boolean) => void;
  onCopyDemoUrl: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const HeroSectionBase = ({
  content,
  onOpenIdeDetails,
  onCopyDemoUrl,
}: HeroSectionBaseProps) => {
  return (
    <section className="hero">
      <h1>
        <Image
          src="/logo.svg"
          alt={content.logoAlt}
          width={32}
          height={32}
          style={{ verticalAlign: "middle", marginRight: "8px" }}
          unoptimized
        />{" "}
        {content.title}
      </h1>
      <p className="lead">{content.lead}</p>
      <div className="hero-actions">
        <a
          id="hero-ide-btn"
          className="btn-primary"
          href="#ide-config"
          onClick={(e) => {
            e.preventDefault();
            onOpenIdeDetails(true);
            trackGoal("hero_ide_click");
            window.history.replaceState(null, "", "#ide-config");
          }}
        >
          {content.primaryCtaLabel}
        </a>
        <a
          id="hero-gh-btn"
          className="btn-secondary"
          href="https://github.com/astandrik/ydb-qdrant"
          target="_blank"
          rel="noopener"
          onClick={() => trackGoal("hero_gh_click")}
        >
          {content.secondaryCtaLabel}
        </a>
        <a
          id="hero-docs-link"
          className="muted"
          href="/docs/"
          onClick={() => trackGoal("hero_docs_click")}
        >
          {content.docsLabel}
        </a>
      </div>
      <p className="hero-demo">
        {content.demoPrefix} <code>http://ydb-qdrant.tech:8080</code>
        <button
          type="button"
          className="copy-btn"
          onClick={onCopyDemoUrl}
        >
          {content.demoButtonLabel}
        </button>
      </p>
      <p className="hero-footnote muted">{content.footnote}</p>
    </section>
  );
};

