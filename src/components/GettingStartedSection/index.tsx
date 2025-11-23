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
}: GettingStartedSectionProps) => {
  return (
    <GettingStartedSectionBase
      sectionRef={sectionRef}
      activeTab={activeTab}
      onTabChange={onTabChange}
      {...gettingStartedSectionEnProps()}
    />
  );
};

export const GettingStartedSectionRu = ({
  sectionRef,
  activeTab,
  onTabChange,
}: GettingStartedSectionProps) => {
  return (
    <GettingStartedSectionBase
      sectionRef={sectionRef}
      activeTab={activeTab}
      onTabChange={onTabChange}
      {...gettingStartedSectionRuProps()}
    />
  );
};

export { GettingStartedSectionBase } from "./GettingStartedSection";
export type { GettingStartedSectionProps } from "./locales";

const GettingStartedSection = GettingStartedSectionEn;

export default GettingStartedSection;
