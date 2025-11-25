import type { MouseEvent } from "react";
import Image from "next/image";
import { Button, Link } from "@gravity-ui/uikit";
import { trackGoal } from "@/shared/utils/metricsManager";
import { DemoEndpointBadge } from "@/components/DemoEndpointBadge";

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
  locale?: "en" | "ru";
};

export const HeroSectionBase = ({
  content,
  onOpenIdeDetails,
  onCopyDemoUrl,
  locale = "en",
}: HeroSectionBaseProps) => {
  return (
    <section className="hero">
      <h1>
        <Image
          src="/logo.svg"
          alt={content.logoAlt}
          width={40}
          height={40}
          className="hero-logo"
          unoptimized
        />{" "}
        {content.title}
      </h1>
      <p className="lead">{content.lead}</p>
      <div className="hero-actions">
        <Button
          id="hero-ide-btn"
          className="hero-btn-primary"
          onClick={(e) => {
            e.preventDefault();
            onOpenIdeDetails(true);
            trackGoal("hero_ide_click");
            const params = new URLSearchParams(window.location.search);
            params.set("ide-config", "true");
            window.history.replaceState(null, "", `?${params.toString()}`);
          }}
        >
          {content.primaryCtaLabel}
        </Button>
        <Button
          id="hero-gh-btn"
          className="hero-btn-secondary"
          href="https://github.com/astandrik/ydb-qdrant"
          target="_blank"
          rel="noopener"
          onClick={() => trackGoal("hero_gh_click", { source: "hero_button" })}
        >
          {content.secondaryCtaLabel}
        </Button>
        <Link
          id="hero-docs-link"
          href="/docs/"
          onClick={() => trackGoal("hero_docs_click")}
        >
          {content.docsLabel}
        </Link>
      </div>
      <DemoEndpointBadge
        label={content.demoPrefix}
        url="http://ydb-qdrant.tech:8080"
        buttonLabel={content.demoButtonLabel}
        onCopy={onCopyDemoUrl}
        locale={locale}
      />
      <p className="hero-footnote">{content.footnote}</p>
    </section>
  );
};
