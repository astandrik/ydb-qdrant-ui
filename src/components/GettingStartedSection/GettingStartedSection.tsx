import type { ReactNode, RefObject } from "react";
import Image from "next/image";
import { trackGoal } from "@/shared/utils/metricsManager";

export type DocsLink = {
  href: string;
  label: string;
};

export type GettingStartedSectionBaseProps = {
  ideDetailsRef: RefObject<HTMLDetailsElement | null>;
  title: string;
  ideConfigSummary: string;
  ideConfigDescription: ReactNode;
  ideConfigImageAlt: string;
  ideUnderHoodSummary: string;
  ideUnderHoodImageAlt: string;
  optionsTitle: string;
  optionsSelfHost: ReactNode;
  optionsHosted: ReactNode;
  docsTitle: string;
  docsLinks: DocsLink[];
  selfHostedBlock: ReactNode;
};

export const GettingStartedSectionBase = ({
  ideDetailsRef,
  title,
  ideConfigSummary,
  ideConfigDescription,
  ideConfigImageAlt,
  ideUnderHoodSummary,
  ideUnderHoodImageAlt,
  optionsTitle,
  optionsSelfHost,
  optionsHosted,
  docsTitle,
  docsLinks,
  selfHostedBlock,
}: GettingStartedSectionBaseProps) => {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>

      <details
        id="ide-config"
        ref={ideDetailsRef}
        onToggle={(e) => {
          if (e.currentTarget.open) trackGoal("instructions_open");
        }}
      >
        <summary>{ideConfigSummary}</summary>
        <figure style={{ margin: "16px 0" }}>
          <Image
            src="/assets/2025-10-25_16-35-47.png"
            alt={ideConfigImageAlt}
            width={640}
            height={360}
            style={{
              width: "100%",
              maxWidth: "640px",
              height: "auto",
              border: "1px solid #19212b",
              borderRadius: "8px",
              display: "block",
              margin: "0 auto",
            }}
            unoptimized
          />
        </figure>
        {ideConfigDescription}
      </details>

      <details id="ide-config-diagram">
        <summary>{ideUnderHoodSummary}</summary>
        <figure style={{ margin: "16px 0" }}>
          <Image
            src="/assets/diagram.svg"
            alt={ideUnderHoodImageAlt}
            width={960}
            height={540}
            style={{
              width: "100%",
              maxWidth: "960px",
              height: "auto",
              border: "1px solid #19212b",
              borderRadius: "8px",
              display: "block",
              margin: "0 auto",
            }}
            unoptimized
          />
        </figure>
      </details>

      <div className="grid">
        <div className="card">
          <strong>{optionsTitle}</strong>
          <ul className="muted">
            <li>{optionsSelfHost}</li>
            <li>{optionsHosted}</li>
          </ul>
        </div>

        <div className="card">
          <strong>{docsTitle}</strong>
          <ul className="muted">
            {docsLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card card-standalone">{selfHostedBlock}</div>
    </section>
  );
};

