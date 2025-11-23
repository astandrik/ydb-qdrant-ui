"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import LangSwitcher from "@/components/LangSwitcher";
import GitHubRepoIcon from "@/components/GitHubRepoIcon";
import NpmPackageIcon from "@/components/NpmPackageIcon";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import WhereSection from "@/components/WhereSection";
import PlansSection from "@/components/PlansSection";
import GettingStartedSection from "@/components/GettingStartedSection";
import ApiAtAGlanceSection from "@/components/ApiAtAGlanceSection";
import { createCopyToClipboardHandler } from "@/shared/utils/copyToClipboard";

export default function Home() {
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
    page: "root",
    area: "hero",
    successLabel: "Copied!",
  });

  return (
    <>
      <LangSwitcher />
      <GitHubRepoIcon />
      <NpmPackageIcon />
      <main className="wrap">
        <HeroSection
          onOpenIdeDetails={openIdeDetails}
          onCopyDemoUrl={(e: MouseEvent<HTMLButtonElement>) =>
            handleCopy("http://ydb-qdrant.tech:8080", e)
          }
        />
        <WhySection />
        <WhereSection />
        <PlansSection />
        <GettingStartedSection
          sectionRef={gettingStartedRef}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <ApiAtAGlanceSection />
      </main>
    </>
  );
}
