'use client';

import { ClassAttributes, InsHTMLAttributes, JSX, useEffect } from 'react';

const AdSense = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLModElement> &
    InsHTMLAttributes<HTMLModElement>
) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className='adsbygoogle adbanner-customize'
      style={{
        display: 'block',
        overflow: 'hidden',
      }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
      {...props}
    />
  );
};
export default AdSense;
