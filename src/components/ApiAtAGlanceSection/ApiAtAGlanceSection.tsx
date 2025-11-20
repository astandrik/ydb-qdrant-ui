export type ApiAtAGlanceBaseProps = {
  title: string;
  purposeTitle: string;
  purposeBody: string;
  featuresTitle: string;
  features: string[];
  codeBlock: string;
  healthText: string;
};

export const ApiAtAGlanceSectionBase = ({
  title,
  purposeTitle,
  purposeBody,
  featuresTitle,
  features,
  codeBlock,
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

      <pre>
        <code>{codeBlock}</code>
      </pre>

      <p className="muted">{healthText}</p>
    </section>
  );
};

