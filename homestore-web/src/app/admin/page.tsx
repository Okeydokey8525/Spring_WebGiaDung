import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';

const quickAreas = [
  {
    href: '/admin/products',
    title: 'Sản phẩm',
    description: 'Danh sách, tạo mới và Product Editor đã có cấu trúc quản trị.',
  },
  {
    href: '/admin/categories',
    title: 'Catalog',
    description: 'Danh mục, thương hiệu và thuộc tính đã có luồng UI riêng.',
  },
  {
    href: '/admin/orders',
    title: 'Thương mại',
    description: 'Theo dõi kiến trúc đơn hàng, thanh toán, giá và tồn kho.',
  },
  {
    href: '/admin/homepage',
    title: 'Nội dung',
    description: 'Theo dõi cấu trúc trang chủ và khu vực banner.',
  },
  {
    href: '/admin/settings',
    title: 'Cài đặt',
    description: 'Xem cấu trúc cấu hình cửa hàng, branding và hệ thống.',
  },
] as const;

const readinessGroups = [
  {
    title: 'Catalog',
    status: 'UI ready',
    tone: 'ready',
    items: ['Sản phẩm', 'Danh mục', 'Thương hiệu', 'Thuộc tính', 'Hình ảnh'],
  },
  {
    title: 'Commerce',
    status: 'UI ready · API pending',
    tone: 'pending',
    items: ['Giá bán', 'Tồn kho', 'Đơn hàng', 'Thanh toán', 'Khách hàng'],
  },
  {
    title: 'Content',
    status: 'UI ready · API pending',
    tone: 'pending',
    items: ['Trang chủ', 'Banner'],
  },
  {
    title: 'Security',
    status: 'Pending',
    tone: 'blocked',
    items: ['Đăng nhập thật', 'Session/JWT', 'Bảo vệ /admin', 'Quyền ADMIN'],
  },
] as const;

function statusClass(tone: string) {
  if (tone === 'ready') {
    return 'bg-[var(--color-brand-soft)] text-[var(--color-brand-hover)]';
  }

  if (tone === 'pending') {
    return 'bg-[var(--color-accent-warm)] text-[var(--color-primary)]';
  }

  return 'border border-[var(--color-border-strong)] bg-[var(--color-canvas)] text-[var(--color-muted)]';
}

export default function AdminDashboardPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Trung tâm quản trị HomeStore"
        description="Tổng quan mức độ sẵn sàng của giao diện quản trị. Dashboard không tạo doanh thu, số đơn, tồn kho hoặc khách hàng giả khi chưa có dữ liệu vận hành thật."
      />

      <section className="mb-6">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
              Truy cập nhanh
            </p>
            <h2 className="mt-2 text-xl font-bold text-[var(--color-primary)]">
              Khu vực quản trị chính
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {quickAreas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="group rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-brand-hover)]">
                    {area.title}
                  </h3>
                  <span
                    className="text-[var(--color-brand-hover)]"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {area.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
              Readiness
            </p>
            <h2 className="mt-2 text-xl font-bold text-[var(--color-primary)]">
              Trạng thái các miền quản trị
            </h2>
          </div>
          <span className="w-fit rounded-[var(--radius-pill)] bg-[var(--color-brand-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-hover)]">
            UI foundation
          </span>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {readinessGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold text-[var(--color-primary)]">
                  {group.title}
                </h3>
                <span
                  className={`rounded-[var(--radius-pill)] px-3 py-1 text-xs font-semibold ${statusClass(group.tone)}`}
                >
                  {group.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[var(--radius-surface-large)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-accent-warm)]/40 p-5 sm:p-6">
          <h2 className="font-semibold text-[var(--color-primary)]">
            Chưa phải admin production
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Route /admin hiện vẫn phục vụ kiểm tra giao diện. Chưa có xác thực
            thật, session hoặc kiểm tra role ADMIN ở runtime.
          </p>
        </section>

        <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-brand-soft)] p-5 sm:p-6">
          <h2 className="font-semibold text-[var(--color-brand-hover)]">
            Bước chức năng tiếp theo
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Sau khi hoàn tất dashboard/settings UI, ưu tiên tiếp theo là kết nối
            chức năng thật thay vì tiếp tục mở rộng shell: Auth → Product API →
            Media → Pricing/Inventory → Cart/Checkout/Order.
          </p>
        </section>
      </div>
    </div>
  );
}
