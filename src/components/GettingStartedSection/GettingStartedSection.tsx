import type { MouseEvent, ReactNode, RefObject, SyntheticEvent } from "react";
import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Card,
  Link,
  TabProvider,
  TabList,
  Tab,
  TabPanel,
} from "@gravity-ui/uikit";
import { SectionTitleWithAnchor } from "../SectionTitleWithAnchor/SectionTitleWithAnchor";
import { trackGoal } from "@/shared/utils/metricsManager";
import { DemoEndpointBadge } from "@/components/DemoEndpointBadge";
import { TAB_VALUES } from "@/shared/constants";

export type DocsLink = {
  href: string;
  label: string;
};

export type GettingStartedSectionBaseProps = {
  sectionRef?: RefObject<HTMLElement | null>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  locale?: "en" | "ru";
  title: string;
  ideConfigSummary: string;
  ideConfigDescription: ReactNode;
  ideConfigImageAlt: string;
  ideUnderHoodSummary: string;
  ideUnderHoodImageAlt: string;
  optionsTitle?: string;
  optionsSelfHost?: ReactNode;
  optionsHosted: ReactNode;
  demoUrl: string;
  onCopyDemoUrl: (event: MouseEvent<HTMLButtonElement>) => void;
  docsTitle: string;
  docsLinks: DocsLink[];
  selfHostedNodeBlock: ReactNode;
  dockerBlock: ReactNode;
  npmBlock: ReactNode;
  allInOneDockerBlock: ReactNode;
  tabPublicDemoTitle: string;
  tabSelfHostedTitle: string;
  tabDockerTitle: string;
  tabNpmTitle: string;
  tabAllInOneDockerTitle: string;
};

export const GettingStartedSectionBase = ({
  sectionRef,
  activeTab,
  onTabChange,
  locale = "en",
  title,
  ideConfigSummary,
  ideConfigDescription,
  ideConfigImageAlt,
  ideUnderHoodSummary,
  ideUnderHoodImageAlt,
  optionsHosted,
  demoUrl,
  onCopyDemoUrl,
  docsTitle,
  docsLinks,
  selfHostedNodeBlock,
  dockerBlock,
  npmBlock,
  allInOneDockerBlock,
  tabPublicDemoTitle,
  tabSelfHostedTitle,
  tabDockerTitle,
  tabNpmTitle,
  tabAllInOneDockerTitle,
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
        <SectionTitleWithAnchor
          title={title}
          href="#ide-config"
          className="section-title"
        />

      <TabProvider value={activeTab} onUpdate={onTabChange}>
        <TabList size="l">
          <Tab value={TAB_VALUES.PUBLIC_DEMO}>{tabPublicDemoTitle}</Tab>
          <Tab value={TAB_VALUES.SELF_HOSTED}>{tabSelfHostedTitle}</Tab>
          <Tab value={TAB_VALUES.DOCKER}>{tabDockerTitle}</Tab>
          <Tab value={TAB_VALUES.NPM}>{tabNpmTitle}</Tab>
          <Tab value={TAB_VALUES.ALL_IN_ONE}>{tabAllInOneDockerTitle}</Tab>
        </TabList>

        <div style={{ marginTop: 24 }}>
          <TabPanel value={TAB_VALUES.PUBLIC_DEMO}>
            <Card type="container" className="card-standalone" id={TAB_VALUES.PUBLIC_DEMO}>
              <h3 className="card-title">{ideConfigSummary}</h3>
              <figure style={{ margin: "16px 0" }}>
                <video
                  ref={videoRef}
                  src="https://storage.yandexcloud.net/ydb-qdrant/1121.mp4"
                  controls
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
              <div style={{ marginTop: 24, fontSize: 16 }}>
                <DemoEndpointBadge
                  label={optionsHosted}
                  url={demoUrl}
                  buttonLabel={locale === "ru" ? "Копировать" : "Copy"}
                  onCopy={onCopyDemoUrl}
                  locale={locale}
                />
              </div>
              {ideConfigDescription}
            </Card>
          </TabPanel>

          <TabPanel value={TAB_VALUES.SELF_HOSTED}>
            <Card type="container" className="card-standalone" id={TAB_VALUES.SELF_HOSTED}>
              {selfHostedNodeBlock}
            </Card>
          </TabPanel>

          <TabPanel value={TAB_VALUES.DOCKER}>
            <Card type="container" className="card-standalone" id={TAB_VALUES.DOCKER}>
              {dockerBlock}
            </Card>
          </TabPanel>

          <TabPanel value={TAB_VALUES.NPM}>
            <Card type="container" className="card-standalone" id={TAB_VALUES.NPM}>
              {npmBlock}
            </Card>
          </TabPanel>

          <TabPanel value={TAB_VALUES.ALL_IN_ONE}>
            <Card type="container" className="card-standalone" id={TAB_VALUES.ALL_IN_ONE}>
              {allInOneDockerBlock}
            </Card>
          </TabPanel>
        </div>
      </TabProvider>
      </div>
    </section>
  );
};
