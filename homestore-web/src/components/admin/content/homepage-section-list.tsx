const homepageSections = [
  {
    key: 'hero',
    title: 'Hero',
    source: 'HomeHero',
    purpose: 'Thông điệp mở đầu và điểm vào khám phá sản phẩm.',
  },
  {
    key: 'categories',
    title: 'Danh mục',
    source: 'CategoryDiscovery',
    purpose: 'Điều hướng người dùng vào các nhóm sản phẩm chính.',
  },
  {
    key: 'featured-products',
    title: 'Sản phẩm nổi bật',
    source: 'FeaturedProducts',
    purpose: 'Hiển thị nhóm sản phẩm được chọn từ catalog fixture hiện tại.',
  },
  {
    key: 'values',
    title: 'Giá trị HomeStore',
    source: 'HomeValues',
    purpose: 'Truyền đạt các nguyên tắc mua sắm và trải nghiệm của cửa hàng.',
  },
  {
    key: 'discovery',
    title: 'Khám phá theo nhu cầu',
    source: 'PracticalProductDiscovery',
    purpose: 'Gợi ý cách tìm sản phẩm theo nhu cầu sử dụng hằng ngày.',
  },
  {
    key: 'final-cta',
    title: 'CTA cuối trang',
    source: 'Storefront page',
    purpose: 'Dẫn tới toàn bộ sản phẩm hoặc khu vực danh mục.',
  },
] as const;

export function HomepageSectionList() {
  return (
    <section className="overflow-hidden rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
      <div className="border-b border-[var(--color-border)] px-5 py-4 sm:px-6">
        <p className="text-sm font-bold text-[var(--color-primary)]">
          Thứ tự storefront hiện tại
        </p>
        <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
          Danh sách phản ánh đúng cấu trúc đang render ở trang chủ. Chưa có CMS
          hay Content API để lưu thứ tự này.
        </p>
      </div>

      <ol className="divide-y divide-[var(--color-border)]">
        {homepageSections.map((section, index) => (
          <li
            key={section.key}
            className="grid gap-4 px-5 py-5 sm:grid-cols-[3.25rem_minmax(0,1fr)_auto] sm:items-center sm:px-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand-soft)] text-sm font-bold text-[var(--color-brand-hover)]">
              {String(index + 1).padStart(2, '0')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-[var(--color-primary)]">
                  {section.title}
                </h2>
                <span className="rounded-[var(--radius-pill)] bg-[var(--color-accent-warm)] px-2.5 py-1 font-mono text-[11px] font-semibold text-[var(--color-primary)]">
                  {section.source}
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-muted)]">
                {section.purpose}
              </p>
            </div>

            <div className="flex gap-2 sm:justify-end">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex min-h-10 cursor-not-allowed items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 text-xs font-semibold text-[var(--color-primary)] opacity-50"
              >
                ↑
              </button>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex min-h-10 cursor-not-allowed items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 text-xs font-semibold text-[var(--color-primary)] opacity-50"
              >
                ↓
              </button>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex min-h-10 cursor-not-allowed items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 text-xs font-semibold text-[var(--color-primary)] opacity-50"
              >
                Chỉnh sửa
              </button>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
