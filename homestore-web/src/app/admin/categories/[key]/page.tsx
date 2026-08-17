import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryEditor } from '@/components/admin/catalog/category-editor';
import { storeCategories } from '@/lib/config/store-categories';

export const dynamicParams = false;

export const metadata: Metadata = {
  title: 'Chỉnh sửa danh mục',
};

export function generateStaticParams() {
  return storeCategories.map((category) => ({
    key: category.key,
  }));
}

interface EditCategoryPageProps {
  params: Promise<{ key: string }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { key } = await params;
  const index = storeCategories.findIndex((category) => category.key === key);

  if (index < 0) notFound();

  return (
    <CategoryEditor
      mode="edit"
      category={storeCategories[index]}
      order={index + 1}
    />
  );
}
