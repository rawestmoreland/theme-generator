/* eslint-disable @typescript-eslint/no-explicit-any */
import { type MDXComponents as TMDXComponents } from 'mdx/types';

export function useMDXComponents(components: TMDXComponents) {
  return {
    ...components,
  };
}
