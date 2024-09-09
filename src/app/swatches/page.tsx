import AdSense from '@/components/AdSense';
import { AllSwatches } from '@/components/all-swatches';
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  return (
    <ThemeProvider
      attribute='data-theme'
      themes={[
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
      ]}
    >
      <div className='min-h-screen space-y-8 m-8'>
        <Button variant='link' asChild>
          <div>
            <ArrowLeft className='h-4 w-4 mr-2' />
            <Link href='/'>Back</Link>
          </div>
        </Button>
        <AdSense
          data-ad-slot='7892467966'
          data-ad-format='auto'
          data-full-width-responsive='true'
        />
        <AllSwatches />
      </div>
    </ThemeProvider>
  );
}
