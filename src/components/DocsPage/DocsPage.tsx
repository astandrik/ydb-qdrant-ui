import Image from "next/image";
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
          {section.figures.map((figure) => (
            <figure className="diagram-figure" key={figure.src}>
              <Image
                src={figure.src}
                alt={figure.alt}
                width={960}
                height={540}
                className="diagram-image"
                unoptimized
              />
              <figcaption className="diagram-caption">{figure.caption}</figcaption>
            </figure>
          ))}
        </section>
      ))}
    </main>
  );
};
