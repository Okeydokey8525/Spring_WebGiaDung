'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthApiError, logoutUser } from '@/lib/auth/client';

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogout() {
    setPending(true);
    setErrorMessage(null);

    try {
      await logoutUser();
      router.replace('/');
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof AuthApiError
          ? error.message
          : 'Không thể đăng xuất. Vui lòng thử lại.'
      );
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)] hover:text-[var(--color-brand-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Đang đăng xuất...' : 'Đăng xuất'}
      </button>
      {errorMessage ? (
        <p role="alert" className="mt-2 text-xs leading-5 text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
