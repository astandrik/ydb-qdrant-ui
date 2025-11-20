import { DocsPageBase } from "./DocsPage";
import { docsPageEnProps, docsPageRuProps } from "./locales";

export const DocsPageEn = () => <DocsPageBase {...docsPageEnProps} />;

export const DocsPageRu = () => <DocsPageBase {...docsPageRuProps} />;

export { DocsPageBase };

export default DocsPageEn;


