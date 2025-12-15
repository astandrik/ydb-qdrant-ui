"use client";

import Image from "next/image";
import { trackGoal } from "@/shared/utils/metricsManager";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Created with{" "}
        <a
          href="https://github.com/gravity-ui/uikit"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          onClick={() =>
            trackGoal("github_uikit_click", { source: "footer" })
          }
        >
          <span>
            gravity-ui/uikit
          </span>
          <Image
            src="/assets/gravity-ui-favicon.png"
            alt="Gravity UI"
            width={18}
            height={18}
            className="footer__icon"
            unoptimized
          />
        </a>
      </p>
    </footer>
  );
}
