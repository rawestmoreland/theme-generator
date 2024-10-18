'use client';

import { type ComponentPropsWithoutRef } from 'react';

export function Heading1(props: ComponentPropsWithoutRef<'h1'>) {
  return <h1 className='underline text-4xl font-semibold' {...props} />;
}
