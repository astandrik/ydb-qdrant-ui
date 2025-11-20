import { WhySectionBase } from "./WhySection";
import { whySectionEnProps, whySectionRuProps } from "./locales";

export const WhySectionEn = () => (
  <WhySectionBase title={whySectionEnProps.title} cards={whySectionEnProps.cards} />
);

export const WhySectionRu = () => (
  <WhySectionBase title={whySectionRuProps.title} cards={whySectionRuProps.cards} />
);

export { WhySectionBase } from "./WhySection";

export default WhySectionEn;

