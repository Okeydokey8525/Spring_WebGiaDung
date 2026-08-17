import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Thuộc tính',
};

const capabilities = [
    'Thuộc tính',
    'Giá trị thuộc tính',
    'Liên kết sản phẩm',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Sản phẩm"
      title="Thuộc tính"
      description="Chuẩn bị quản lý thuộc tính và các giá trị dùng cho sản phẩm."
      capabilities={capabilities}
      actionLabel="Thêm thuộc tính"
    />
  );
}
