import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Đơn hàng | HomeStore',
};

export default function AccountOrdersPage() {
  return (
    <div className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-subtle)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
        Mua hàng
      </p>
      <h2 className="mt-2 text-2xl font-bold text-[var(--color-primary)]">
        Đơn hàng
      </h2>

      <div className="mt-7 rounded-[var(--radius-surface)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-7 text-center">
        <h3 className="font-semibold text-[var(--color-primary)]">
          Chưa có dữ liệu đơn hàng
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--color-muted)]">
          Lịch sử, trạng thái thanh toán và giao hàng sẽ xuất hiện tại đây khi
          hệ thống Order được triển khai.
        </p>
        <Link
          href="/products"
          className="mt-5 inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          Khám phá sản phẩm
        </Link>
      </div>
    </div>
  );
}
