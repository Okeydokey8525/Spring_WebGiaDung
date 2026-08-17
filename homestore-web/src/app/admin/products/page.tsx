import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Sản phẩm',
};

const capabilities = [
    'Danh sách sản phẩm',
    'Tạo và chỉnh sửa',
    'Trạng thái lưu trữ',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Sản phẩm"
      title="Sản phẩm"
      description="Quản lý danh sách và thông tin sản phẩm của HomeStore."
      capabilities={capabilities}
      actionLabel="Tạo sản phẩm"
    />
  );
}
