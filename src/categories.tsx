export const categories = [
  'color theory',
  'web design',
  'UI/UX',
  'web development',
  'responsive design',
] as const;
export type Category = (typeof categories)[number];
