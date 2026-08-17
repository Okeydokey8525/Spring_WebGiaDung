import Link from 'next/link';

type EntityKind = 'brand' | 'attribute';

interface EntityCreatePreviewProps {
  kind: EntityKind;
}

const config = {
  brand: {
    eyebrow: 'Thương hiệu',
    title: 'Tạo thương hiệu',
    backHref: '/admin/brands',
    fields: [
      ['Tên thương hiệu', 'Nhập tên thương hiệu'],
      ['Slug', 'thuong-hieu'],
      ['Mô tả', 'Mô tả ngắn về thương hiệu'],
    ] as const,
  },
  attribute: {
    eyebrow: 'Thuộc tính',
    title: 'Tạo thuộc tính',
    backHref: '/admin/attributes',
    fields: [
      ['Tên thuộc tính', 'Ví dụ: Màu sắc'],
      ['Mã thuộc tính', 'color'],
      ['Kiểu dữ liệu', 'Chọn kiểu dữ liệu'],
    ] as const,
  },
} as const;

export function EntityCreatePreview({ kind }: EntityCreatePreviewProps) {
  const entity = config[kind];
  const isAttribute = kind === 'attribute';

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
            {entity.eyebrow}
          </p>
          <h1 className="mt-2 font-editorial text-3xl font-semibold text-[var(--color-brand-hover)]">
            {entity.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            Biểu mẫu đang ở chế độ preview. Không có bản ghi mới nào được tạo
            trong milestone giao diện này.
          </p>
        </div>

        <Link
          href={entity.backHref}
          className="inline-flex min-h-11 w-fit items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          ← Danh sách
        </Link>
      </div>

      <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
        <div className="grid gap-5 md:grid-cols-2">
          {entity.fields.map(([label, placeholder], index) => (
            <label
              key={label}
              className={index === 2 && !isAttribute ? 'md:col-span-2' : ''}
            >
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                {label}
              </span>
              {index === 2 && !isAttribute ? (
                <textarea
                  readOnly
                  rows={5}
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
          ))}
        </div>

        {isAttribute ? (
          <div className="mt-6 rounded-[var(--radius-surface)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-[var(--color-primary)]">
                  Giá trị thuộc tính
                </h2>
                <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                  Chưa có giá trị nào. Các value sẽ được quản lý cùng thuộc tính
                  khi dữ liệu quản trị được kết nối.
                </p>
              </div>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-primary)] opacity-55"
              >
                + Thêm giá trị
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-5">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white opacity-55"
          >
            {isAttribute ? 'Tạo thuộc tính' : 'Tạo thương hiệu'}
          </button>
          <span className="inline-flex min-h-11 items-center text-xs leading-5 text-[var(--color-muted)]">
            Nút lưu được khóa cho đến khi Admin API tương ứng sẵn sàng.
          </span>
        </div>
      </section>
    </div>
  );
}
