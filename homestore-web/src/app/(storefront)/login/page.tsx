import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { AuthShell } from '@/components/auth/auth-shell';

export const metadata: Metadata = {
  title: 'Đăng nhập | HomeStore',
  description: 'Đăng nhập tài khoản HomeStore.',
};

interface LoginPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function safeInternalPath(value: string | undefined): string {
  if (
    value &&
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.includes('\\')
  ) {
    return value;
  }

  return '/account';
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = safeInternalPath(firstParam(params.next));
  const registered = firstParam(params.registered) === '1';

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
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">
          Đăng nhập
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          Sử dụng tài khoản HomeStore để bắt đầu phiên đăng nhập bảo mật.
        </p>
      </div>

      <LoginForm nextPath={nextPath} registered={registered} />
    </AuthShell>
  );
}
