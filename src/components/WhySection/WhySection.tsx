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
          <div className="card" key={card.title}>
            <strong>{card.title}</strong>
            <p className="muted">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

