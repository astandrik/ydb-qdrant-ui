import { Card, Text } from "@gravity-ui/uikit";

export type WhereSectionBaseProps = {
  title: string;
  items: string[];
  heading?: string;
};

export const WhereSectionBase = ({
  title,
  items,
}: WhereSectionBaseProps) => {
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
