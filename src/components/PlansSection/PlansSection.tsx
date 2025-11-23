import { Card, Text } from "@gravity-ui/uikit";

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
        <Card type="container">
          <ul className="muted">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
};
