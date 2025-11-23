"use client";

import { trackGoal } from "@/shared/utils/metricsManager";

export default function Footer() {
  return (
    <footer className="footer-container">
      <p className="footer-text">
        Created with{" "}
        <a
          href="https://github.com/gravity-ui/uikit"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          onClick={() =>
            trackGoal("github_uikit_click", { source: "footer" })
          }
        >
          gravity-ui/uikit
        </a>
      </p>
    </footer>
  );
}
