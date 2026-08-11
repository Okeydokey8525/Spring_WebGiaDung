import React from 'react';
import { SkipLink } from '@/components/layout/skip-link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 flex flex-col focus:outline-none"
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
