import { HeroSectionBase } from "./HeroSection";
import {
  heroSectionEnContent,
  heroSectionRuContent,
  type HeroSectionPublicProps,
} from "./locales";

export const HeroSectionEn = (props: HeroSectionPublicProps) => {
  return (
    <HeroSectionBase
      {...props}
      content={heroSectionEnContent}
      locale="en"
    />
  );
};

export const HeroSectionRu = (props: HeroSectionPublicProps) => {
  return (
    <HeroSectionBase
      {...props}
      content={heroSectionRuContent}
      locale="ru"
    />
  );
};

export { HeroSectionBase } from "./HeroSection";
export type { HeroSectionPublicProps } from "./locales";

export default HeroSectionEn;

