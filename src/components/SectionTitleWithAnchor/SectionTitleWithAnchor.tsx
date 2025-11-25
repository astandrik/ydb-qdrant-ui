import type { ReactNode } from "react";
import { Icon } from "@gravity-ui/uikit";
import { Link as LinkIcon } from "@gravity-ui/icons";
import "./SectionTitleWithAnchor.scss";

type SectionTitleWithAnchorProps = {
  title: ReactNode;
  href: string;
  className?: string;
  anchorAriaLabel?: string;
};

export const SectionTitleWithAnchor = ({
  title,
  href,
  className,
  anchorAriaLabel = "Anchor to this section",
}: SectionTitleWithAnchorProps) => {
  const headingClassName = className
    ? `${className} section-title-with-anchor`
    : "section-title section-title-with-anchor";

  return (
    <h2 className={headingClassName}>
      {title}
      <a
        href={href}
        className="section-title-with-anchor-link"
        aria-label={anchorAriaLabel}
      >
        <Icon data={LinkIcon} size={20} />
      </a>
    </h2>
  );
};
