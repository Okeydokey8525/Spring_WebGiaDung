import type { Metadata } from 'next';
import { CategoryEditor } from '@/components/admin/catalog/category-editor';

export const metadata: Metadata = {
  title: 'Tạo danh mục',
};

export default function NewCategoryPage() {
  return <CategoryEditor mode="create" />;
}
