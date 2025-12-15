import { MarkGithubIcon } from "@primer/octicons-react";
import { trackGoal } from "@/shared/utils/metricsManager";
import "./HeaderIcons.scss";

const GitHubRepoIcon = () => {
  return (
    <a
      id="gh-repo-icon"
      className="header-icon header-icon--github"
      href="https://github.com/astandrik/ydb-qdrant"
      aria-label="GitHub repository"
      target="_blank"
      rel="noopener"
      onClick={() =>
        trackGoal("repo_click", { source: "header_icon", target: "icon" })
      }
    >
      <MarkGithubIcon size={18} className="header-icon__icon" />
    </a>
  );
};

export default GitHubRepoIcon;

