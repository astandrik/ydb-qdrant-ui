export type PlansSectionBaseProps = {
  title: string;
  heading: string;
  items: string[];
};

export const PlansSectionBase = ({
  title,
  heading,
  items,
}: PlansSectionBaseProps) => {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="grid">
        <div className="card">
          <strong>{heading}</strong>
          <ul className="muted">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

