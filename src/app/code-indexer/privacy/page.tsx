import type { Metadata } from "next";
import { CodeIndexerInfoPage } from "@/components/CodeIndexer/CodeIndexerInfoPage";

export const metadata: Metadata = {
  title: "Code Indexer Privacy",
  description:
    "Stored data and deletion behavior for YDB Qdrant Code Indexer.",
  alternates: {
    canonical: "/code-indexer/privacy/",
  },
};

export default function CodeIndexerPrivacyPage() {
  return (
    <CodeIndexerInfoPage
      eyebrow="Privacy"
      title="Code Indexer privacy"
      lead="YDB Qdrant Code Indexer stores the minimum data needed to index installed repositories and serve hosted MCP search."
      sections={[
        {
          items: [
            "GitHub account, installation, and repository metadata needed to show access and indexing status.",
            "Code snippets selected by repository permissions and repository indexing configuration.",
            "Embedding vectors generated from indexed snippets and stored in YDB-backed Qdrant-compatible collections.",
            "MCP/API tokens as hashes only. Plaintext tokens are shown once when created.",
            "Usage counters and audit logs for quota enforcement, abuse prevention, and operational debugging.",
          ],
          title: "Stored data",
        },
        {
          items: [
            "Uninstalling the GitHub App or removing a repository deletes indexed collections for removed repositories.",
            "The dashboard delete-data action removes sessions, MCP/API tokens, GitHub user data, linked installation rows, repository rows, and indexed repository data where the user owns the eligible linked data.",
            "Revoking an MCP token immediately prevents future hosted MCP searches with that token.",
          ],
          title: "Deletion behavior",
        },
        {
          items: [
            "MCP/API tokens are shown once, stored as hashes, and used only through the hosted backend.",
            "Repository access is limited by the repositories selected during GitHub App installation.",
            "Public beta quotas limit repository count, indexed chunks, and daily searches to control hosted-service cost and abuse risk.",
            "If a repository, token, or deletion case is unclear in the dashboard, open a support issue for manual follow-up.",
          ],
          title: "Security and privacy",
        },
      ]}
    />
  );
}
