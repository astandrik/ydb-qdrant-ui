import { ApiAtAGlanceSectionBase } from "./ApiAtAGlanceSection";
import {
  apiAtAGlanceSectionEnProps,
  apiAtAGlanceSectionRuProps,
} from "./locales";

export type ApiAtAGlanceSectionProps = {
  activeTab?: string;
};

export const ApiAtAGlanceSectionEn = ({
  activeTab,
}: ApiAtAGlanceSectionProps) => (
  <ApiAtAGlanceSectionBase
    {...apiAtAGlanceSectionEnProps}
    activeTab={activeTab}
  />
);

export const ApiAtAGlanceSectionRu = ({
  activeTab,
}: ApiAtAGlanceSectionProps) => (
  <ApiAtAGlanceSectionBase
    {...apiAtAGlanceSectionRuProps}
    activeTab={activeTab}
  />
);

export { ApiAtAGlanceSectionBase } from "./ApiAtAGlanceSection";

export default ApiAtAGlanceSectionEn;
