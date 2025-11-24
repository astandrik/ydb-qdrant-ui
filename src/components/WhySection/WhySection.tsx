import { Card, Text, Table, Icon } from "@gravity-ui/uikit";
import { Link as LinkIcon } from "@gravity-ui/icons";

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
      <h2 className="section-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {title}
        <a
          href="#why-ydb-qdrant"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "var(--muted)",
            opacity: 0.5,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
          aria-label="Anchor to this section"
        >
          <Icon data={LinkIcon} size={20} />
        </a>
      </h2>
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
