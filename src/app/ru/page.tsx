"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
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
import { GettingStartedSectionRu } from "@/components/GettingStartedSection";
import { createCopyToClipboardHandler } from "@/shared/utils/copyToClipboard";

export default function HomeRu() {
  const [activeTab, setActiveTab] = useState("public-demo");
  const gettingStartedRef = useRef<HTMLElement>(null);

  const openIdeDetails = (scrollSmooth: boolean) => {
    setActiveTab("public-demo");

    const params = new URLSearchParams(window.location.search);
    const tabFromQuery = params.get("tab");

    // Only scroll if no tab is specified in query params
    if (!tabFromQuery && gettingStartedRef.current) {
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    const ideConfig = params.get("ide-config");
    const validTabs = ["public-demo", "self-hosted", "docker", "npm"];

    if (ideConfig === "true") {
      openIdeDetails(false);
    }

    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    window.history.replaceState(null, "", `?${params.toString()}`);
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
            handleCopy("http://ydb-qdrant.tech:8080", e)
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
            handleCopy("http://ydb-qdrant.tech:8080", e)
          }
        />

        <ApiAtAGlanceSectionRu activeTab={activeTab} />
      </main>
    </>
  );
}
