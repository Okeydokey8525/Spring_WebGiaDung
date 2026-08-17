import type { Metadata } from 'next';
import { EntityCreatePreview } from '@/components/admin/catalog/entity-create-preview';

export const metadata: Metadata = {
  title: 'Tạo thương hiệu',
};

export default function NewBrandPage() {
  return <EntityCreatePreview kind="brand" />;
}
