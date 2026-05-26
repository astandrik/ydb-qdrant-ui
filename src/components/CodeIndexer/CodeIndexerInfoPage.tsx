import { Button } from "@gravity-ui/uikit";
import "./CodeIndexer.scss";

type InfoAction = {
  href: string;
  label: string;
};

type InfoSection = {
  items: string[];
  title: string;
};

type CodeIndexerInfoPageProps = {
  actions?: InfoAction[];
  eyebrow: string;
  lead: string;
  sections: InfoSection[];
  title: string;
};

export function CodeIndexerInfoPage({
  actions = [],
  eyebrow,
  lead,
  sections,
  title,
}: CodeIndexerInfoPageProps) {
  return (
    <main className="code-indexer code-indexer-info">
      <section className="code-indexer-info__hero">
        <p className="code-indexer__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="code-indexer__lead">{lead}</p>
        <div className="code-indexer__actions">
          <Button href="/code-indexer/" size="l" view="outlined">
            Code Indexer home
          </Button>
          <Button href="/code-indexer/dashboard/" size="l" view="outlined">
            Dashboard
          </Button>
          {actions.map((action) => (
            <Button
              href={action.href}
              key={action.href}
              rel={
                action.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              size="l"
              target={action.href.startsWith("http") ? "_blank" : undefined}
              view="action"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </section>

      {sections.map((section) => (
        <section className="code-indexer-info__section" key={section.title}>
          <h2>{section.title}</h2>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
