import { VectorDimensionsSectionBase } from "./VectorDimensionsSection";
import {
  vectorDimensionsSectionEnProps,
  vectorDimensionsSectionRuProps,
} from "./locales";

export const VectorDimensionsSectionEn = () => (
  <VectorDimensionsSectionBase {...vectorDimensionsSectionEnProps} />
);

export const VectorDimensionsSectionRu = () => (
  <VectorDimensionsSectionBase {...vectorDimensionsSectionRuProps} />
);

export { VectorDimensionsSectionBase } from "./VectorDimensionsSection";

export default VectorDimensionsSectionEn;
