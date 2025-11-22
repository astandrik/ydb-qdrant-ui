"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@gravity-ui/uikit";
import { createCopyToClipboardHandler } from "@/shared/utils/copyToClipboard";

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
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null);

  const handleCopy = createCopyToClipboardHandler({
    page: metricsPageName,
    area: "hero",
    successLabel: copySuccessLabel,
  });

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
