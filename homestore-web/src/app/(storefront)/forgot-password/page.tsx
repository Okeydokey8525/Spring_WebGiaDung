import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthField } from '@/components/auth/auth-field';
import { AuthPreviewForm } from '@/components/auth/auth-preview-form';
import { AuthShell } from '@/components/auth/auth-shell';

export const metadata: Metadata = {
  title: 'Quên mật khẩu | HomeStore',
  description: 'Khôi phục quyền truy cập tài khoản HomeStore.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Khôi phục tài khoản"
      title="Quên mật khẩu?"
      description="Nhập email tài khoản để chuẩn bị nhận hướng dẫn đặt lại mật khẩu khi hệ thống xác thực được kích hoạt."
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
          Khôi phục mật khẩu
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          Không có email nào được gửi trong milestone UI này.
        </p>
      </div>

      <AuthPreviewForm className="space-y-5" describedBy="forgot-status">
        <AuthField
          id="forgot-email"
          name="email"
          type="email"
          label="Email tài khoản"
          placeholder="ban@example.com"
          autoComplete="email"
        />

        <button type="submit" className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 font-semibold text-white opacity-60" disabled aria-disabled="true" >
          Gửi hướng dẫn
        </button>

        <p
          id="forgot-status"
          className="rounded-[var(--radius-control)] bg-[var(--color-brand-soft)] p-3 text-xs leading-5 text-[var(--color-primary)]"
        >
          Luồng gửi email reset sẽ được kích hoạt khi Auth backend và dịch vụ
          email sẵn sàng.
        </p>
      </AuthPreviewForm>
    </AuthShell>
  );
}
