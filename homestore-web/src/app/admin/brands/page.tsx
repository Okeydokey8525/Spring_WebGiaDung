import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';

export const metadata: Metadata = {
  title: 'Thương hiệu',
};

export default function AdminBrandsPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Sản phẩm"
        title="Thương hiệu"
        description="Khu vực quản lý thương hiệu đã được bố trí sẵn. Hiện frontend không có Brand fixture nên không tạo thương hiệu mẫu để tránh dữ liệu giả."
        action={
          <Link
            href="/admin/brands/new"
            className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            + Thêm thương hiệu
          </Link>
        }
      />

      <section className="overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
        <div className="grid grid-cols-[minmax(0,1fr)_12rem_10rem] border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
          <span>Thương hiệu</span>
          <span>Trạng thái</span>
          <span className="text-right">Thao tác</span>
        </div>

        <div className="p-8 text-center">
          <h2 className="font-semibold text-[var(--color-primary)]">
            Chưa có dữ liệu thương hiệu
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--color-muted)]">
            Danh sách sẽ hiển thị tên, slug, mô tả và trạng thái khi Brand Admin
            API được kết nối. Milestone này không tạo Brand giả.
          </p>
          <Link
            href="/admin/brands/new"
            className="mt-5 inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Xem form tạo thương hiệu
          </Link>
        </div>
      </section>
    </div>
  );
}
