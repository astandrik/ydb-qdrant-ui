import type { ReactNode, RefObject, SyntheticEvent } from "react";
import { useRef } from "react";
import Image from "next/image";
import { trackGoal } from "@/shared/utils/metricsManager";

export type DocsLink = {
  href: string;
  label: string;
};

export type GettingStartedSectionBaseProps = {
  ideDetailsRef: RefObject<HTMLDetailsElement | null>;
  title: string;
  ideConfigSummary: string;
  ideConfigDescription: ReactNode;
  ideConfigImageAlt: string;
  ideUnderHoodSummary: string;
  ideUnderHoodImageAlt: string;
  optionsTitle: string;
  optionsSelfHost: ReactNode;
  optionsHosted: ReactNode;
  docsTitle: string;
  docsLinks: DocsLink[];
  selfHostedBlock: ReactNode;
};

export const GettingStartedSectionBase = ({
  ideDetailsRef,
  title,
  ideConfigSummary,
  ideConfigDescription,
  ideConfigImageAlt,
  ideUnderHoodSummary,
  ideUnderHoodImageAlt,
  optionsTitle,
  optionsSelfHost,
  optionsHosted,
  docsTitle,
  docsLinks,
  selfHostedBlock,
}: GettingStartedSectionBaseProps) => {
  const videoProgressRef = useRef({
    hasStarted: false,
    reached25: false,
    reached50: false,
    reached75: false,
    reached100: false,
  });

  const handleVideoPlay = () => {
    const state = videoProgressRef.current;

    if (!state.hasStarted) {
      state.hasStarted = true;
      trackGoal("ide_video_play");
    }
  };

  const handleVideoTimeUpdate = (
    event: SyntheticEvent<HTMLVideoElement>
  ) => {
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

    if (percent >= 100 && !state.reached100) {
      state.reached100 = true;
      trackGoal("ide_video_progress", { percent: 100, currentTime, duration });
    }
  };

  const handleVideoEnded = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { duration } = event.currentTarget;

    if (!duration || Number.isNaN(duration)) return;

    trackGoal("ide_video_complete", { duration });
  };

  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>

      <details
        id="ide-config"
        ref={ideDetailsRef}
        onToggle={(e) => {
          if (e.currentTarget.open) trackGoal("instructions_open");
        }}
      >
        <summary>{ideConfigSummary}</summary>
        <figure style={{ margin: "16px 0" }}>
          <video
            src="https://storage.yandexcloud.net/ydb-qdrant/1121.mp4"
            controls
            autoPlay
            muted
            playsInline
            onPlay={handleVideoPlay}
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnded}
            style={{
              width: "100%",
              maxWidth: "640px",
              height: "auto",
              border: "1px solid #19212b",
              borderRadius: "8px",
              display: "block",
              margin: "0 auto",
            }}
            aria-label={ideConfigImageAlt}
          />
        </figure>
        {ideConfigDescription}
      </details>

      <details id="ide-config-diagram">
        <summary>{ideUnderHoodSummary}</summary>
        <figure style={{ margin: "16px 0" }}>
          <Image
            src="/assets/diagram.svg"
            alt={ideUnderHoodImageAlt}
            width={960}
            height={540}
            style={{
              width: "100%",
              maxWidth: "960px",
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

      <div className="grid">
        <div className="card">
          <strong>{optionsTitle}</strong>
          <ul className="muted">
            <li>{optionsSelfHost}</li>
            <li>{optionsHosted}</li>
          </ul>
        </div>

        <div className="card">
          <strong>{docsTitle}</strong>
          <ul className="muted">
            {docsLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card card-standalone">{selfHostedBlock}</div>
    </section>
  );
};

