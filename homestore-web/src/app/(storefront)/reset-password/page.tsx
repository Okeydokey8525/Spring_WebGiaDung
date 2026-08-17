import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthField } from '@/components/auth/auth-field';
import { AuthPreviewForm } from '@/components/auth/auth-preview-form';
import { AuthShell } from '@/components/auth/auth-shell';

export const metadata: Metadata = {
  title: 'Đặt lại mật khẩu | HomeStore',
  description: 'Đặt lại mật khẩu tài khoản HomeStore.',
};

export default function ResetPasswordPage() {
  return (
    <AuthShell
      eyebrow="Mật khẩu mới"
      title="Đặt lại mật khẩu"
      description="Giao diện này sẽ nhận token khôi phục hợp lệ từ email khi luồng Auth backend được triển khai."
      footer={
        <Link
          href="/login"
          className="font-semibold text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
        >
          ← Quay lại đăng nhập
        </Link>
      }
    >
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">
          Tạo mật khẩu mới
        </h2>
      </div>

      <AuthPreviewForm className="space-y-5" describedBy="reset-status">
        <AuthField
          id="reset-password"
          name="password"
          type="password"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          autoComplete="new-password"
        />
        <AuthField
          id="reset-confirm-password"
          name="confirmPassword"
          type="password"
          label="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu"
          autoComplete="new-password"
        />

        <button type="submit" className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 font-semibold text-white opacity-60" disabled aria-disabled="true" >
          Cập nhật mật khẩu
        </button>

        <p
          id="reset-status"
          className="rounded-[var(--radius-control)] bg-[var(--color-brand-soft)] p-3 text-xs leading-5 text-[var(--color-primary)]"
        >
          Chưa có token hoặc thao tác đổi mật khẩu thật trong milestone UI.
        </p>
      </AuthPreviewForm>
    </AuthShell>
  );
}
