import { Card, Table, Text, Link } from "@gravity-ui/uikit";

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

export const VectorDimensionsSectionBase = ({
  title,
  description,
  commercialModelsTitle,
  commercialModelsColumns,
  commercialModelsData,
  openSourceModelsTitle,
  openSourceModelsColumns,
  openSourceModelsData,
  choosingDimensionsTitle,
  choosingDimensionsItems,
  referencesTitle,
  references,
}: VectorDimensionsSectionBaseProps) => {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <Text className="muted" style={{ display: "block", marginBottom: 24 }}>
        {description}
      </Text>

      <h3 style={{ marginBottom: 16 }}>{commercialModelsTitle}</h3>
      <Card type="container" style={{ marginBottom: 32, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={commercialModelsColumns}
            data={commercialModelsData}
          />
        </div>
      </Card>

      <h3 style={{ marginBottom: 16 }}>{openSourceModelsTitle}</h3>
      <Card type="container" style={{ marginBottom: 32, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={openSourceModelsColumns}
            data={openSourceModelsData}
          />
        </div>
      </Card>

      <div className="grid">
        <Card type="container">
          <h3 className="card-title">{choosingDimensionsTitle}</h3>
          <ul className="muted">
            {choosingDimensionsItems.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong>: {item.description}
              </li>
            ))}
          </ul>
        </Card>

        <Card type="container">
          <h3 className="card-title">{referencesTitle}</h3>
          <ul className="muted">
            {references.map((ref, index) => (
              <li key={index}>
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
