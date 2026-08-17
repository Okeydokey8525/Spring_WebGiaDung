import type { Metadata } from 'next';
import { ProductEditor } from '@/components/admin/products/product-editor';
import { parseProductEditorTab } from '@/features/admin/products/product-editor-tabs';

export const metadata: Metadata = {
  title: 'Tạo sản phẩm',
};

interface NewProductPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewProductPage({
  searchParams,
}: NewProductPageProps) {
  const params = await searchParams;
  const activeTab = parseProductEditorTab(params.tab);

  return <ProductEditor mode="create" activeTab={activeTab} />;
}
