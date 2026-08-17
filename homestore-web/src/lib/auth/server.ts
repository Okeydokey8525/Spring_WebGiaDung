import 'server-only';

import { cookies } from 'next/headers';
import type { AuthUser } from '@/lib/auth/types';

const apiOrigin = (
  process.env.HOMESTORE_API_ORIGIN ?? 'http://localhost:18080'
).replace(/\/+$/, '');

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const user = value as Partial<AuthUser>;

  return (
    typeof user.id === 'number' &&
    typeof user.fullName === 'string' &&
    typeof user.email === 'string' &&
    (user.role === 'CUSTOMER' || user.role === 'ADMIN')
  );
}

export async function getServerAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const response = await fetch(`${apiOrigin}/api/v1/auth/me`, {
    method: 'GET',
    cache: 'no-store',
    redirect: 'manual',
    headers: {
      Accept: 'application/json',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Unable to verify HomeStore authentication session (${response.status})`
    );
  }

  const payload: unknown = await response.json();

  if (!isAuthUser(payload)) {
    throw new Error('HomeStore authentication response is invalid');
  }

  return payload;
}
