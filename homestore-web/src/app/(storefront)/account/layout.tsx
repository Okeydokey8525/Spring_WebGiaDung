import React from 'react';
import { AccountShell } from '@/components/account/account-shell';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccountShell>{children}</AccountShell>;
}
