import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CommerceEmptyTable } from '@/components/admin/commerce/commerce-empty-table';

export const metadata: Metadata = {
  title: 'Thanh toán',
};

const columns = [
  'Mã đơn',
  'Phương thức',
  'Số tiền',
  'Trạng thái',
  'Cập nhật',
  'Thao tác',
] as const;

const paymentMethods = [
  {
    title: 'COD',
    description:
      'Đơn chờ xác nhận, giao hàng và chỉ được ghi nhận thanh toán theo trạng thái thực tế.',
  },
  {
    title: 'Chuyển khoản',
    description:
      'Tạo đơn trước, dùng mã đơn làm nội dung chuyển khoản và chờ quản trị xác nhận đã nhận tiền.',
  },
] as const;

export default function AdminPaymentsPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Thương mại"
        title="Thanh toán"
        description="Theo dõi COD và chuyển khoản ngân hàng mà không tự đánh dấu đã thanh toán khi chưa có xác nhận thực tế."
      />

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {paymentMethods.map((method) => (
          <section
            key={method.title}
            className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)]"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-semibold text-[var(--color-primary)]">
                {method.title}
              </h2>
              <span className="rounded-[var(--radius-pill)] bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-hover)]">
                Dự kiến V1
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
              {method.description}
            </p>
          </section>
        ))}
      </div>

      <section className="mb-5 rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-accent-warm)]/45 p-4 text-sm leading-6 text-[var(--color-primary)]">
        Chuyển khoản bắt đầu ở trạng thái <strong>PENDING_PAYMENT</strong>. UI
        không cung cấp thao tác “đã thanh toán” giả trước khi Payment backend và
        quyền admin thật tồn tại.
      </section>

      <CommerceEmptyTable
        columns={columns}
        title="Chưa có giao dịch thanh toán"
        description="Danh sách sẽ xuất hiện sau khi Order và Payment được kết nối. Xác nhận thanh toán sẽ là thao tác có kiểm soát, không phải trạng thái giả ở frontend."
        actionLabel="Xác nhận thanh toán"
      />
    </div>
  );
}
