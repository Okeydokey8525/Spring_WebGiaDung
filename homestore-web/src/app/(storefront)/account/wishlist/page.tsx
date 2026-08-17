import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sản phẩm yêu thích | HomeStore',
};

export default function AccountWishlistPage() {
  return (
    <div className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-subtle)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
        Yêu thích
      </p>
      <h2 className="mt-2 text-2xl font-bold text-[var(--color-primary)]">
        Sản phẩm đã lưu
      </h2>

      <div className="mt-7 rounded-[var(--radius-surface)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-7 text-center">
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-2xl text-[var(--color-brand-hover)]"
          aria-hidden="true"
        >
          ♡
        </div>
        <h3 className="mt-4 font-semibold text-[var(--color-primary)]">
          Chưa có danh sách yêu thích
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--color-muted)]">
          Khi Auth và Wishlist backend sẵn sàng, sản phẩm được đánh dấu tim sẽ
          được lưu vào tài khoản và hiển thị ở đây.
        </p>
        <Link
          href="/products"
          className="mt-5 inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          Xem sản phẩm
        </Link>
      </div>
    </div>
  );
}
