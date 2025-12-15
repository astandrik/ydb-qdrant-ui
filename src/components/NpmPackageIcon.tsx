import { SiNpm } from "@icons-pack/react-simple-icons";
import { trackGoal } from "@/shared/utils/metricsManager";
import "./HeaderIcons.scss";

const NpmPackageIcon = () => {
  return (
    <a
      id="npm-package-icon"
      className="header-icon header-icon--npm"
      href="https://www.npmjs.com/package/ydb-qdrant"
      aria-label="npm package ydb-qdrant"
      target="_blank"
      rel="noopener"
      onClick={() => trackGoal("npm_click", { target: "icon" })}
    >
      <SiNpm size={18} className="header-icon__icon" />
    </a>
  );
};

export default NpmPackageIcon;

