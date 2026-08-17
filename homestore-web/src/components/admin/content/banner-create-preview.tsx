import Link from 'next/link';

function PreviewField({
  label,
  placeholder,
  multiline = false,
}: {
  label: string;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[var(--color-primary)]">
        {label}
      </span>
      {multiline ? (
        <textarea
          readOnly
          rows={4}
          placeholder={placeholder}
          className="mt-2 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-canvas)] px-4 py-3 text-sm outline-none placeholder:text-[var(--color-muted)]"
        />
      ) : (
        <input
          readOnly
          placeholder={placeholder}
          className="mt-2 min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-canvas)] px-4 text-sm outline-none placeholder:text-[var(--color-muted)]"
        />
      )}
    </label>
  );
}

export function BannerCreatePreview() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
            Nội dung
          </p>
          <h1 className="mt-2 font-editorial text-3xl font-semibold text-[var(--color-brand-hover)]">
            Tạo banner
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            Biểu mẫu preview cho luồng Banner + Media. Chưa có file hoặc metadata
            nào được lưu.
          </p>
        </div>

        <Link
          href="/admin/banners"
          className="inline-flex min-h-11 w-fit items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          ← Danh sách
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <PreviewField label="Tên banner" placeholder="Tên nội bộ để quản lý" />
            </div>
            <PreviewField
              label="Vị trí hiển thị"
              placeholder="Ví dụ: Trang chủ / Hero"
            />
            <PreviewField label="Thứ tự" placeholder="Tự xác định khi lưu" />
            <div className="md:col-span-2">
              <PreviewField
                label="Tiêu đề hiển thị"
                placeholder="Tiêu đề trên banner"
              />
            </div>
            <div className="md:col-span-2">
              <PreviewField
                label="Mô tả"
                placeholder="Nội dung hỗ trợ cho banner"
                multiline
              />
            </div>
            <PreviewField label="Link đích" placeholder="/products" />
            <PreviewField label="Trạng thái" placeholder="Chọn trạng thái" />
          </div>

          <div className="mt-6 border-t border-[var(--color-border)] pt-5">
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              Hình ảnh banner
            </p>

            <label className="mt-3 flex min-h-52 cursor-not-allowed flex-col items-center justify-center rounded-[var(--radius-surface-large)] border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-6 text-center opacity-75">
              <input
                type="file"
                accept="image/*"
                disabled
                className="sr-only"
              />
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-xl text-[var(--color-brand-hover)]"
                aria-hidden="true"
              >
                ↑
              </span>
              <span className="mt-4 font-semibold text-[var(--color-primary)]">
                Chọn ảnh banner
              </span>
              <span className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                JPG, PNG, WEBP · kích hoạt khi Media backend sẵn sàng
              </span>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-5">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white opacity-55"
            >
              Tạo banner
            </button>
            <span className="inline-flex min-h-11 items-center text-xs leading-5 text-[var(--color-muted)]">
              Nút lưu được khóa cho đến khi Content + Media API tồn tại.
            </span>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)]">
            <p className="text-sm font-bold text-[var(--color-primary)]">
              Preview
            </p>
            <div className="mt-4 aspect-[4/3] rounded-[var(--radius-surface)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-subtle)] p-4">
              <div className="flex h-full flex-col justify-end rounded-[var(--radius-control)] bg-[var(--color-brand-soft)] p-4">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-brand)]">
                  Banner preview
                </span>
                <div className="mt-2 h-3 w-3/4 rounded-full bg-white/80" />
                <div className="mt-2 h-2 w-full rounded-full bg-white/60" />
                <div className="mt-2 h-2 w-2/3 rounded-full bg-white/60" />
              </div>
            </div>
          </section>

          <section className="rounded-[var(--radius-surface-large)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-brand-soft)] p-5">
            <p className="text-sm font-semibold text-[var(--color-brand-hover)]">
              Không giả dữ liệu
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Preview chỉ mô phỏng bố cục. Không tạo URL ảnh, banner ID hay trạng
              thái lưu giả.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
