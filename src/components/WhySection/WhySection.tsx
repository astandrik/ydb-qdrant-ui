import { Card, Text, Table } from "@gravity-ui/uikit";
import { SectionTitleWithAnchor } from "../SectionTitleWithAnchor/SectionTitleWithAnchor";
import "./WhySection.scss";

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
    <section className="section" id="why-ydb-qdrant">
      <SectionTitleWithAnchor
        title={title}
        href="#why-ydb-qdrant"
        className="section-title"
      />
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
      <div className="why-section__table-card">
        <div style={{ overflowX: "auto" }}>
          <Table
            className="why-section__table"
            width="max"
            columns={[
              {
                id: "feature",
                name: comparisonHeaders.feature,
                className: "why-section__col-feature",
                width: "34%"
              },
              {
                id: "ydbQdrant",
                name: comparisonHeaders.ydbQdrant,
                className: "why-section__col-highlight",
                width: "33%"
              },
              {
                id: "qdrant",
                name: comparisonHeaders.qdrant,
                className: "why-section__col-regular",
                width: "33%"
              },
            ]}
            data={comparisonRows}
            edgePadding={true}
            wordWrap={true}
            verticalAlign="middle"
          />
        </div>
      </div>
    </section>
  );
};
