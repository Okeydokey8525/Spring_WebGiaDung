import Link from 'next/link';
import type { StoreCategory } from '@/lib/config/store-categories';

interface CategoryEditorProps {
  mode: 'create' | 'edit';
  category?: StoreCategory;
  order?: number;
}

function ReadonlyField({
  label,
  value,
  placeholder,
  multiline = false,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const className =
    'mt-2 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-canvas)] px-4 py-3 text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)]';

  return (
    <label className="block">
      <span className="text-sm font-semibold text-[var(--color-primary)]">
        {label}
      </span>
      {multiline ? (
        <textarea
          readOnly
          rows={5}
          value={value ?? ''}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          readOnly
          value={value ?? ''}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}

export function CategoryEditor({
  mode,
  category,
  order,
}: CategoryEditorProps) {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
            {mode === 'create' ? 'Danh mục mới' : 'Chỉnh sửa danh mục'}
          </p>
          <h1 className="mt-2 font-editorial text-3xl font-semibold text-[var(--color-brand-hover)]">
            {category?.label ?? 'Tạo danh mục'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            {mode === 'edit'
              ? 'Thông tin hiện lấy từ taxonomy trình bày của frontend; chưa phải bản ghi Category được lưu trong hệ thống quản trị.'
              : 'Biểu mẫu đã được bố trí trước cho luồng tạo Category, nhưng chưa gửi dữ liệu.'}
          </p>
        </div>

        <Link
          href="/admin/categories"
          className="inline-flex min-h-11 w-fit items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          ← Danh sách
        </Link>
      </div>

      <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <ReadonlyField
              label="Tên danh mục"
              value={category?.label}
              placeholder="Nhập tên danh mục"
            />
          </div>

          <ReadonlyField
            label="Khóa / slug"
            value={category?.key}
            placeholder="category-key"
          />

          <ReadonlyField
            label="Thứ tự hiển thị"
            value={order ? String(order) : undefined}
            placeholder="Tự xác định khi lưu"
          />

          <div className="md:col-span-2">
            <ReadonlyField
              label="Mô tả"
              value={category?.description}
              placeholder="Mô tả ngắn cho danh mục"
              multiline
            />
          </div>

          <ReadonlyField
            label="Danh mục cha"
            value={category ? 'Danh mục gốc' : undefined}
            placeholder="Chọn danh mục cha hoặc để trống"
          />

          <ReadonlyField
            label="Trạng thái"
            value={category ? 'Đang dùng cho trình bày storefront' : undefined}
            placeholder="Chọn trạng thái"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-5">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white opacity-55"
          >
            {mode === 'create' ? 'Tạo danh mục' : 'Lưu thay đổi'}
          </button>
          <span className="inline-flex min-h-11 items-center text-xs leading-5 text-[var(--color-muted)]">
            Thao tác lưu sẽ được mở khi Category Admin API được kết nối.
          </span>
        </div>
      </section>
    </div>
  );
}
