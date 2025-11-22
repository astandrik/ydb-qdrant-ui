import { Card, Text } from "@gravity-ui/uikit";

type WhyCard = {
  title: string;
  body: string;
};

export type WhySectionBaseProps = {
  title: string;
  cards: WhyCard[];
};

export const WhySectionBase = ({ title, cards }: WhySectionBaseProps) => {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="grid">
        {cards.map((card) => (
          <Card type="container" key={card.title}>
            <Text weight="bold">{card.title}</Text>
            <Text className="muted">{card.body}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
};
