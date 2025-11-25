"use client";

import type { MouseEvent, ReactNode } from "react";
import { ServiceStatus } from "@/components/ServiceStatus";
import "./DemoEndpointBadge.scss";

export type DemoEndpointBadgeProps = {
  label: ReactNode;
  url: string;
  buttonLabel: string;
  onCopy: (event: MouseEvent<HTMLButtonElement>) => void;
  locale?: "en" | "ru";
};

export function DemoEndpointBadge({
  label,
  url,
  buttonLabel,
  onCopy,
  locale = "en",
}: DemoEndpointBadgeProps) {
  return (
    <div className="hero-demo">
      {label} <code>{url}</code>
      <button type="button" className="copy-btn" onClick={onCopy}>
        {buttonLabel}
      </button>
      <ServiceStatus locale={locale} />
    </div>
  );
}


