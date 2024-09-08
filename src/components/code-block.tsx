'use client';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { CopyButton } from './copy-button';

type Props = {
  code: string;
  language: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
};
export default function CodeBlock({ code, style, language }: Props) {
  return (
    <div className='h-full min-h-full max-h-full'>
      <CopyButton code={code} />
      <SyntaxHighlighter
        language={language}
        style={style}
        wrapLines={true}
        scrollable={true}
        wrapLongLines={true}
        showInlineLineNumbers={false}
        customStyle={{
          border: '1px solid #c3c3c3',
          borderRadius: '5px',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
