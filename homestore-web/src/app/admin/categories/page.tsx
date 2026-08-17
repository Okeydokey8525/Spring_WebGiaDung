import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { storeCategories } from '@/lib/config/store-categories';

export const metadata: Metadata = {
  title: 'Danh mục',
};

export default function AdminCategoriesPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Sản phẩm"
        title="Danh mục"
        description="Danh sách hiện dùng taxonomy trình bày của frontend để phục vụ kiểm tra UI. Backend Category vẫn là nguồn dữ liệu có thẩm quyền khi kết nối trở lại."
        action={
          <Link
            href="/admin/categories/new"
            className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            + Thêm danh mục
          </Link>
        }
      />

      <section className="mb-5 rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-brand-soft)] p-4 text-sm leading-6 text-[var(--color-primary)]">
        Có {storeCategories.length} nhóm danh mục đang dùng cho trình bày
        storefront. Các key này không phải persisted Category ID.
      </section>

      <section className="overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-canvas)] text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">
                <th className="px-5 py-3 font-bold">Thứ tự</th>
                <th className="px-5 py-3 font-bold">Danh mục</th>
                <th className="px-5 py-3 font-bold">Khóa</th>
                <th className="px-5 py-3 font-bold">Cấp</th>
                <th className="px-5 py-3 font-bold">Nguồn</th>
                <th className="px-5 py-3 text-right font-bold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {storeCategories.map((category, index) => (
                <tr
                  key={category.key}
                  className="border-b border-[var(--color-border)] last:border-b-0"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-[var(--color-muted)]">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[var(--color-primary)]">
                      {category.label}
                    </p>
                    <p className="mt-1 max-w-xl text-xs leading-5 text-[var(--color-muted)]">
                      {category.description}
                    </p>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[var(--color-muted)]">
                    {category.key}
                  </td>
                  <td className="px-5 py-4 text-sm text-[var(--color-primary)]">
                    Gốc
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-[var(--radius-pill)] bg-[var(--color-accent-warm)] px-2.5 py-1 text-xs font-semibold text-[var(--color-primary)]">
                      Presentation
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/categories/${category.key}`}
                      className="inline-flex min-h-10 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                    >
                      Chỉnh sửa
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
