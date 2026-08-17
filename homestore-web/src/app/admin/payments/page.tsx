import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Thanh toán',
};

const capabilities = [
    'PENDING_PAYMENT',
    'Xác nhận thanh toán',
    'Đối chiếu đơn hàng',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Thương mại"
      title="Thanh toán"
      description="Theo dõi trạng thái thanh toán COD và chuyển khoản khi Payment được triển khai."
      capabilities={capabilities}
    />
  );
}
