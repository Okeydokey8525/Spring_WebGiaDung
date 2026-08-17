import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Tồn kho',
};

const capabilities = [
    'Số lượng khả dụng',
    'Điều chỉnh tồn',
    'Lịch sử biến động',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Thương mại"
      title="Tồn kho"
      description="Khu vực theo dõi số lượng tồn khi Inventory backend sẵn sàng."
      capabilities={capabilities}
    />
  );
}
