import React from 'react';
import Link from 'next/link';
import type { CatalogItem } from '@/features/catalog/model/catalog-item';
import {
  productEditorTabs,
  type ProductEditorTab,
} from '@/features/admin/products/product-editor-tabs';
import { cn } from '@/lib/utils/cn';

interface ProductEditorProps {
  mode: 'create' | 'edit';
  item?: CatalogItem;
  activeTab: ProductEditorTab;
}

function EditorField({
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
    'mt-2 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-canvas)] px-4 py-3 text-sm text-[var(--color-primary)] outline-none';

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

function LockedPanel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-primary)]">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            {description}
          </p>
        </div>
        <span className="w-fit rounded-[var(--radius-pill)] bg-[var(--color-brand-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-hover)]">
          UI Preview
        </span>
      </div>
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}

function InfoPanel({ item }: { item?: CatalogItem }) {
  return (
    <LockedPanel
      title="Thông tin cơ bản"
      description="Các trường đã được bố trí theo luồng quản trị sản phẩm. Chưa có thao tác tạo hoặc cập nhật dữ liệu thật."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <EditorField
            label="Tên sản phẩm"
            value={item?.name}
            placeholder="Nhập tên sản phẩm"
          />
        </div>
        <EditorField
          label="Slug"
          value={item?.slug}
          placeholder="ten-san-pham"
        />
        <EditorField
          label="Danh mục"
          value={item?.categoryLabel}
          placeholder="Chọn danh mục"
        />
        <div className="md:col-span-2">
          <EditorField
            label="Mô tả ngắn"
            value={item?.shortDescription}
            placeholder="Mô tả ngắn dùng tại catalog và trang chi tiết"
            multiline
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-5">
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 text-sm font-semibold text-white opacity-55"
        >
          Lưu sản phẩm
        </button>
        <span className="inline-flex min-h-11 items-center text-xs leading-5 text-[var(--color-muted)]">
          Nút lưu được khóa cho đến khi Admin Product API được kết nối.
        </span>
      </div>
    </LockedPanel>
  );
}

function MediaPanel() {
  return (
    <LockedPanel
      title="Hình ảnh sản phẩm"
      description="Thiết kế theo luồng upload → preview → ảnh chính → gallery → alt text. Chưa lưu file thật."
    >
      <div className="flex min-h-52 flex-col items-center justify-center rounded-[var(--radius-surface-large)] border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-6 text-center">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-xl text-[var(--color-brand-hover)]"
          aria-hidden="true"
        >
          ↑
        </span>
        <p className="mt-4 font-semibold text-[var(--color-primary)]">
          Upload ảnh sản phẩm
        </p>
        <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-muted)]">
          JPG, PNG, WEBP. File picker sẽ được kích hoạt khi Product Media backend
          và nơi lưu trữ file sẵn sàng.
        </p>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-5 inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white px-5 text-sm font-semibold text-[var(--color-primary)] opacity-60"
        >
          Chọn ảnh
        </button>
      </div>
    </LockedPanel>
  );
}

function CapabilityPanel({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: readonly string[];
}) {
  return (
    <LockedPanel title={title} description={description}>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-4"
          >
            <div
              className="mb-3 h-2 w-8 rounded-full bg-[var(--color-brand-soft)]"
              aria-hidden="true"
            />
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </LockedPanel>
  );
}

export function ProductEditor({
  mode,
  item,
  activeTab,
}: ProductEditorProps) {
  const baseHref =
    mode === 'create' ? '/admin/products/new' : `/admin/products/${item?.id}`;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-subtle)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
            {mode === 'create' ? 'Sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
          </p>
          <h1 className="mt-2 font-editorial text-3xl font-semibold text-[var(--color-brand-hover)]">
            {item?.name ?? 'Tạo sản phẩm'}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            {mode === 'edit'
              ? 'Dữ liệu đang hiển thị từ catalog fixture phục vụ phát triển UI, không phải bản ghi production.'
              : 'Biểu mẫu tạo sản phẩm đang ở chế độ preview và chưa gửi dữ liệu.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {item ? (
            <Link
              href={`/products/${item.slug}`}
              className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              Xem storefront
            </Link>
          ) : null}
          <Link
            href="/admin/products"
            className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            ← Danh sách
          </Link>
        </div>
      </div>

      <nav
        aria-label="Các phần chỉnh sửa sản phẩm"
        className="mb-6 flex gap-2 overflow-x-auto rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow-subtle)]"
      >
        {productEditorTabs.map((tab) => {
          const active = tab.key === activeTab;

          return (
            <Link
              key={tab.key}
              href={`${baseHref}?tab=${tab.key}`}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-control)] px-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]',
                active
                  ? 'bg-[var(--color-brand)] text-white'
                  : 'text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)]'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {activeTab === 'info' ? <InfoPanel item={item} /> : null}
      {activeTab === 'media' ? <MediaPanel /> : null}
      {activeTab === 'attributes' ? (
        <CapabilityPanel
          title="Thuộc tính"
          description="Khu vực chọn thuộc tính và giá trị sẽ nối với Product Attribute backend hiện có khi quay lại DB/runtime."
          items={['Chọn thuộc tính', 'Chọn giá trị', 'Xem thuộc tính đã gắn']}
        />
      ) : null}
      {activeTab === 'variants' ? (
        <CapabilityPanel
          title="Biến thể"
          description="Product Variant chưa được triển khai, vì vậy tab này chỉ xác định cấu trúc giao diện."
          items={['Tổ hợp biến thể', 'Mã biến thể / SKU', 'Trạng thái biến thể']}
        />
      ) : null}
      {activeTab === 'pricing' ? (
        <CapabilityPanel
          title="Giá bán"
          description="Không hiển thị hoặc tạo giá giả trước khi Pricing contract tồn tại."
          items={['Giá hiện hành', 'Hiệu lực giá', 'Lịch sử thay đổi']}
        />
      ) : null}
      {activeTab === 'inventory' ? (
        <CapabilityPanel
          title="Tồn kho"
          description="Không tạo số lượng tồn giả trước khi Inventory contract tồn tại."
          items={['Tồn khả dụng', 'Điều chỉnh tồn', 'Lịch sử biến động']}
        />
      ) : null}
      {activeTab === 'seo' ? (
        <CapabilityPanel
          title="SEO"
          description="Chuẩn bị metadata riêng cho sản phẩm mà không thay đổi dữ liệu storefront hiện tại."
          items={['SEO title', 'Meta description', 'Slug / canonical']}
        />
      ) : null}
    </div>
  );
}
