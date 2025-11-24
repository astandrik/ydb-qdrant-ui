import { useMemo } from "react";
import { Card, Text, Link } from "@gravity-ui/uikit";
import { SectionTitleWithAnchor } from "../SectionTitleWithAnchor/SectionTitleWithAnchor";

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
  commercialModelsData: ModelRow[];
  openSourceModelsTitle: string;
  openSourceModelsData: ModelRow[];
  choosingDimensionsTitle: string;
  choosingDimensionsItems: { title: string; description: string }[];
  referencesTitle: string;
  references: { label: string; href: string }[];
  dimensionsLabel: string;
  useCasesLabel: string;
  anchorAriaLabel: string;
};

const ModelCard = ({
  model,
  dimensions,
  useCases,
  dimensionsLabel,
  useCasesLabel,
}: {
  model: string;
  dimensions: string;
  useCases: string;
  dimensionsLabel: string;
  useCasesLabel: string;
}) => (
  <Card type="container" className="model-card">
    <div>
      <Text className="model-card__model">
        {model}
      </Text>
    </div>
    <div>
      <Text color="secondary" className="model-card__label">
        {dimensionsLabel}
      </Text>
      <Text className="model-card__dimensions">
        {dimensions}
      </Text>
    </div>
    <div>
      <Text color="secondary" className="model-card__label">
        {useCasesLabel}
      </Text>
      <Text className="model-card__use-cases">
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
  dimensionsLabel,
  useCasesLabel,
  anchorAriaLabel,
}: VectorDimensionsSectionBaseProps) => {
  // Group commercial models by provider
  const commercialGroups = useMemo(
    () =>
      commercialModelsData.reduce((acc, item) => {
        const provider = item.provider || "Other";
        if (!acc[provider]) acc[provider] = [];
        acc[provider].push(item);
        return acc;
      }, {} as Record<string, ModelRow[]>),
    [commercialModelsData],
  );

  return (
    <section className="section" id="recommended-vector-dimensions">
      <SectionTitleWithAnchor
        title={title}
        href="#recommended-vector-dimensions"
        className="section-title"
        anchorAriaLabel={anchorAriaLabel}
      />
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
                dimensionsLabel={dimensionsLabel}
                useCasesLabel={useCasesLabel}
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
            dimensionsLabel={dimensionsLabel}
            useCasesLabel={useCasesLabel}
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
