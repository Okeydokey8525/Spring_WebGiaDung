import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CommerceEmptyTable } from '@/components/admin/commerce/commerce-empty-table';

export const metadata: Metadata = {
  title: 'Khách hàng',
};

const columns = [
  'Khách hàng',
  'Email / điện thoại',
  'Địa chỉ',
  'Đơn hàng',
  'Hoạt động gần nhất',
  'Thao tác',
] as const;

export default function AdminCustomersPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Thương mại"
        title="Khách hàng"
        description="Quản lý hồ sơ, thông tin liên hệ, địa chỉ và lịch sử mua hàng sau khi Auth, Customer và Order được kết nối."
      />

      <section className="mb-5 rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-brand-soft)] p-4 text-sm leading-6 text-[var(--color-primary)]">
        Không có tài khoản khách hàng mẫu trong admin UI. Dữ liệu cá nhân chỉ
        được hiển thị khi có nguồn Customer thực và quyền truy cập phù hợp.
      </section>

      <CommerceEmptyTable
        columns={columns}
        title="Chưa có dữ liệu khách hàng"
        description="Danh sách sẽ hiển thị hồ sơ khách hàng và quan hệ với địa chỉ, đơn hàng sau khi Customer/Auth backend được triển khai."
      />
    </div>
  );
}
