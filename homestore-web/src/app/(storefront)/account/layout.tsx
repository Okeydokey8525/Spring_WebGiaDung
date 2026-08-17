import React from 'react';
import { redirect } from 'next/navigation';
import { AccountShell } from '@/components/account/account-shell';
import { getServerAuthUser } from '@/lib/auth/server';

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerAuthUser();

  if (!user) {
    redirect('/login?next=/account');
  }

  return <AccountShell user={user}>{children}</AccountShell>;
}
