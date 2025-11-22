import type { MouseEvent } from "react";
import Image from "next/image";
import { Button, Link } from "@gravity-ui/uikit";
import { trackGoal } from "@/shared/utils/metricsManager";

export type HeroContent = {
  title: string;
  logoAlt: string;
  lead: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  packageCtaLabel: string;
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
          width={40}
          height={40}
          style={{ verticalAlign: "middle", marginRight: "8px" }}
          unoptimized
        />{" "}
        {content.title}
      </h1>
      <p className="lead">{content.lead}</p>
      <div className="hero-actions">
        <Button
          id="hero-ide-btn"
          view="action"
          size="m"
          onClick={(e) => {
            e.preventDefault();
            onOpenIdeDetails(true);
            trackGoal("hero_ide_click");
            window.history.replaceState(null, "", "#ide-config");
          }}
        >
          {content.primaryCtaLabel}
        </Button>
        <Button
          id="hero-pkg-btn"
          view="action"
          size="m"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById("package-usage");
            if (target) {
              try {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              } catch {
                target.scrollIntoView();
              }
            }
            trackGoal("hero_pkg_click");
            window.history.replaceState(null, "", "#package-usage");
          }}
        >
          {content.packageCtaLabel}
        </Button>
        <Button
          id="hero-gh-btn"
          view="outlined"
          size="m"
          href="https://github.com/astandrik/ydb-qdrant"
          target="_blank"
          rel="noopener"
          onClick={() => trackGoal("hero_gh_click")}
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
      <p className="hero-footnote">{content.footnote}</p>
    </section>
  );
};
