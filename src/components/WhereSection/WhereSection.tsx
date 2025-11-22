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
      <div className="grid">
        <Card type="container">
          <Text weight="bold">{heading}</Text>
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
