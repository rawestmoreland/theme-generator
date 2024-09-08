import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from './ui/button';
import { Clipboard } from 'lucide-react';

type Props = {
  code: string;
};
export function CopyButton({ code }: Props) {
  return (
    <Button className='cursor-pointer' size='icon' variant='ghost' asChild>
      <CopyToClipboard text={code} onCopy={() => alert('Copied!')}>
        <div className='cursor-pointer'>
          <Clipboard size={16} />
        </div>
      </CopyToClipboard>
    </Button>
  );
}
