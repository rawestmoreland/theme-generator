import { Posts } from '@/components/blog/posts';
import { getPosts } from '@/posts';

export default async function Blog() {
  const posts = await getPosts();

  return (
    <main className='container mx-auto my-8'>
      <h1 className='text-6xl font-semibold underline mb-4'>Blog.</h1>
      <Posts posts={posts} />
    </main>
  );
}
