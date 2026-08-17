import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';

export const metadata: Metadata = {
  title: 'Banner',
};

export default function AdminBannersPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Nội dung"
        title="Banner"
        description="Quản lý vị trí hiển thị, thứ tự, trạng thái, link đích và media khi Content + Media backend được triển khai."
        action={
          <Link
            href="/admin/banners/new"
            className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            + Thêm banner
          </Link>
        }
      />

      <section className="overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
        <div className="overflow-x-auto">
          <div className="grid min-w-[760px] grid-cols-[minmax(0,1.5fr)_12rem_8rem_10rem_8rem] border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-muted)]">
            <span>Banner</span>
            <span>Vị trí</span>
            <span>Thứ tự</span>
            <span>Trạng thái</span>
            <span className="text-right">Thao tác</span>
          </div>
        </div>

        <div className="p-8 text-center">
          <div
            className="mx-auto flex h-16 w-24 items-center justify-center rounded-[var(--radius-control)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-subtle)] text-xs font-bold text-[var(--color-muted)]"
            aria-hidden="true"
          >
            BANNER
          </div>
          <h2 className="mt-5 font-semibold text-[var(--color-primary)]">
            Chưa có dữ liệu banner
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            Frontend hiện không có Banner fixture hoặc Content record để sử dụng.
            Không tạo banner mẫu nhằm tránh nhầm với nội dung đã được lưu.
          </p>
          <Link
            href="/admin/banners/new"
            className="mt-5 inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Xem form tạo banner
          </Link>
        </div>
      </section>
    </div>
  );
}
