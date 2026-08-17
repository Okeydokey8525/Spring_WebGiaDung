import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Khách hàng',
};

const capabilities = [
    'Danh sách khách hàng',
    'Thông tin liên hệ',
    'Lịch sử mua hàng',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Thương mại"
      title="Khách hàng"
      description="Khu vực quản lý hồ sơ khách hàng khi Auth và Customer được kết nối."
      capabilities={capabilities}
    />
  );
}
