import { LimitationsSectionBase } from "./LimitationsSection";
import {
  limitationsSectionEnProps,
  limitationsSectionRuProps,
} from "./locales";

export const LimitationsSectionEn = () => (
  <LimitationsSectionBase {...limitationsSectionEnProps} />
);

export const LimitationsSectionRu = () => (
  <LimitationsSectionBase {...limitationsSectionRuProps} />
);

export default LimitationsSectionEn;
