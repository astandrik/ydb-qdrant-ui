import { Card, Text, Table } from "@gravity-ui/uikit";

type WhyCard = {
  title: string;
  body: string;
};

type ComparisonRow = {
  feature: string;
  ydbQdrant: string;
  qdrant: string;
};

export type WhySectionBaseProps = {
  title: string;
  cards: WhyCard[];
  comparisonTitle: string;
  comparisonRows: ComparisonRow[];
  comparisonHeaders: {
    feature: string;
    ydbQdrant: string;
    qdrant: string;
  };
};

export const WhySectionBase = ({
  title,
  cards,
  comparisonTitle,
  comparisonRows,
  comparisonHeaders,
}: WhySectionBaseProps) => {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="grid">
        {cards.map((card) => (
          <Card type="container" key={card.title}>
            <h3 className="card-title">{card.title}</h3>
            <Text className="muted">{card.body}</Text>
          </Card>
        ))}
      </div>

      <h3 className="section-title" style={{ marginTop: 48 }}>
        {comparisonTitle}
      </h3>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={[
            { id: "feature", name: comparisonHeaders.feature },
            { id: "ydbQdrant", name: comparisonHeaders.ydbQdrant },
            { id: "qdrant", name: comparisonHeaders.qdrant },
          ]}
          data={comparisonRows}
          edgePadding={false}
        />
      </div>
    </section>
  );
};
