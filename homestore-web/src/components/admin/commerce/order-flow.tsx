interface OrderFlowProps {
  compact?: boolean;
}

const orderStates = [
  'PENDING_PAYMENT',
  'PENDING_CONFIRMATION',
  'CONFIRMED',
  'PACKING',
  'SHIPPING',
  'DELIVERED',
  'CANCELLED',
] as const;

export function OrderFlow({ compact = false }: OrderFlowProps) {
  return (
    <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
            Luồng trạng thái dự kiến
          </p>
          <h2 className="mt-2 text-lg font-bold text-[var(--color-primary)]">
            Trạng thái đơn hàng
          </h2>
        </div>
        <span className="w-fit rounded-[var(--radius-pill)] bg-[var(--color-brand-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-hover)]">
          Chưa có dữ liệu runtime
        </span>
      </div>

      <div
        className={
          compact
            ? 'mt-5 flex flex-wrap gap-2'
            : 'mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'
        }
      >
        {orderStates.map((state, index) => (
          <div
            key={state}
            className="rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-xs font-bold text-[var(--color-brand-hover)]"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span className="break-all font-mono text-xs font-semibold text-[var(--color-primary)]">
                {state}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-5 text-[var(--color-muted)]">
        CANCELLED là nhánh kết thúc riêng; thứ tự hiển thị ở đây chỉ nhằm mô tả
        kiến trúc giao diện, không đại diện cho một đơn hàng thật.
      </p>
    </section>
  );
}
