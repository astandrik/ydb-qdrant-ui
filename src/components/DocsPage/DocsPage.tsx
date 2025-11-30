"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, Button, Icon } from "@gravity-ui/uikit";
import { ArrowLeft } from "@gravity-ui/icons";
import { createCopyToClipboardHandler } from "@/shared/utils/copyToClipboard";
import { DemoEndpointBadge } from "@/components/DemoEndpointBadge";
import { DEMO_URL } from "@/shared/constants";
import "./DocsPage.scss";

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
  backLinkText: string;
};

export const DocsPageBase = ({
  title,
  lead,
  demoPrefix,
  copyButtonLabel,
  copySuccessLabel,
  metricsPageName,
  sections,
  backLinkText,
}: DocsPageBaseProps) => {
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null);

  const handleCopy = createCopyToClipboardHandler({
    page: metricsPageName,
    area: "hero",
    successLabel: copySuccessLabel,
  });

  return (
    <main className="wrap">
      <div style={{ marginBottom: 24 }}>
        <Button href="/" view="outlined" size="l">
          <Icon data={ArrowLeft} />
          {backLinkText}
        </Button>
      </div>
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
      <DemoEndpointBadge
        label={demoPrefix}
        url={DEMO_URL}
        buttonLabel={copyButtonLabel}
        onCopy={(e) => handleCopy(DEMO_URL, e)}
        locale={metricsPageName === "docs-ru" ? "ru" : "en"}
      />

      {sections.map((section) => (
        <section className="section" key={section.title}>
          <h2 className="section-title">{section.title}</h2>
          <div className="diagrams-grid">
            {section.figures.map((figure) => (
              <button
                key={figure.src}
                className="diagram-card"
                onClick={() => setSelectedFigure(figure)}
                type="button"
                aria-label={`View ${figure.alt}`}
              >
                <div className="diagram-card-image-wrapper">
                  <Image
                    src={figure.src}
                    alt={figure.alt}
                    width={960}
                    height={540}
                    className="diagram-card-image"
                    unoptimized
                  />
                </div>
                <p className="diagram-card-caption">{figure.caption}</p>
              </button>
            ))}
          </div>
        </section>
      ))}

      <Dialog
        open={selectedFigure !== null}
        onOpenChange={(open) => !open && setSelectedFigure(null)}
        onClose={() => setSelectedFigure(null)}
        size="l"
        hasCloseButton
      >
        {selectedFigure && (
          <div className="diagram-dialog-content">
            <Image
              src={selectedFigure.src}
              alt={selectedFigure.alt}
              width={960}
              height={540}
              className="diagram-dialog-image"
              unoptimized
            />
            <p className="diagram-dialog-caption">{selectedFigure.caption}</p>
          </div>
        )}
      </Dialog>
    </main>
  );
};
