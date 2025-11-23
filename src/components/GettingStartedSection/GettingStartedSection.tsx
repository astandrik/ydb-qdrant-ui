import type { MouseEvent, ReactNode, RefObject, SyntheticEvent } from "react";
import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Card,
  Link,
  Text,
  TabProvider,
  TabList,
  Tab,
  TabPanel,
} from "@gravity-ui/uikit";
import { trackGoal } from "@/shared/utils/metricsManager";

export type DocsLink = {
  href: string;
  label: string;
};

export type GettingStartedSectionBaseProps = {
  sectionRef?: RefObject<HTMLElement | null>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  title: string;
  ideConfigSummary: string;
  ideConfigDescription: ReactNode;
  ideConfigImageAlt: string;
  ideUnderHoodSummary: string;
  ideUnderHoodImageAlt: string;
  optionsTitle: string;
  optionsSelfHost: ReactNode;
  optionsHosted: ReactNode;
  demoUrl: string;
  onCopyDemoUrl: (event: MouseEvent<HTMLButtonElement>) => void;
  docsTitle: string;
  docsLinks: DocsLink[];
  selfHostedNodeBlock: ReactNode;
  dockerBlock: ReactNode;
  npmBlock: ReactNode;
  tabPublicDemoTitle: string;
  tabSelfHostedTitle: string;
  tabDockerTitle: string;
  tabNpmTitle: string;
};

export const GettingStartedSectionBase = ({
  sectionRef,
  activeTab,
  onTabChange,
  title,
  ideConfigSummary,
  ideConfigDescription,
  ideConfigImageAlt,
  ideUnderHoodSummary,
  ideUnderHoodImageAlt,
  optionsTitle,
  optionsSelfHost,
  optionsHosted,
  demoUrl,
  onCopyDemoUrl,
  docsTitle,
  docsLinks,
  selfHostedNodeBlock,
  dockerBlock,
  npmBlock,
  tabPublicDemoTitle,
  tabSelfHostedTitle,
  tabDockerTitle,
  tabNpmTitle,
}: GettingStartedSectionBaseProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoProgressRef = useRef({
    hasStarted: false,
    reached25: false,
    reached50: false,
    reached75: false,
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(() => {
              // Autoplay may fail due to browser policy
            });
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(videoElement);

    return () => observer.disconnect();
  }, []);

  const handleVideoPlay = useCallback(() => {
    const state = videoProgressRef.current;

    if (!state.hasStarted) {
      state.hasStarted = true;
      trackGoal("ide_video_play");
    }
  }, []);

  const handleVideoTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      const { currentTime, duration } = video;

      if (!duration || Number.isNaN(duration)) return;

      const percent = (currentTime / duration) * 100;
      const state = videoProgressRef.current;

      if (percent >= 25 && !state.reached25) {
        state.reached25 = true;
        trackGoal("ide_video_progress", { percent: 25, currentTime, duration });
      }

      if (percent >= 50 && !state.reached50) {
        state.reached50 = true;
        trackGoal("ide_video_progress", { percent: 50, currentTime, duration });
      }

      if (percent >= 75 && !state.reached75) {
        state.reached75 = true;
        trackGoal("ide_video_progress", { percent: 75, currentTime, duration });
      }
    },
    []
  );

  const handleVideoEnded = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const { duration } = event.currentTarget;

      if (!duration || Number.isNaN(duration)) return;

      trackGoal("ide_video_complete", { duration });
    },
    []
  );

  return (
    <section className="section">
      <details id="ide-config-diagram" style={{ marginBottom: 32 }}>
        <summary>{ideUnderHoodSummary}</summary>
        <figure style={{ margin: "16px 0" }}>
          <Image
            src="/assets/diagram.svg"
            alt={ideUnderHoodImageAlt}
            width={960}
            height={540}
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              border: "1px solid #19212b",
              borderRadius: "8px",
              display: "block",
              margin: "0 auto",
            }}
            unoptimized
          />
        </figure>
      </details>

      <div style={{ marginBottom: 0 }}>
        <h3 className="section-title">{docsTitle}</h3>
        <Card type="container">
          <ul className="muted">
            {docsLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div
        ref={sectionRef as RefObject<HTMLDivElement>}
        id="ide-config"
        style={{ paddingTop: 48 }}
      >
        <h2 className="section-title">{title}</h2>

      <TabProvider value={activeTab} onUpdate={onTabChange}>
        <TabList size="l">
          <Tab
            value="public-demo"
            href="#public-demo"
            onClick={(e) => {
              e.preventDefault();
              onTabChange("public-demo");
              trackGoal("tab_public_demo_click");
            }}
          >
            {tabPublicDemoTitle}
          </Tab>
          <Tab
            value="self-hosted"
            href="#self-hosted"
            onClick={(e) => {
              e.preventDefault();
              onTabChange("self-hosted");
              trackGoal("tab_self_hosted_click");
            }}
          >
            {tabSelfHostedTitle}
          </Tab>
          <Tab
            value="docker"
            href="#docker"
            onClick={(e) => {
              e.preventDefault();
              onTabChange("docker");
              trackGoal("tab_docker_click");
            }}
          >
            {tabDockerTitle}
          </Tab>
          <Tab
            value="npm"
            href="#npm"
            onClick={(e) => {
              e.preventDefault();
              onTabChange("npm");
              trackGoal("tab_npm_click");
            }}
          >
            {tabNpmTitle}
          </Tab>
        </TabList>

        <div style={{ marginTop: 24 }}>
          <TabPanel value="public-demo">
            <Card type="container" className="card-standalone" id="public-demo">
              <h3 className="card-title">{ideConfigSummary}</h3>
              <figure style={{ margin: "16px 0" }}>
                <video
                  ref={videoRef}
                  src="https://storage.yandexcloud.net/ydb-qdrant/1121.mp4"
                  controls
                  autoPlay={shouldAutoplay}
                  muted
                  playsInline
                  onPlay={handleVideoPlay}
                  onTimeUpdate={handleVideoTimeUpdate}
                  onEnded={handleVideoEnded}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: "auto",
                    border: "1px solid #19212b",
                    borderRadius: "8px",
                    display: "block",
                    margin: "0 auto",
                    aspectRatio: "16 / 9",
                  }}
                  aria-label={ideConfigImageAlt}
                />
              </figure>
              <div style={{ marginTop: 24, fontSize: 16 }} className="hero-demo">
                {optionsHosted} <code>{demoUrl}</code>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={onCopyDemoUrl}
                >
                  Copy
                </button>
              </div>
              {ideConfigDescription}
            </Card>
          </TabPanel>

          <TabPanel value="self-hosted">
            <Card type="container" className="card-standalone" id="self-hosted">
              {selfHostedNodeBlock}
            </Card>
          </TabPanel>

          <TabPanel value="docker">
            <Card type="container" className="card-standalone" id="docker">
              {dockerBlock}
            </Card>
          </TabPanel>

          <TabPanel value="npm">
            <Card type="container" className="card-standalone" id="npm">
              {npmBlock}
            </Card>
          </TabPanel>
        </div>
      </TabProvider>
      </div>
    </section>
  );
};
