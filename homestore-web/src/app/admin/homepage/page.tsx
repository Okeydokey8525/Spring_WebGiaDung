import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { HomepageSectionList } from '@/components/admin/content/homepage-section-list';

export const metadata: Metadata = {
  title: 'Trang chủ',
};

export default function AdminHomepagePage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Nội dung"
        title="Trang chủ"
        description="Theo dõi cấu trúc các khối đang render trên storefront và chuẩn bị luồng quản trị nội dung khi Content backend được triển khai."
        action={
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          >
            Xem storefront
          </Link>
        }
      />

      <section className="mb-5 rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-brand-soft)] p-4 text-sm leading-6 text-[var(--color-primary)]">
        Trang chủ hiện vẫn được cấu thành trực tiếp từ các component frontend.
        Thay đổi thứ tự hoặc nội dung trong admin chưa được bật để tránh tạo trạng
        thái CMS giả.
      </section>

      <HomepageSectionList />
    </div>
  );
}
