"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";
import LangSwitcher from "@/components/LangSwitcher";
import GitHubRepoIcon from "@/components/GitHubRepoIcon";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import WhereSection from "@/components/WhereSection";
import PlansSection from "@/components/PlansSection";
import GettingStartedSection from "@/components/GettingStartedSection";
import ApiAtAGlanceSection from "@/components/ApiAtAGlanceSection";
import { trackGoal } from "@/shared/utils/metricsManager";

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

  const handleCopy = async (text: string, e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const originalText = btn.textContent;

    const trackCopy = (success: boolean) => {
      trackGoal("demo_url_copy", { page: "root", area: "hero", success });
    };

    const showFeedback = () => {
      btn.textContent = "Copied!";
      btn.style.background = "var(--acc)";
      btn.style.color = "#041013";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "transparent";
        btn.style.color = "var(--acc)";
      }, 2000);
    };

    function fallbackCopy(val: string) {
      try {
        const ta = document.createElement("textarea");
        ta.value = val;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        trackCopy(ok);
        if (ok) showFeedback();
      } catch {
        trackCopy(false);
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        trackCopy(true);
        showFeedback();
      } catch {
        fallbackCopy(text);
      }
    } else {
      fallbackCopy(text);
    }
  };

  return (
    <>
      <LangSwitcher />
      <GitHubRepoIcon />
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

