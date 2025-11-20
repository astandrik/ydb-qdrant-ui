import { ApiAtAGlanceSectionBase } from "./ApiAtAGlanceSection";
import {
  apiAtAGlanceSectionEnProps,
  apiAtAGlanceSectionRuProps,
} from "./locales";

export const ApiAtAGlanceSectionEn = () => (
  <ApiAtAGlanceSectionBase {...apiAtAGlanceSectionEnProps} />
);

export const ApiAtAGlanceSectionRu = () => (
  <ApiAtAGlanceSectionBase {...apiAtAGlanceSectionRuProps} />
);

export { ApiAtAGlanceSectionBase } from "./ApiAtAGlanceSection";

export default ApiAtAGlanceSectionEn;

