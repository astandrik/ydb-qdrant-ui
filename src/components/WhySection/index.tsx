import { WhySectionBase } from "./WhySection";
import { whySectionEnProps, whySectionRuProps } from "./locales";

export const WhySectionEn = () => (
  <WhySectionBase {...whySectionEnProps} />
);

export const WhySectionRu = () => (
  <WhySectionBase {...whySectionRuProps} />
);

export { WhySectionBase } from "./WhySection";

export default WhySectionEn;
