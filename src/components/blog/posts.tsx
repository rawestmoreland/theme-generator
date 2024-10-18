import { type Post } from '@/posts';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Posts({ posts }: { posts: Post[] }) {
  return (
    <ol className='flex flex-col gap-2'>
      {posts.map(({ slug, title, publishDate, excerpt }) => (
        <li key={slug}>
          <Link className='group' href={`/blog/${slug}`}>
            <Card className='shadow-xl'>
              <CardHeader>
                <CardTitle>
                  <div className='flex flex-col gap-2'>
                    <h3 className='underline-offset-2 group-hover:underline'>
                      {title}
                    </h3>
                    <p className='text-sm font-normal'>
                      {new Date(publishDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </CardTitle>
                <CardDescription>{excerpt || ''}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <Avatar>
                  <AvatarImage src='/avatars/02.png' alt='Richard W.' />
                  <AvatarFallback>RW</AvatarFallback>
                </Avatar>
                <p className='ml-2'>Richard W</p>
              </CardFooter>
            </Card>
          </Link>
        </li>
      ))}
    </ol>
  );
}
