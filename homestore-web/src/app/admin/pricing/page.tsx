import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Giá bán',
};

const capabilities = [
    'Giá hiện hành',
    'Lịch sử giá',
    'Hiệu lực giá',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Thương mại"
      title="Giá bán"
      description="Khu vực quản lý giá sản phẩm khi Pricing backend sẵn sàng."
      capabilities={capabilities}
    />
  );
}
