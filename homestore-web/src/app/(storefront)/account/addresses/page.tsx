import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Địa chỉ | HomeStore',
};

export default function AccountAddressesPage() {
  return (
    <div className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-subtle)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
        Nhận hàng
      </p>
      <h2 className="mt-2 text-2xl font-bold text-[var(--color-primary)]">
        Địa chỉ
      </h2>

      <div className="mt-7 rounded-[var(--radius-surface)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-7 text-center">
        <h3 className="font-semibold text-[var(--color-primary)]">
          Chưa có địa chỉ để hiển thị
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--color-muted)]">
          Địa chỉ nhận hàng sẽ được lưu và quản lý tại đây sau khi tài khoản và
          Address backend được kết nối.
        </p>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-5 inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 font-semibold text-[var(--color-primary)] opacity-60"
        >
          Thêm địa chỉ
        </button>
      </div>
    </div>
  );
}
