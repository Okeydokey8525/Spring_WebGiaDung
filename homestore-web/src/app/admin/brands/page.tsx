import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Thương hiệu',
};

const capabilities = [
    'Danh sách thương hiệu',
    'Tên và mô tả',
    'Trạng thái sử dụng',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Sản phẩm"
      title="Thương hiệu"
      description="Quản lý thương hiệu gắn với sản phẩm."
      capabilities={capabilities}
      actionLabel="Thêm thương hiệu"
    />
  );
}
