import { Card, Text } from "@gravity-ui/uikit";

export type WhereSectionBaseProps = {
  title: string;
  heading: string;
  items: string[];
};

export const WhereSectionBase = ({
  title,
  heading,
  items,
}: WhereSectionBaseProps) => {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <h3 className="section-title">{heading}</h3>
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
