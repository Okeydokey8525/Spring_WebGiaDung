import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tài khoản | HomeStore',
  description: 'Khu vực tài khoản khách hàng HomeStore.',
};

const accountAreas = [
  {
    href: '/account/profile',
    title: 'Thông tin cá nhân',
    description: 'Tên, email và thông tin liên hệ của tài khoản.',
  },
  {
    href: '/account/addresses',
    title: 'Địa chỉ',
    description: 'Địa chỉ nhận hàng sẽ được quản lý tại đây.',
  },
  {
    href: '/account/orders',
    title: 'Đơn hàng',
    description: 'Theo dõi lịch sử và trạng thái đơn hàng.',
  },
  {
    href: '/account/wishlist',
    title: 'Yêu thích',
    description: 'Các sản phẩm đã lưu sau khi Wishlist được kết nối.',
  },
] as const;

export default function AccountOverviewPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
          Tổng quan
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[var(--color-primary)]">
          Quản lý tài khoản
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
          Xác thực tài khoản đã hoạt động. Các khu vực bên dưới là những chức
          năng nghiệp vụ sẽ được kết nối dữ liệu thật ở các milestone tiếp theo.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {accountAreas.map((area) => (
          <Link
            key={area.href}
            href={area.href}
            className="group rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-brand-hover)]">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {area.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="text-[var(--color-brand-hover)]"
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="font-semibold text-[var(--color-primary)]">
          Tiếp tục khám phá sản phẩm
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          Phiên tài khoản đã được bảo vệ bằng session thật; catalog sản phẩm vẫn
          tiếp tục hoạt động độc lập cho đến khi các API thương mại được triển
          khai.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          Xem sản phẩm
        </Link>
      </div>
    </div>
  );
}
