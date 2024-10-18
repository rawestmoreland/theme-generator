import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='my-8 mx-auto flex flex-col gap-8'>
      <Link
        className='flex items-center hover:underline underline-offset-2'
        href='/blog'
      >
        <ArrowLeftIcon className='h-4 w-4 mr-2' />
        Back to the blog
      </Link>

      <article className='prose mx-auto'>{children}</article>
    </main>
  );
}
