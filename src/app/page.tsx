"use client";

import type { MouseEvent } from "react";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LangSwitcher from "@/components/LangSwitcher";
import GitHubRepoIcon from "@/components/GitHubRepoIcon";
import NpmPackageIcon from "@/components/NpmPackageIcon";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import WhereSection from "@/components/WhereSection";
import LimitationsSection from "@/components/LimitationsSection";
import PlansSection from "@/components/PlansSection";
import GettingStartedSection from "@/components/GettingStartedSection";
import ApiAtAGlanceSection from "@/components/ApiAtAGlanceSection";
import VectorDimensionsSection from "@/components/VectorDimensionsSection";
import { AskAIPanel } from "@/components/AskAI";
import {
  ASK_AI_HOME_EN,
  ASK_AI_PRODUCT_ID,
  ASK_AI_PRODUCT_NAME,
} from "@/components/AskAI/ask-ai-content";
import { CodeIndexerHomePromo } from "@/components/CodeIndexer/CodeIndexerLanding";
import { createCopyToClipboardHandler } from "@/shared/utils/copyToClipboard";
import { trackGoal } from "@/shared/utils/metricsManager";
import {
  VALID_TABS,
  TAB_GOAL_NAMES,
  TAB_VALUES,
  DEFAULT_TAB,
  DEMO_URL,
  type TabValue,
} from "@/shared/constants";

const YDB_QDRANT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "YDB-Qdrant",
  url: "https://ydb-qdrant.tech/",
  description:
    "Qdrant-compatible vector search API on YDB. Exact top-k search over a global one-table layout for HTTP, Node.js library, and million-vector collection scenarios.",
  codeRepository: "https://github.com/astandrik/ydb-qdrant",
  applicationCategory: "DeveloperApplication",
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

const YDB_QDRANT_JSON_LD_SCRIPT = serializeJsonLd(YDB_QDRANT_JSON_LD);

/**
 * Component that handles URL search params.
 * Wrapped in Suspense because useSearchParams() requires it in Next.js App Router.
 */
function SearchParamsHandler({
  onParamsReady,
}: {
  onParamsReady: (activeTab: TabValue, tabFromUrl: string | null) => void;
}) {
  const searchParams = useSearchParams();

  const tabFromUrl = searchParams.get("tab");
  const activeTab: TabValue =
    tabFromUrl && VALID_TABS.includes(tabFromUrl as TabValue)
      ? (tabFromUrl as TabValue)
      : DEFAULT_TAB;

  useEffect(() => {
    onParamsReady(activeTab, tabFromUrl);
  }, [activeTab, tabFromUrl, onParamsReady]);

  return null;
}

function HomeContent() {
  const router = useRouter();
  const gettingStartedRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<TabValue>(DEFAULT_TAB);
  const [tabFromUrl, setTabFromUrl] = useState<string | null>(null);
  const [paramsReady, setParamsReady] = useState(false);

  const handleParamsReady = (tab: TabValue, urlTab: string | null) => {
    setActiveTab(tab);
    setTabFromUrl(urlTab);
    setParamsReady(true);
  };

  const updateTabInUrl = (newTab: TabValue) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", newTab);
    router.replace(`?${params.toString()}`, { scroll: false });
    setActiveTab(newTab);
  };

  const openIdeDetails = (scrollSmooth: boolean) => {
    updateTabInUrl(TAB_VALUES.PUBLIC_DEMO);
    if (gettingStartedRef.current) {
      try {
        gettingStartedRef.current.scrollIntoView({
          behavior: scrollSmooth ? "smooth" : "auto",
          block: "start",
        });
      } catch {
        gettingStartedRef.current.scrollIntoView();
      }
    }
  };

  // Handle ide-config scroll on mount
  useEffect(() => {
    if (!paramsReady) return;

    const params = new URLSearchParams(window.location.search);
    const ideConfig = params.get("ide-config");

    if (ideConfig === "true" && !tabFromUrl && gettingStartedRef.current) {
      try {
        gettingStartedRef.current.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      } catch {
        gettingStartedRef.current.scrollIntoView();
      }
    }
  }, [paramsReady, tabFromUrl]);

  const handleTabChange = (tab: string) => {
    if (!VALID_TABS.includes(tab as TabValue)) {
      return;
    }
    const validTab = tab as TabValue;
    updateTabInUrl(validTab);

    const goalName = TAB_GOAL_NAMES[validTab];
    if (goalName) {
      trackGoal(goalName);
    }
  };

  const handleCopy = createCopyToClipboardHandler({
    page: "root",
    area: "hero",
    successLabel: "Copied!",
  });

  return (
    <>
      {/* SearchParamsHandler is wrapped in Suspense to handle useSearchParams() */}
      <Suspense fallback={null}>
        <SearchParamsHandler onParamsReady={handleParamsReady} />
      </Suspense>
      <script type="application/ld+json">{YDB_QDRANT_JSON_LD_SCRIPT}</script>
      <LangSwitcher />
      <GitHubRepoIcon />
      <NpmPackageIcon />
      <main className="wrap">
        <HeroSection
          onOpenIdeDetails={openIdeDetails}
          onCopyDemoUrl={(e: MouseEvent<HTMLButtonElement>) =>
            handleCopy(DEMO_URL, e)
          }
        />
        <CodeIndexerHomePromo />
        <section className="section">
          <AskAIPanel
            productName={ASK_AI_PRODUCT_NAME}
            productId={ASK_AI_PRODUCT_ID}
            label={ASK_AI_HOME_EN.label}
            helperText={ASK_AI_HOME_EN.helperText}
            providerAriaLabelTemplate={ASK_AI_HOME_EN.providerAriaLabelTemplate}
            prompt={ASK_AI_HOME_EN.prompt}
            page={ASK_AI_HOME_EN.page}
            promptVariant={ASK_AI_HOME_EN.promptVariant}
          />
        </section>
        <WhySection />
        <WhereSection />
        <LimitationsSection />
        <PlansSection />
        <GettingStartedSection
          sectionRef={gettingStartedRef}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onCopyDemoUrl={(e: MouseEvent<HTMLButtonElement>) =>
            handleCopy(DEMO_URL, e)
          }
        />
        <ApiAtAGlanceSection activeTab={activeTab} />
        <VectorDimensionsSection />
      </main>
    </>
  );
}

export default function Home() {
  return <HomeContent />;
}
