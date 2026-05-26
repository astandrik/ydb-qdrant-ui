import type { Metadata } from "next";
import { CodeIndexerInfoPage } from "@/components/CodeIndexer/CodeIndexerInfoPage";

export const metadata: Metadata = {
  title: "Code Indexer Support",
  description:
    "Support links for YDB Qdrant Code Indexer public beta users.",
  alternates: {
    canonical: "/code-indexer/support/",
  },
};

export default function CodeIndexerSupportPage() {
  return (
    <CodeIndexerInfoPage
      eyebrow="Support"
      title="Code Indexer support"
      lead="For public beta support, use GitHub Issues in the ydb-qdrant repository."
      actions={[
        {
          href: "https://github.com/astandrik/ydb-qdrant/issues",
          label: "Open GitHub Issues",
        },
        {
          href: "https://github.com/astandrik/ydb-qdrant",
          label: "View repository",
        },
      ]}
      sections={[
        {
          items: [
            "Installation and OAuth callback problems.",
            "Repository indexing failures or stale dashboard status.",
            "Hosted MCP authentication, token revocation, and search behavior.",
            "Privacy or data deletion requests that need manual follow-up.",
          ],
          title: "What to report",
        },
        {
          items: [
            "The GitHub App is scoped to installed repositories rather than every repository on an account.",
            "Repository metadata, contents, pull requests, and checks are used for indexing and repository-aware code search.",
            "Access follows the repositories selected during GitHub App installation and the current public beta policy.",
          ],
          title: "Permissions explained",
        },
        {
          items: [
            "Create an MCP token in the dashboard before connecting an agent.",
            "Use the hosted MCP endpoint at https://code-indexer.ydb-qdrant.tech/mcp with an Authorization: Bearer <token> header.",
            "Use the generic mcpServers JSON from the dashboard for clients that support remote MCP endpoints with headers.",
            "Specific client support is not claimed until it is verified for that client.",
          ],
          title: "Connect your coding agent",
        },
        {
          items: [
            "What repository data is indexed? Repository metadata and code snippets selected by repository permissions and indexing configuration.",
            "Are private repositories supported? Repository access follows the GitHub App installation selection and beta policy; confirm readiness in the dashboard.",
            "Where are embeddings stored? In YDB-backed Qdrant-compatible collections with the indexed chunks and search payloads.",
            "How do I revoke an MCP token? Revoke it from the dashboard; revoked tokens stop future hosted MCP searches.",
            "How do I remove a repository index? Uninstall the GitHub App or remove repository access; use support for cases that need manual follow-up.",
            "What are public beta quotas? The hosted beta limits repository count, indexed chunks, and daily searches.",
            "Which agents can connect over MCP? Agents whose MCP client can call a remote endpoint with Bearer-token headers.",
          ],
          title: "FAQ",
        },
      ]}
    />
  );
}
