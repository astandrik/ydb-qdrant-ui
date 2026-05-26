import type { Metadata } from "next";
import { CodeIndexerLanding } from "@/components/CodeIndexer/CodeIndexerLanding";

export const metadata: Metadata = {
  title: "YDB Qdrant Code Indexer",
  description:
    "Install a GitHub App, index repositories into YDB-backed Qdrant-compatible storage, and connect coding agents through hosted MCP.",
  alternates: {
    canonical: "/code-indexer/",
  },
  openGraph: {
    title: "YDB Qdrant Code Indexer",
    description:
      "Install a GitHub App, index repositories into YDB-backed Qdrant-compatible storage, and connect coding agents through hosted MCP.",
    type: "website",
    url: "/code-indexer/",
    images: [
      {
        url: "/assets/preview.png",
        width: 1024,
        height: 1024,
        type: "image/png",
        alt: "YDB Qdrant Code Indexer dashboard and agent memory preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YDB Qdrant Code Indexer",
    description:
      "Index GitHub repositories into YDB-backed Qdrant-compatible vector storage for coding agents.",
    images: ["/assets/preview.png"],
  },
};

export default function CodeIndexerPage() {
  return <CodeIndexerLanding />;
}
