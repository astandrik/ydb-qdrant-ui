import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import "./globals.css";
import YandexMetrika from "./YandexMetrika";
import { ThemeProvider } from "@gravity-ui/uikit";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qdrant API on YDB",
  description:
    "Qdrant-compatible vector search API on YDB. Single-phase top-k using automatic YDB vector index with table-scan fallback. Self-hosted or hosted demo endpoint for IDEs.",
  metadataBase: new URL("http://ydb-qdrant.tech"),
  authors: [{ name: "ydb-qdrant" }],
  themeColor: "#0b0f14",
  openGraph: {
    title: "Qdrant API on YDB",
    description:
      "Qdrant-compatible vector search on YDB: single-phase top-k with automatic vector index; table-scan fallback.",
    type: "website",
    url: "http://ydb-qdrant.tech/",
    images: [
      {
        url: "/assets/preview.png",
        width: 1024,
        height: 1024,
        type: "image/png",
        alt: "IDE agent configured with YDB Qdrant-compatible URL",
      },
    ],
    siteName: "Qdrant API on YDB",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qdrant API on YDB",
    description:
      "Qdrant-compatible vector search on YDB: single-phase top-k with automatic vector index; table-scan fallback.",
    images: ["/assets/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider theme="dark">
          {children}
        </ThemeProvider>
        <YandexMetrika />
      </body>
    </html>
  );
}
