import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';

export const metadata: Metadata = {
  title: 'Thuộc tính',
};

export default function AdminAttributesPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Sản phẩm"
        title="Thuộc tính"
        description="Khu vực quản lý thuộc tính và giá trị thuộc tính đã được chuẩn bị. Frontend hiện không tạo Attribute fixture để tránh làm sai dữ liệu quản trị."
        action={
          <Link
            href="/admin/attributes/new"
            className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            + Thêm thuộc tính
          </Link>
        }
      />

      <section className="overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
        <div className="grid grid-cols-[minmax(0,1fr)_12rem_10rem] border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
          <span>Thuộc tính</span>
          <span>Giá trị</span>
          <span className="text-right">Thao tác</span>
        </div>

        <div className="p-8 text-center">
          <h2 className="font-semibold text-[var(--color-primary)]">
            Chưa có dữ liệu thuộc tính để hiển thị
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--color-muted)]">
            Khi Product Attribute Admin API được kết nối, danh sách sẽ hiển thị
            thuộc tính, kiểu dữ liệu và các giá trị tương ứng.
          </p>
          <Link
            href="/admin/attributes/new"
            className="mt-5 inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Xem form tạo thuộc tính
          </Link>
        </div>
      </section>
    </div>
  );
}
