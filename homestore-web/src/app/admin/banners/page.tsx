import type { Metadata } from 'next';
import { AdminModulePlaceholder } from '@/components/admin/admin-module-placeholder';

export const metadata: Metadata = {
  title: 'Banner',
};

const capabilities = [
    'Danh sách banner',
    'Vị trí hiển thị',
    'Thứ tự và trạng thái',
] as const;

export default function Page() {
  return (
    <AdminModulePlaceholder
      eyebrow="Nội dung"
      title="Banner"
      description="Chuẩn bị quản lý banner, vị trí hiển thị và nội dung liên kết."
      capabilities={capabilities}
      actionLabel="Thêm banner"
    />
  );
}
