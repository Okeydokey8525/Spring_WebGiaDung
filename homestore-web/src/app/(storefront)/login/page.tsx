import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthField } from '@/components/auth/auth-field';
import { AuthPreviewForm } from '@/components/auth/auth-preview-form';
import { AuthShell } from '@/components/auth/auth-shell';

export const metadata: Metadata = {
  title: 'Đăng nhập | HomeStore',
  description: 'Đăng nhập tài khoản HomeStore.',
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Tài khoản HomeStore"
      title="Chào mừng bạn quay lại"
      description="Đăng nhập để quản lý thông tin cá nhân, địa chỉ, đơn hàng và danh sách sản phẩm yêu thích."
      footer={
        <p>
          Chưa có tài khoản?
          <Link
            href="/register"
            className="ml-1.5 font-semibold text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      }
    >
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">Đăng nhập</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          Tính năng đăng nhập đang được hoàn thiện để kết nối với tài khoản HomeStore.
        </p>
      </div>

      <AuthPreviewForm className="space-y-5" describedBy="login-status">
        <AuthField
          id="login-email"
          name="email"
          type="email"
          label="Email"
          placeholder="ban@example.com"
          autoComplete="email"
        />
        <AuthField
          id="login-password"
          name="password"
          type="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          autoComplete="current-password"
        />

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex min-h-10 items-center gap-2 text-[var(--color-primary)]">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 accent-[var(--color-brand)]"
            />
            Ghi nhớ đăng nhập
          </label>
          <Link
            href="/forgot-password"
            className="font-semibold text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <button type="submit" className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 font-semibold text-white opacity-60" disabled aria-disabled="true" >
          Đăng nhập
        </button>

        <p
          id="login-status"
          className="rounded-[var(--radius-control)] bg-[var(--color-brand-soft)] p-3 text-xs leading-5 text-[var(--color-primary)]"
        >
          Nút đăng nhập tạm khóa để không tạo trạng thái xác thực giả trước khi
          backend Auth được triển khai.
        </p>
      </AuthPreviewForm>
    </AuthShell>
  );
}
