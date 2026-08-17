import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CommerceEmptyTable } from '@/components/admin/commerce/commerce-empty-table';

export const metadata: Metadata = {
  title: 'Tồn kho',
};

const columns = [
  'Sản phẩm / biến thể',
  'Khả dụng',
  'Đã giữ',
  'Điều chỉnh gần nhất',
  'Thao tác',
] as const;

export default function AdminInventoryPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Thương mại"
        title="Tồn kho"
        description="Theo dõi lượng hàng khả dụng và lịch sử điều chỉnh khi Inventory contract được triển khai."
        action={
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white opacity-55"
          >
            Điều chỉnh tồn
          </button>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {['Khả dụng', 'Đã giữ', 'Cần kiểm tra'].map((label) => (
          <div
            key={label}
            className="rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-subtle)]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">
              {label}
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--color-primary)]">
              Chưa có dữ liệu
            </p>
          </div>
        ))}
      </div>

      <CommerceEmptyTable
        columns={columns}
        title="Chưa có dữ liệu tồn kho"
        description="Không có số lượng tồn giả trong UI. Dữ liệu sẽ được hiển thị theo sản phẩm hoặc biến thể sau khi Inventory backend sẵn sàng."
        actionLabel="Tạo điều chỉnh tồn"
      />
    </div>
  );
}
