'use client';

import { type ComponentPropsWithoutRef } from 'react';

export function Heading2(props: ComponentPropsWithoutRef<'h2'>) {
  return <h2 className='text-2xl font-semibold' {...props} />;
}
