import rehypeHighlight from 'rehype-highlight';
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
