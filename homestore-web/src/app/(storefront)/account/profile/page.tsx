import type { Metadata } from 'next';
import { AuthField } from '@/components/auth/auth-field';
import { AuthPreviewForm } from '@/components/auth/auth-preview-form';

export const metadata: Metadata = {
  title: 'Thông tin cá nhân | HomeStore',
};

export default function AccountProfilePage() {
  return (
    <div className="rounded-[var(--radius-surface-large)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-subtle)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
        Hồ sơ
      </p>
      <h2 className="mt-2 text-2xl font-bold text-[var(--color-primary)]">
        Thông tin cá nhân
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
        Form này chưa tải hoặc lưu dữ liệu người dùng thật.
      </p>

      <AuthPreviewForm className="mt-7 grid gap-5 sm:grid-cols-2">
        <AuthField
          id="profile-name"
          name="fullName"
          label="Họ và tên"
          placeholder="Họ và tên"
          autoComplete="name"
        />
        <AuthField
          id="profile-email"
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          autoComplete="email"
        />
        <AuthField
          id="profile-phone"
          name="phone"
          label="Số điện thoại"
          placeholder="Số điện thoại"
          autoComplete="tel"
        />
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled
            aria-disabled="true"
            className="inline-flex min-h-11 cursor-not-allowed items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 font-semibold text-white opacity-60"
          >
            Lưu thay đổi
          </button>
        </div>
      </AuthPreviewForm>
    </div>
  );
}
