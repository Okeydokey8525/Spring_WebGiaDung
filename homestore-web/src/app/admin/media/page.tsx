import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';

export const metadata: Metadata = {
  title: 'Hình ảnh',
};

const imageSlots = [
  { label: 'Ảnh chính', note: 'Ảnh đại diện sản phẩm' },
  { label: 'Ảnh phụ 01', note: 'Gallery sản phẩm' },
  { label: 'Ảnh phụ 02', note: 'Gallery sản phẩm' },
  { label: 'Ảnh phụ 03', note: 'Gallery sản phẩm' },
] as const;

export default function AdminMediaPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Sản phẩm"
        title="Hình ảnh sản phẩm"
        description="Xem trước cấu trúc quản lý media trước khi chức năng upload và lưu trữ ảnh thật được kết nối."
        action={
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white opacity-55"
          >
            Upload ảnh
          </button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
        <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
          <div>
            <p className="text-sm font-bold text-[var(--color-primary)]">
              Khu vực upload
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
              File picker đang khóa để không tạo hành vi upload giả.
            </p>
          </div>

          <label className="mt-5 flex min-h-52 cursor-not-allowed flex-col items-center justify-center rounded-[var(--radius-surface-large)] border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-6 text-center opacity-75">
            <input type="file" accept="image/*" multiple disabled className="sr-only" />
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-xl text-[var(--color-brand-hover)]"
              aria-hidden="true"
            >
              ↑
            </span>
            <span className="mt-4 font-semibold text-[var(--color-primary)]">
              Kéo thả hoặc chọn ảnh
            </span>
            <span className="mt-2 text-sm text-[var(--color-muted)]">
              JPG, PNG, WEBP · kích hoạt sau khi Media backend sẵn sàng
            </span>
          </label>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {imageSlots.map((slot, index) => (
              <article
                key={slot.label}
                className="overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <div className="flex aspect-square items-center justify-center bg-[var(--color-surface-subtle)]">
                  <div className="text-center">
                    <div
                      className="mx-auto h-10 w-10 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white"
                      aria-hidden="true"
                    />
                    <p className="mt-3 text-xs font-semibold text-[var(--color-muted)]">
                      Chưa có ảnh
                    </p>
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-primary)]">
                        {slot.label}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">
                        {slot.note}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[var(--color-muted)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="min-h-9 flex-1 cursor-not-allowed rounded-[var(--radius-control)] border border-[var(--color-border)] px-2 text-xs font-semibold text-[var(--color-primary)] opacity-55"
                    >
                      Alt text
                    </button>
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="min-h-9 cursor-not-allowed rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 text-xs font-semibold text-[var(--color-muted)] opacity-55"
                      aria-label={`Xóa ${slot.label}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)]">
            <p className="text-sm font-bold text-[var(--color-primary)]">
              Quy tắc media dự kiến
            </p>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-[var(--color-primary)]">
                  Ảnh chính
                </dt>
                <dd className="mt-1 leading-6 text-[var(--color-muted)]">
                  Một ảnh đại diện dùng cho Product Card và PDP.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--color-primary)]">
                  Gallery
                </dt>
                <dd className="mt-1 leading-6 text-[var(--color-muted)]">
                  Các ảnh phụ được sắp xếp theo thứ tự hiển thị.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--color-primary)]">
                  Alt text
                </dt>
                <dd className="mt-1 leading-6 text-[var(--color-muted)]">
                  Mô tả ảnh để hỗ trợ accessibility và nội dung.
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-[var(--radius-surface-large)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-brand-soft)] p-5">
            <p className="text-sm font-semibold text-[var(--color-brand-hover)]">
              Chưa lưu file thật
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Milestone này chỉ dựng giao diện. File ảnh và metadata sẽ được nối
              với Product Media ở giai đoạn backend.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
