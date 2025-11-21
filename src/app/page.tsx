"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";
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
  const ideDetailsRef = useRef<HTMLDetailsElement>(null);

  const openIdeDetails = (scrollSmooth: boolean) => {
    if (ideDetailsRef.current) {
      ideDetailsRef.current.open = true;
      try {
        ideDetailsRef.current.scrollIntoView({
          behavior: scrollSmooth ? "smooth" : "auto",
          block: "start",
        });
      } catch {
        ideDetailsRef.current.scrollIntoView();
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
        <GettingStartedSection ideDetailsRef={ideDetailsRef} />
        <ApiAtAGlanceSection />
      </main>
    </>
  );
}

