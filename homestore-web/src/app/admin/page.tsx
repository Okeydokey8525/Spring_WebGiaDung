import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';

const quickAreas = [
  {
    href: '/admin/products',
    title: 'Sản phẩm',
    description: 'Chuẩn bị quản lý thông tin, hình ảnh và cấu trúc sản phẩm.',
  },
  {
    href: '/admin/media',
    title: 'Hình ảnh',
    description: 'Xem trước khu vực upload và tổ chức media sản phẩm.',
  },
  {
    href: '/admin/orders',
    title: 'Đơn hàng',
    description: 'Route quản lý đơn hàng đã được chuẩn bị cho giai đoạn commerce.',
  },
] as const;

const readiness = [
  'Product management UI',
  'Media management UI',
  'Catalog administration',
  'Pricing & inventory modules',
  'Order & payment modules',
  'Homepage content modules',
] as const;

export default function AdminDashboardPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Trung tâm quản trị HomeStore"
        description="Bắt đầu từ cấu trúc quản trị rõ ràng cho sản phẩm, thương mại và nội dung. Dashboard hiện không tạo số liệu giả trước khi dữ liệu vận hành thật tồn tại."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {quickAreas.map((area) => (
          <Link
            key={area.href}
            href={area.href}
            className="group rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-brand-hover)]">
                  {area.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {area.description}
                </p>
              </div>
              <span className="text-[var(--color-brand-hover)]" aria-hidden="true">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-6 rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
              Trạng thái giao diện
            </p>
            <h2 className="mt-2 text-xl font-bold text-[var(--color-primary)]">
              Các khu vực đã có route quản trị
            </h2>
          </div>
          <span className="w-fit rounded-[var(--radius-pill)] bg-[var(--color-brand-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-hover)]">
            Foundation
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {readiness.map((item) => (
            <div
              key={item}
              className="flex min-h-20 items-center gap-3 rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-4"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-soft)] font-bold text-[var(--color-brand-hover)]"
                aria-hidden="true"
              >
                ✓
              </span>
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[var(--radius-surface-large)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-accent-warm)]/40 p-5 sm:p-6">
        <h2 className="font-semibold text-[var(--color-primary)]">
          Lưu ý phân quyền
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-muted)]">
          Route /admin hiện phục vụ kiểm tra giao diện. Bảo vệ route và quyền
          ADMIN sẽ được bổ sung khi hệ thống xác thực thật được triển khai.
        </p>
      </section>
    </div>
  );
}
