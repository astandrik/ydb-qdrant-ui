import { trackGoal } from "@/shared/utils/metricsManager";
import "./HeaderIcons.scss";

const NpmPackageIcon = () => {
  return (
    <a
      id="npm-package-icon"
      className="gh-icon gh-icon--npm"
      href="https://www.npmjs.com/package/ydb-qdrant"
      aria-label="npm package ydb-qdrant"
      target="_blank"
      rel="noopener"
      onClick={() => trackGoal("npm_click", { target: "icon" })}
    >
      <svg viewBox="0 0 40 16" role="img" aria-hidden="true">
        <rect x="0" y="0" width="40" height="16" rx="3" ry="3" fill="#cb3837" />
        <text
          x="8"
          y="11"
          fontSize="9"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fill="#ffffff"
        >
          npm
        </text>
      </svg>
    </a>
  );
};

export default NpmPackageIcon;


