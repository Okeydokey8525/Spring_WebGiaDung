import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductEditor } from '@/components/admin/products/product-editor';
import { getCatalogItems } from '@/features/catalog/data/catalog-source';
import { parseProductEditorTab } from '@/features/admin/products/product-editor-tabs';

export const dynamicParams = false;

export const metadata: Metadata = {
  title: 'Chỉnh sửa sản phẩm',
};

export function generateStaticParams() {
  return getCatalogItems().map((item) => ({
    id: item.id,
  }));
}

interface EditProductPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EditProductPage({
  params,
  searchParams,
}: EditProductPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const item = getCatalogItems().find((candidate) => candidate.id === id);

  if (!item) notFound();

  const activeTab = parseProductEditorTab(query.tab);

  return <ProductEditor mode="edit" item={item} activeTab={activeTab} />;
}
