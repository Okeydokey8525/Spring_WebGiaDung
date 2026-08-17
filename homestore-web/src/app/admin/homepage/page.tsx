import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Trang chủ',
};

const capabilities = [
    'Hero',
    'Khối danh mục',
    'Khối sản phẩm',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Nội dung"
      title="Trang chủ"
      description="Quản lý các vùng nội dung của storefront khi Content backend được triển khai."
      capabilities={capabilities}
    />
  );
}
