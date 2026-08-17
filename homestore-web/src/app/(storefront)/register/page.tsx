import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthField } from '@/components/auth/auth-field';
import { AuthPreviewForm } from '@/components/auth/auth-preview-form';
import { AuthShell } from '@/components/auth/auth-shell';

export const metadata: Metadata = {
  title: 'Đăng ký | HomeStore',
  description: 'Tạo tài khoản HomeStore.',
};

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Tạo tài khoản"
      title="Một tài khoản cho việc mua sắm của bạn"
      description="Chuẩn bị thông tin để sau này theo dõi đơn hàng, lưu địa chỉ và đồng bộ danh sách yêu thích."
      footer={
        <p>
          Đã có tài khoản? 
          <Link
            href="/login"
            className="ml-1.5 font-semibold text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      }
    >
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">Đăng ký</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          Các trường dưới đây là giao diện chuẩn bị cho luồng đăng ký thực tế.
        </p>
      </div>

      <AuthPreviewForm className="space-y-5" describedBy="register-status">
        <AuthField
          id="register-name"
          name="fullName"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          autoComplete="name"
        />
        <AuthField
          id="register-email"
          name="email"
          type="email"
          label="Email"
          placeholder="ban@example.com"
          autoComplete="email"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField
            id="register-password"
            name="password"
            type="password"
            label="Mật khẩu"
            placeholder="Tạo mật khẩu"
            autoComplete="new-password"
          />
          <AuthField
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
            autoComplete="new-password"
          />
        </div>

        <label className="flex items-start gap-3 text-sm leading-6 text-[var(--color-primary)]">
          <input
            type="checkbox"
            name="terms"
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-brand)]"
          />
          <span>
            Tôi đồng ý với điều khoản và chính sách khi các nội dung này được
            công bố chính thức.
          </span>
        </label>

        <button type="submit" className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 font-semibold text-white opacity-60" disabled aria-disabled="true" >
          Tạo tài khoản
        </button>

        <p
          id="register-status"
          className="rounded-[var(--radius-control)] bg-[var(--color-brand-soft)] p-3 text-xs leading-5 text-[var(--color-primary)]"
        >
          Tạo tài khoản sẽ được kích hoạt khi hệ thống tài khoản chính thức sẵn sàng.
        </p>
      </AuthPreviewForm>
    </AuthShell>
  );
}
