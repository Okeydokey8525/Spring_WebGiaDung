import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CommerceEmptyTable } from '@/components/admin/commerce/commerce-empty-table';

export const metadata: Metadata = {
  title: 'Giá bán',
};

const columns = [
  'Sản phẩm / biến thể',
  'Giá hiện hành',
  'Hiệu lực từ',
  'Trạng thái',
  'Lịch sử',
] as const;

export default function AdminPricingPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Thương mại"
        title="Giá bán"
        description="Quản lý giá hiện hành, thời điểm hiệu lực và lịch sử thay đổi khi Pricing contract được triển khai."
        action={
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white opacity-55"
          >
            Cập nhật giá
          </button>
        }
      />

      <section className="mb-5 rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-brand-soft)] p-4 text-sm leading-6 text-[var(--color-primary)]">
        HomeStore chưa có dữ liệu Pricing trong frontend fixture. Không có con số
        giá nào được tạo để minh họa.
      </section>

      <CommerceEmptyTable
        columns={columns}
        title="Chưa có dữ liệu giá bán"
        description="Bảng này sẽ nhận giá theo sản phẩm hoặc biến thể, thời điểm hiệu lực và lịch sử thay đổi sau khi Pricing backend sẵn sàng."
        actionLabel="Thêm giá"
      />
    </div>
  );
}
