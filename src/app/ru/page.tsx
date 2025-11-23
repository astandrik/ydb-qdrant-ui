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

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash === "#ide-config"
    ) {
      openIdeDetails(false);
    }
  }, []);

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
          onTabChange={setActiveTab}
        />

        <ApiAtAGlanceSectionRu />
      </main>
    </>
  );
}
