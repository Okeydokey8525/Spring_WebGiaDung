'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthField } from '@/components/auth/auth-field';
import { AuthApiError, loginUser } from '@/lib/auth/client';

interface LoginFormProps {
  nextPath: string;
  registered: boolean;
}

function getFieldError(
  error: AuthApiError | null,
  field: string
): string | undefined {
  return error?.fieldErrors[field];
}

export function LoginForm({ nextPath, registered }: LoginFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [apiError, setApiError] = useState<AuthApiError | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApiError(null);
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    try {
      await loginUser({ email, password });
      router.replace(nextPath);
      router.refresh();
    } catch (error) {
      if (error instanceof AuthApiError) {
        setApiError(error);
      } else {
        setApiError(
          new AuthApiError(
            0,
            'Không thể kết nối tới hệ thống đăng nhập. Vui lòng thử lại.'
          )
        );
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      className="space-y-5"
      aria-describedby="login-status"
      onSubmit={handleSubmit}
    >
      {registered ? (
        <p className="rounded-[var(--radius-control)] bg-[var(--color-brand-soft)] p-3 text-sm leading-6 text-[var(--color-primary)]">
          Tạo tài khoản thành công. Bạn có thể đăng nhập.
        </p>
      ) : null}

      <AuthField
        id="login-email"
        name="email"
        type="email"
        label="Email"
        placeholder="ban@example.com"
        autoComplete="email"
        required
        maxLength={320}
        disabled={pending}
        error={getFieldError(apiError, 'email')}
      />
      <AuthField
        id="login-password"
        name="password"
        type="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        autoComplete="current-password"
        required
        minLength={8}
        maxLength={72}
        disabled={pending}
        error={getFieldError(apiError, 'password')}
      />

      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex min-h-10 items-center gap-2 text-[var(--color-muted)]">
          <input
            type="checkbox"
            name="remember"
            disabled
            className="h-4 w-4 accent-[var(--color-brand)]"
          />
          Ghi nhớ đăng nhập (sắp có)
        </label>
        <Link
          href="/forgot-password"
          className="font-semibold text-[var(--color-brand-hover)] underline-offset-4 hover:underline"
        >
          Quên mật khẩu?
        </Link>
      </div>

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
      >
        {pending ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>

      <div id="login-status" aria-live="polite">
        {apiError ? (
          <div
            role="alert"
            className="rounded-[var(--radius-control)] border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-800"
          >
            <p>{apiError.message}</p>
            {apiError.requestId ? (
              <p className="mt-1 text-xs">Mã yêu cầu: {apiError.requestId}</p>
            ) : null}
          </div>
        ) : (
          <p className="rounded-[var(--radius-control)] bg-[var(--color-brand-soft)] p-3 text-xs leading-5 text-[var(--color-primary)]">
            Phiên đăng nhập được xác thực bởi backend HomeStore và lưu bằng
            session cookie bảo mật.
          </p>
        )}
      </div>
    </form>
  );
}
