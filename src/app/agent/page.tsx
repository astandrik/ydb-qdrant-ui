import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";
import { agentModeData, agentModeJsonLd } from "@/shared/agentModeData";

export const metadata: Metadata = {
  title: "YDB-Qdrant Agent Mode",
  description:
    "Structured agent-mode view for YDB-Qdrant API endpoints, auth headers, MCP resources, and key capabilities.",
  alternates: {
    canonical: "/agent/",
  },
};

const JSON_LD_ESCAPE_MAP = {
  "&": "\\u0026",
  "<": "\\u003c",
  ">": "\\u003e",
} as const;

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(
    /[&<>]/g,
    (char) => JSON_LD_ESCAPE_MAP[char as keyof typeof JSON_LD_ESCAPE_MAP],
  );
}

export default function AgentModePage() {
  return (
    <>
      <script type="application/ld+json">
        {serializeJsonLd(agentModeJsonLd)}
      </script>
      <AgentResourcePage
        eyebrow="Agent mode"
        title={agentModeData.name}
        lead={
          <p>
            {agentModeData.summary} This page is the human-readable agent-mode
            view. Use <code>/agent-mode.json</code> for the compact
            machine-readable JSON version.
          </p>
        }
        actions={[
          {
            href: "/agent-mode.json",
            label: "Agent JSON",
            view: "action",
          },
          {
            href: "/openapi.json",
            label: "OpenAPI",
          },
          {
            href: "/developers/",
            label: "Developer hub",
          },
        ]}
        sections={[
          {
            title: "API contract",
            body: (
              <p>
                Current API version is{" "}
                <code>{agentModeData.api.current_version}</code>. Agents may
                send <code>{agentModeData.api.version_header}</code> to pin the
                documented contract.
              </p>
            ),
            items: [
              <a href={agentModeData.api.openapi} key="openapi">
                OpenAPI specification
              </a>,
              <a href={agentModeData.api.docs} key="api-docs">
                REST API docs
              </a>,
              ...agentModeData.api.base_urls.map((baseUrl) => (
                <span key={baseUrl.url}>
                  <code>{baseUrl.url}</code>: {baseUrl.use}
                </span>
              )),
            ],
          },
          {
            title: "REST endpoints",
            items: agentModeData.api.endpoints.map((endpoint) => (
              <code key={endpoint}>{endpoint}</code>
            )),
          },
          {
            title: "Authentication",
            body: (
              <pre>{`${agentModeData.authentication.rest.header}: <namespace-key>
${agentModeData.authentication.rest.tenant_header}: optional-workspace
${agentModeData.api.version_header}: ${agentModeData.api.current_version}
${agentModeData.authentication.rest.retry_header}: stable-mutation-key
Authorization: Bearer <code-indexer-mcp-token>`}</pre>
            ),
            items: [
              ...agentModeData.authentication.rest.notes,
              ...agentModeData.authentication.mcp.notes,
            ],
          },
          {
            title: "Capabilities",
            items: [...agentModeData.capabilities],
          },
          {
            title: "Known limits",
            items: [...agentModeData.limits],
          },
          {
            title: "Recommended agent flow",
            items: [...agentModeData.recommended_agent_flow],
          },
          {
            title: "Machine-readable resources",
            items: Object.entries(agentModeData.resources).map(([label, href]) => (
              <a href={href} key={label}>
                {label}: {href}
              </a>
            )),
          },
        ]}
      />
    </>
  );
}
