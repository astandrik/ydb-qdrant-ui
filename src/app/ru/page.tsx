"use client";

import type { MouseEvent } from "react";
import { Suspense, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LangSwitcher from "@/components/LangSwitcher";
import GitHubRepoIcon from "@/components/GitHubRepoIcon";
import NpmPackageIcon from "@/components/NpmPackageIcon";
import {
  HeroSectionRu,
} from "@/components/HeroSection";
import { WhySectionRu } from "@/components/WhySection";
import { WhereSectionRu } from "@/components/WhereSection";
import { PlansSectionRu } from "@/components/PlansSection";
import { ApiAtAGlanceSectionRu } from "@/components/ApiAtAGlanceSection";
import { VectorDimensionsSectionRu } from "@/components/VectorDimensionsSection";
import { GettingStartedSectionRu } from "@/components/GettingStartedSection";
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

function HomeRuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const gettingStartedRef = useRef<HTMLElement>(null);

  // Derive active tab from URL - single source of truth to avoid hydration mismatch
  const tabFromUrl = searchParams.get("tab");
  const activeTab: TabValue =
    tabFromUrl && VALID_TABS.includes(tabFromUrl as TabValue)
      ? (tabFromUrl as TabValue)
      : DEFAULT_TAB;

  const updateTabInUrl = (newTab: TabValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.replace(`?${params.toString()}`, { scroll: false });
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
    const ideConfig = searchParams.get("ide-config");

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
  }, [searchParams, tabFromUrl]);

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
    page: "ru",
    area: "hero",
    successLabel: "Скопировано!",
  });

  return (
    <>
      <LangSwitcher />
      <GitHubRepoIcon />
      <NpmPackageIcon />
      <main className="wrap">
        <HeroSectionRu
          onOpenIdeDetails={openIdeDetails}
          onCopyDemoUrl={(e: MouseEvent<HTMLButtonElement>) =>
            handleCopy(DEMO_URL, e)
          }
        />

        <WhySectionRu />

        <WhereSectionRu />

        <PlansSectionRu />
        <GettingStartedSectionRu
          sectionRef={gettingStartedRef}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onCopyDemoUrl={(e: MouseEvent<HTMLButtonElement>) =>
            handleCopy(DEMO_URL, e)
          }
        />

        <ApiAtAGlanceSectionRu activeTab={activeTab} />
        <VectorDimensionsSectionRu />
      </main>
    </>
  );
}

export default function HomeRu() {
  return (
    <Suspense fallback={null}>
      <HomeRuContent />
    </Suspense>
  );
}
