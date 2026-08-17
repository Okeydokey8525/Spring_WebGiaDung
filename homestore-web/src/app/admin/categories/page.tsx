import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Danh mục',
};

const capabilities = [
    'Danh mục cha/con',
    'Thứ tự hiển thị',
    'Trạng thái danh mục',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Sản phẩm"
      title="Danh mục"
      description="Quản lý cấu trúc danh mục dùng cho catalog và storefront."
      capabilities={capabilities}
      actionLabel="Thêm danh mục"
    />
  );
}
