import CodeBlock from "@/components/CodeBlock/CodeBlock";

export type ApiAtAGlanceBaseProps = {
  title: string;
  purposeTitle: string;
  purposeBody: string;
  featuresTitle: string;
  features: string[];
  serverTitle: string;
  serverCodeBlock: string;
  serverLanguage: "bash" | "shell" | "json";
  packageTitle: string;
  packageCodeBlock: string;
  packageLanguage: "ts" | "tsx" | "js";
  healthText: string;
};

export const ApiAtAGlanceSectionBase = ({
  title,
  purposeTitle,
  purposeBody,
  featuresTitle,
  features,
  serverTitle,
  serverCodeBlock,
  serverLanguage,
  packageTitle,
  packageCodeBlock,
  packageLanguage,
  healthText,
}: ApiAtAGlanceBaseProps) => {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>

      <div className="grid">
        <div className="card">
          <strong>{purposeTitle}</strong>
          <p className="muted">{purposeBody}</p>
        </div>
        <div className="card">
          <strong>{featuresTitle}</strong>
          <ul className="muted">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <h3>{serverTitle}</h3>
      <CodeBlock code={serverCodeBlock} language={serverLanguage} />

      <h3 id="package-usage">{packageTitle}</h3>
      <CodeBlock code={packageCodeBlock} language={packageLanguage} />

      <p className="muted">{healthText}</p>
    </section>
  );
};

