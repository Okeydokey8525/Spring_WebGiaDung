import type { Metadata } from 'next';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { SettingsPreview } from '@/components/admin/system/settings-preview';

export const metadata: Metadata = {
  title: 'Cài đặt',
};

const settingsLinks = [
  ['store', 'Thông tin cửa hàng'],
  ['branding', 'Branding'],
  ['contact', 'Liên hệ'],
  ['payment', 'Thanh toán'],
  ['shipping', 'Vận chuyển'],
  ['system', 'Hệ thống'],
] as const;

export default function AdminSettingsPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Hệ thống"
        title="Cài đặt"
        description="Tập trung các nhóm cấu hình cửa hàng trong một nơi. Trang này hiện chỉ phản ánh cấu trúc quản trị; chưa ghi cấu hình xuống backend hoặc môi trường runtime."
      />

      <section className="mb-6 rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-[var(--color-accent-warm)]/45 p-4 text-sm leading-6 text-[var(--color-primary)]">
        Không nhập secret, mật khẩu database, token hoặc thông tin nhạy cảm vào
        trang preview này. Secret runtime sẽ được quản lý ngoài frontend.
      </section>

      <div className="grid gap-6 xl:grid-cols-[14rem_minmax(0,1fr)]">
        <nav
          aria-label="Nhóm cài đặt"
          className="h-fit rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[var(--shadow-subtle)] xl:sticky xl:top-24"
        >
          {settingsLinks.map(([key, label]) => (
            <a
              key={key}
              href={`#${key}`}
              className="flex min-h-10 items-center rounded-[var(--radius-control)] px-3 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-brand-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              {label}
            </a>
          ))}
        </nav>

        <SettingsPreview />
      </div>
    </div>
  );
}
