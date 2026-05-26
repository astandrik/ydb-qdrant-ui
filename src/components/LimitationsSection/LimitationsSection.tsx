import { Card, Text } from "@gravity-ui/uikit";

export type LimitationsSectionBaseProps = {
  title: string;
  body: string;
};

export const LimitationsSectionBase = ({
  title,
  body,
}: LimitationsSectionBaseProps) => {
  return (
    <section className="section" id="when-not-to-use">
      <h2 className="section-title">{title}</h2>
      <div className="grid">
        <Card type="container">
          <Text className="muted">{body}</Text>
        </Card>
      </div>
    </section>
  );
};
