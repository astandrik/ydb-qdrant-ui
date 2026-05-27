import type { ReactNode } from "react";
import { Button } from "@gravity-ui/uikit";
import "./AgentResourcePage.scss";

type Action = {
  href: string;
  label: string;
  view?: "action" | "outlined" | "normal";
};

export type AgentResourceSection = {
  body?: ReactNode;
  items?: ReactNode[];
  title: string;
};

type AgentResourcePageProps = {
  actions?: Action[];
  children?: ReactNode;
  eyebrow: string;
  lead: ReactNode;
  sections: AgentResourceSection[];
  title: string;
};

export function AgentResourcePage({
  actions = [],
  children,
  eyebrow,
  lead,
  sections,
  title,
}: AgentResourcePageProps) {
  return (
    <main className="agent-resource">
      <section className="agent-resource__hero">
        <p className="agent-resource__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="agent-resource__lead">{lead}</div>
        {actions.length > 0 && (
          <div className="agent-resource__actions">
            {actions.map((action) => (
              <Button
                href={action.href}
                key={action.href}
                rel={
                  action.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                size="l"
                target={action.href.startsWith("http") ? "_blank" : undefined}
                view={action.view ?? "outlined"}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </section>

      {children}

      {sections.map((section) => (
        <section className="agent-resource__section" key={section.title}>
          <h2>{section.title}</h2>
          {section.body && (
            <div className="agent-resource__body">{section.body}</div>
          )}
          {section.items && (
            <ul>
              {section.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  );
}
