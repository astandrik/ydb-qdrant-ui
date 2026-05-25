import type { Metadata } from "next";
import { CodeIndexerInfoPage } from "@/components/CodeIndexer/CodeIndexerInfoPage";

export const metadata: Metadata = {
  title: "Code Indexer Support",
  description:
    "Support links for YDB Qdrant Code Indexer public beta users.",
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
      ]}
    />
  );
}
