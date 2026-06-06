"use client";

import type { ReactNode } from "react";
import { trackGoal } from "@/shared/utils/metricsManager";

type TrackedResourceLinkProps = {
  children: ReactNode;
  href: string;
  label: string;
  page: string;
  source: string;
};

export function TrackedResourceLink({
  children,
  href,
  label,
  page,
  source,
}: TrackedResourceLinkProps) {
  const accessibleLabel = `${label} (opens in a new tab)`;

  return (
    <a
      aria-label={accessibleLabel}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={accessibleLabel}
      onClick={() =>
        trackGoal("source_link_click", {
          href,
          label,
          page,
          source,
        })
      }
    >
      {children}
    </a>
  );
}
