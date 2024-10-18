import { categories } from '@/categories';
import { type Category } from '@/categories';
import { notFound } from 'next/navigation';

export default async function Category({
  params,
}: {
  params: { category: Category };
}) {
  const { category } = params;

  if (categories.indexOf(category) === -1) {
    notFound();
  }

  return (
    <main>
      <h1>Category: {category}</h1>
    </main>
  );
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category,
  }));
}
