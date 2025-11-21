"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";
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
  const ideDetailsRef = useRef<HTMLDetailsElement | null>(null);

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
        <GettingStartedSectionRu ideDetailsRef={ideDetailsRef} />

        <ApiAtAGlanceSectionRu />
      </main>
    </>
  );
}


