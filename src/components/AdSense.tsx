'use client';

import React, { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';

type AdFormat = '320x100' | '468x60' | '728x90' | 'auto';

interface AdSenseProps {
  adSlot: string;
  style?: React.CSSProperties;
}

const AdSense: React.FC<AdSenseProps> = ({ adSlot, style = {} }) => {
  const width = useWindowWidth();
  const [adFormat, setAdFormat] = useState<AdFormat>('auto');

  useEffect(() => {
    // Determine ad format based on width
    if (width < 468) {
      setAdFormat('320x100');
    } else if (width < 728) {
      setAdFormat('468x60');
    } else {
      setAdFormat('728x90');
    }

    try {
      // @ts-expect-error no idea why this is not working
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [width]);

  return (
    <div style={{ textAlign: 'center', overflow: 'hidden', ...style }}>
      <ins
        className='adsbygoogle'
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive='true'
      />
    </div>
  );
};

export default AdSense;
