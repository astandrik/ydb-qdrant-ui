import type { ReactNode } from "react";
import { Highlight, type Language } from "prism-react-renderer";

export type CodeBlockProps = {
  code: string;
  language: Language;
};

const CodeBlock = ({ code, language }: CodeBlockProps): ReactNode => {
  return (
    <Highlight code={code} language={language} theme={undefined}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          {tokens.map((line, index) => (
            <div key={index} {...getLineProps({ line })}>
              {line.map((token, tokenIndex) => (
                <span key={tokenIndex} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;


