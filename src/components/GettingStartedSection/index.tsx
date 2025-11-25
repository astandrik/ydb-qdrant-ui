import { GettingStartedSectionBase } from "./GettingStartedSection";
import {
  gettingStartedSectionEnProps,
  gettingStartedSectionRuProps,
  type GettingStartedSectionProps,
} from "./locales";

export const GettingStartedSectionEn = ({
  sectionRef,
  activeTab,
  onTabChange,
  onCopyDemoUrl,
}: GettingStartedSectionProps) => {
  return (
    <GettingStartedSectionBase
      sectionRef={sectionRef}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onCopyDemoUrl={onCopyDemoUrl}
      locale="en"
      {...gettingStartedSectionEnProps()}
    />
  );
};

export const GettingStartedSectionRu = ({
  sectionRef,
  activeTab,
  onTabChange,
  onCopyDemoUrl,
}: GettingStartedSectionProps) => {
  return (
    <GettingStartedSectionBase
      sectionRef={sectionRef}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onCopyDemoUrl={onCopyDemoUrl}
      locale="ru"
      {...gettingStartedSectionRuProps()}
    />
  );
};

export { GettingStartedSectionBase } from "./GettingStartedSection";
export type { GettingStartedSectionProps } from "./locales";

const GettingStartedSection = GettingStartedSectionEn;

export default GettingStartedSection;
