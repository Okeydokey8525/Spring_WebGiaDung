'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthField } from '@/components/auth/auth-field';
import { AuthApiError, registerUser } from '@/lib/auth/client';

function getFieldError(
  error: AuthApiError | null,
  field: string
): string | undefined {
  return error?.fieldErrors[field];
}

export function RegisterForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [apiError, setApiError] = useState<AuthApiError | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApiError(null);

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get('fullName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirmPassword') ?? '');

    if (password !== confirmPassword) {
      setApiError(
        new AuthApiError(400, 'Mật khẩu nhập lại không khớp.', {
          fieldErrors: {
            confirmPassword: 'Mật khẩu nhập lại không khớp.',
          },
        })
      );
      return;
    }

    setPending(true);

    try {
      await registerUser({
        fullName,
        email,
        password,
        confirmPassword,
      });
      router.replace('/login?registered=1');
      router.refresh();
    } catch (error) {
      if (error instanceof AuthApiError) {
        setApiError(error);
      } else {
        setApiError(
          new AuthApiError(
            0,
            'Không thể kết nối tới hệ thống đăng ký. Vui lòng thử lại.'
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
      aria-describedby="register-status"
      onSubmit={handleSubmit}
    >
      <AuthField
        id="register-name"
        name="fullName"
        label="Họ và tên"
        placeholder="Nguyễn Văn A"
        autoComplete="name"
        required
        maxLength={120}
        disabled={pending}
        error={getFieldError(apiError, 'fullName')}
      />
      <AuthField
        id="register-email"
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
      <div className="grid gap-5 sm:grid-cols-2">
        <AuthField
          id="register-password"
          name="password"
          type="password"
          label="Mật khẩu"
          placeholder="Tạo mật khẩu"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={72}
          disabled={pending}
          hint="Từ 8 đến 72 ký tự."
          error={getFieldError(apiError, 'password')}
        />
        <AuthField
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          label="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={72}
          disabled={pending}
          error={getFieldError(apiError, 'confirmPassword')}
        />
      </div>

      <p className="text-sm leading-6 text-[var(--color-muted)]">
        Điều khoản và chính sách sử dụng sẽ được công bố riêng khi hoàn thiện.
        Việc tạo tài khoản ở giai đoạn này không ghi nhận một trạng thái chấp
        thuận pháp lý giả.
      </p>

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-5 font-semibold text-white transition-colors hover:bg-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
      >
        {pending ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
      </button>

      <div id="register-status" aria-live="polite">
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
            Sau khi tạo tài khoản thành công, bạn sẽ được chuyển sang trang đăng
            nhập. Hệ thống không tự đăng nhập thay bạn.
          </p>
        )}
      </div>
    </form>
  );
}
