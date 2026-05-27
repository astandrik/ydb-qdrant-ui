"use client";

import Image from "next/image";
import { trackGoal } from "@/shared/utils/metricsManager";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <nav className="footer__nav" aria-label="Developer links">
          <span className="footer__nav-title">Developers</span>
          <a href="/developers/" className="footer__nav-link">
            Hub
          </a>
          <a href="/docs/api/" className="footer__nav-link">
            API
          </a>
          <a href="/docs/auth/" className="footer__nav-link">
            Auth
          </a>
          <a href="/pricing/" className="footer__nav-link">
            Pricing
          </a>
          <a href="/.well-known/mcp/server-card.json" className="footer__nav-link">
            MCP
          </a>
          <a href="/openapi.json" className="footer__nav-link">
            OpenAPI
          </a>
        </nav>
        <nav className="footer__nav" aria-label="Code Indexer links">
          <span className="footer__nav-title">Code Indexer</span>
          <a href="/code-indexer/" className="footer__nav-link">
            Product
          </a>
          <a href="/code-indexer/privacy/" className="footer__nav-link">
            Privacy
          </a>
          <a href="/code-indexer/support/" className="footer__nav-link">
            Support
          </a>
          <a href="/code-indexer/status/" className="footer__nav-link">
            Status
          </a>
        </nav>
      </div>
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
          <span>gravity-ui/uikit</span>
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
