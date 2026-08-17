import React from 'react';
import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/admin-shell';

export const metadata: Metadata = {
  title: {
    default: 'Quản trị | HomeStore',
    template: '%s | HomeStore Admin',
  },
  description: 'Giao diện quản trị nội bộ HomeStore.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
