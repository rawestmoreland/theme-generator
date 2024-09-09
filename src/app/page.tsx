import AdSense from '@/components/AdSense';
import NextThemeSwatches from '@/components/next-theme-swatches';
import { ThemeProvider } from '@/components/theme-provider';

export default function Home() {
  return (
    <ThemeProvider
      attribute='data-theme'
      defaultTheme='zinc'
      enableSystem={false}
      themes={[
        'zinc',
        'zinc-dark',
        'slate',
        'slate-dark',
        'stone',
        'stone-dark',
        'gray',
        'gray-dark',
        'blue',
        'blue-dark',
        'orange',
        'orange-dark',
        'bubblegum-pop',
        'bubblegum-pop-dark',
        'cyberpunk-neon',
        'cyberpunk-neon-dark',
        'retro-arcade',
        'retro-arcade-dark',
        'tropical-paradise',
        'tropical-paradise-dark',
        'steampunk-cogs',
        'steampunk-cogs-dark',
        'neon-synthwave',
        'neon-synthwave-dark',
        'pastel-kawaii',
        'pastel-kawaii-dark',
        'space-odyssey',
        'space-odyssey-dark',
        'vintage-vinyl',
        'vintage-vinyl-dark',
        'misty-harbor',
        'misty-harbor-dark',
        'zen-garden',
        'zen-garden-dark',
      ]}
    >
      <div className='space-y-8 m-8'>
        <div className=' flex flex-col gap-2'>
          <NextThemeSwatches />
          <div className='w-full max-w-3xl mx-auto'>
            <AdSense
              data-ad-slot='8682009292'
              data-ad-format='auto'
              data-full-width-responsive='true'
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
