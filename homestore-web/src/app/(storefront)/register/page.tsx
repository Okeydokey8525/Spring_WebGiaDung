import type { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/components/auth/register-form';
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
      description="Tạo tài khoản để chuẩn bị cho các tính năng theo dõi đơn hàng, lưu địa chỉ và đồng bộ danh sách yêu thích."
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
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">
          Đăng ký
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          Tạo tài khoản khách hàng HomeStore bằng email và mật khẩu của bạn.
        </p>
      </div>

      <RegisterForm />
    </AuthShell>
  );
}
