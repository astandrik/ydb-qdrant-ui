import { Card, Text } from "@gravity-ui/uikit";
import CodeBlock from "@/components/CodeBlock/CodeBlock";

export type ApiAtAGlanceBaseProps = {
  activeTab?: string;
  title: string;
  purposeTitle: string;
  purposeBody: string;
  featuresTitle: string;
  features: string[];
  serverTitle: string;
  serverCodeBlock: string;
  serverLanguage: "bash" | "shell" | "json";
  packageTitle: string;
  packageCodeBlock: string;
  packageLanguage: "ts" | "tsx" | "js";
  healthText: string;
};

export const ApiAtAGlanceSectionBase = ({
  activeTab,
  title,
  purposeTitle,
  purposeBody,
  featuresTitle,
  features,
  serverTitle,
  serverCodeBlock,
  serverLanguage,
  packageTitle,
  packageCodeBlock,
  packageLanguage,
  healthText,
}: ApiAtAGlanceBaseProps) => {
  const isPublicDemo = activeTab === "public-demo";
  const isNpm = activeTab === "npm";

  let displayServerCode = serverCodeBlock;
  if (isPublicDemo) {
    displayServerCode = displayServerCode.replace(
      /http:\/\/localhost:8080/g,
      "http://ydb-qdrant.tech:8080"
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>

      <div className="grid">
        <Card type="container">
          <h3 className="card-title">{purposeTitle}</h3>
          <Text className="muted">{purposeBody}</Text>
        </Card>
        <Card type="container">
          <h3 className="card-title">{featuresTitle}</h3>
          <ul className="muted">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>

      {!isNpm && (
        <>
          <h3>{serverTitle}</h3>
          <CodeBlock code={displayServerCode} language={serverLanguage} />
        </>
      )}

      <h3 id="package-usage">{packageTitle}</h3>
      <CodeBlock code={packageCodeBlock} language={packageLanguage} />

      <Text className="muted">{healthText}</Text>
    </section>
  );
};
