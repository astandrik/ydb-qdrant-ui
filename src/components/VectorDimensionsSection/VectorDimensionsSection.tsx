import { Card, Text, Link } from "@gravity-ui/uikit";

export type ModelRow = {
  provider?: string;
  model: string;
  dimensions: string;
  useCases: string;
};

export type VectorDimensionsSectionBaseProps = {
  title: string;
  description: string;
  commercialModelsTitle: string;
  commercialModelsColumns: { id: string; name: string }[];
  commercialModelsData: ModelRow[];
  openSourceModelsTitle: string;
  openSourceModelsColumns: { id: string; name: string }[];
  openSourceModelsData: ModelRow[];
  choosingDimensionsTitle: string;
  choosingDimensionsItems: { title: string; description: string }[];
  referencesTitle: string;
  references: { label: string; href: string }[];
};

const ModelCard = ({ model, dimensions, useCases }: { model: string, dimensions: string, useCases: string }) => (
  <Card type="container" className="model-card" style={{ height: "100%", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div>
      <Text style={{ fontWeight: 600, fontSize: "16px", display: "block", marginBottom: "4px", wordBreak: "break-word" }}>
        {model}
      </Text>
    </div>
    <div>
      <Text color="secondary" style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "4px" }}>
        Dimensions
      </Text>
      <Text style={{ fontSize: "15px", fontFamily: "monospace", background: "rgba(255, 255, 255, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>
        {dimensions}
      </Text>
    </div>
    <div>
      <Text color="secondary" style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "4px" }}>
        Use Cases
      </Text>
      <Text style={{ fontSize: "14px", lineHeight: "1.4" }}>
        {useCases}
      </Text>
    </div>
  </Card>
);

export const VectorDimensionsSectionBase = ({
  title,
  description,
  commercialModelsTitle,
  commercialModelsData,
  openSourceModelsTitle,
  openSourceModelsData,
  choosingDimensionsTitle,
  choosingDimensionsItems,
  referencesTitle,
  references,
}: VectorDimensionsSectionBaseProps) => {
  // Group commercial models by provider
  const commercialGroups = commercialModelsData.reduce((acc, item) => {
    const provider = item.provider || "Other";
    if (!acc[provider]) acc[provider] = [];
    acc[provider].push(item);
    return acc;
  }, {} as Record<string, ModelRow[]>);

  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <Text className="muted" style={{ display: "block", marginBottom: 32 }}>
        {description}
      </Text>

      <h3 style={{ marginBottom: 24 }}>{commercialModelsTitle}</h3>
      
      {Object.entries(commercialGroups).map(([provider, models]) => (
        <div key={provider} style={{ marginBottom: 32 }}>
          <h4 style={{ margin: "0 0 16px", fontSize: "16px", color: "var(--acc)" }}>{provider}</h4>
          <div className="grid" style={{ marginTop: 0 }}>
            {models.map((item) => (
              <ModelCard 
                key={item.model}
                model={item.model}
                dimensions={item.dimensions}
                useCases={item.useCases}
              />
            ))}
          </div>
        </div>
      ))}

      <h3 style={{ marginBottom: 24, marginTop: 40 }}>{openSourceModelsTitle}</h3>
      <div className="grid" style={{ marginTop: 0, marginBottom: 40 }}>
        {openSourceModelsData.map((item) => (
          <ModelCard 
            key={item.model}
            model={item.model}
            dimensions={item.dimensions}
            useCases={item.useCases}
          />
        ))}
      </div>

      <div className="grid">
        <Card type="container" style={{ padding: "20px" }}>
          <h3 className="card-title" style={{ marginTop: 0 }}>{choosingDimensionsTitle}</h3>
          <ul className="muted" style={{ marginBottom: 0 }}>
            {choosingDimensionsItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                <strong style={{ color: "var(--fg)" }}>{item.title}</strong>: {item.description}
              </li>
            ))}
          </ul>
        </Card>

        <Card type="container" style={{ padding: "20px" }}>
          <h3 className="card-title" style={{ marginTop: 0 }}>{referencesTitle}</h3>
          <ul className="muted" style={{ marginBottom: 0 }}>
            {references.map((ref, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                <Link href={ref.href} target="_blank" rel="noopener">
                  {ref.label}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
};
