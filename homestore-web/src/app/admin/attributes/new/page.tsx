import type { Metadata } from 'next';
import { EntityCreatePreview } from '@/components/admin/catalog/entity-create-preview';

export const metadata: Metadata = {
  title: 'Tạo thuộc tính',
};

export default function NewAttributePage() {
  return <EntityCreatePreview kind="attribute" />;
}
