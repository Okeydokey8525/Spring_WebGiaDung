import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Đơn hàng',
};

const capabilities = [
    'Danh sách đơn',
    'Trạng thái đơn',
    'Chi tiết đơn hàng',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Thương mại"
      title="Đơn hàng"
      description="Chuẩn bị cho luồng xử lý đơn hàng từ tạo đơn đến giao hàng."
      capabilities={capabilities}
    />
  );
}
