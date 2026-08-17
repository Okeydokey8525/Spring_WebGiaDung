import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { getCatalogItems } from '@/features/catalog/data/catalog-source';
import {
  normalizeCatalogSearchText,
  parseCatalogSearch,
} from '@/features/catalog/model/catalog-query';

export const metadata: Metadata = {
  title: 'Sản phẩm',
};

interface AdminProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getStringParam(value: string | string[] | undefined) {
  return typeof value === 'string' ? value : '';
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const params = await searchParams;
  const search = parseCatalogSearch(params.q);
  const category = getStringParam(params.category);

  const allItems = getCatalogItems();
  const categoryOptions = Array.from(
    new Map(
      allItems.map((item) => [item.categoryKey, item.categoryLabel] as const)
    ).entries()
  );

  const normalizedSearch = normalizeCatalogSearchText(search);
  const filteredItems = allItems.filter((item) => {
    const matchesCategory = !category || item.categoryKey === category;
    if (!matchesCategory) return false;
    if (!normalizedSearch) return true;

    const searchable = normalizeCatalogSearchText(
      [item.name, item.slug, item.categoryLabel, item.shortDescription].join(' ')
    );

    return normalizedSearch
      .split(' ')
      .every((term) => searchable.includes(term));
  });

  return (
    <div>
      <AdminPageHeader
        eyebrow="Sản phẩm"
        title="Quản lý sản phẩm"
        description="Danh sách hiện lấy từ DEVELOPMENT PRESENTATION FIXTURES đang dùng cho storefront. Đây chưa phải dữ liệu sản phẩm production."
        action={
          <Link
            href="/admin/products/new"
            className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            + Tạo sản phẩm
          </Link>
        }
      />

      <section className="mb-5 rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-brand-soft)] p-4 text-sm leading-6 text-[var(--color-primary)]">
        Có {allItems.length} fixture phục vụ phát triển UI. Giá bán, tồn kho,
        rating và dữ liệu commerce vẫn chưa được thêm vào danh sách này.
      </section>

      <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
        <form
          method="GET"
          action="/admin/products"
          role="search"
          className="grid gap-3 border-b border-[var(--color-border)] p-4 sm:grid-cols-[minmax(0,1fr)_14rem_auto] sm:p-5"
        >
          <label>
            <span className="sr-only">Tìm kiếm sản phẩm</span>
            <input
              type="search"
              name="q"
              defaultValue={search}
              placeholder="Tìm tên, slug, danh mục..."
              className="min-h-11 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white px-4 text-sm outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            />
          </label>

          <label>
            <span className="sr-only">Lọc theo danh mục</span>
            <select
              name="category"
              defaultValue={category}
              className="min-h-11 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white px-3 text-sm text-[var(--color-primary)] outline-none focus:border-[var(--color-brand)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              <option value="">Tất cả danh mục</option>
              {categoryOptions.map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Lọc
          </button>
        </form>

        <div className="flex flex-col gap-2 border-b border-[var(--color-border)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-sm font-semibold text-[var(--color-primary)]">
            {filteredItems.length} sản phẩm hiển thị
          </p>
          {(search || category) && (
            <Link
              href="/admin/products"
              className="text-sm font-semibold text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
            >
              Xóa bộ lọc
            </Link>
          )}
        </div>

        {filteredItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-canvas)] text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  <th className="px-5 py-3 font-bold">Sản phẩm</th>
                  <th className="px-5 py-3 font-bold">Danh mục</th>
                  <th className="px-5 py-3 font-bold">Slug</th>
                  <th className="px-5 py-3 font-bold">Nguồn</th>
                  <th className="px-5 py-3 text-right font-bold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-xs font-bold text-[var(--color-muted)]"
                          aria-hidden="true"
                        >
                          IMG
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--color-primary)]">
                            {item.name}
                          </p>
                          <p className="mt-1 max-w-sm truncate text-xs text-[var(--color-muted)]">
                            {item.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--color-primary)]">
                      {item.categoryLabel}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-[var(--color-muted)]">
                      {item.slug}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-[var(--radius-pill)] bg-[var(--color-accent-warm)] px-2.5 py-1 text-xs font-semibold text-[var(--color-primary)]">
                        UI fixture
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/products/${item.id}`}
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
        ) : (
          <div className="p-8 text-center">
            <p className="font-semibold text-[var(--color-primary)]">
              Không tìm thấy sản phẩm phù hợp
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Thử xóa từ khóa hoặc chọn danh mục khác.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
