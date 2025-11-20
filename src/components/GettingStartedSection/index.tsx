import type { RefObject } from "react";
import { GettingStartedSectionBase } from "./GettingStartedSection";
import {
  gettingStartedSectionEnProps,
  gettingStartedSectionRuProps,
  type GettingStartedSectionProps,
} from "./locales";

export const GettingStartedSectionEn = ({
  ideDetailsRef,
}: GettingStartedSectionProps) => {
  return (
    <GettingStartedSectionBase
      ideDetailsRef={ideDetailsRef}
      {...gettingStartedSectionEnProps(ideDetailsRef)}
    />
  );
};

export const GettingStartedSectionRu = ({
  ideDetailsRef,
}: GettingStartedSectionProps) => {
  return (
    <GettingStartedSectionBase
      ideDetailsRef={ideDetailsRef}
      {...gettingStartedSectionRuProps(ideDetailsRef)}
    />
  );
};

export { GettingStartedSectionBase } from "./GettingStartedSection";
export type { GettingStartedSectionProps } from "./locales";

const GettingStartedSection = GettingStartedSectionEn;

export default GettingStartedSection;

