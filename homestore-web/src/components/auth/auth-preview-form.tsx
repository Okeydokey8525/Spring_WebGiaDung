'use client';

import React from 'react';

interface AuthPreviewFormProps {
  children: React.ReactNode;
  className?: string;
  describedBy?: string;
}

export function AuthPreviewForm({
  children,
  className,
  describedBy,
}: AuthPreviewFormProps) {
  return (
    <form
      className={className}
      aria-describedby={describedBy}
      onSubmit={(event) => event.preventDefault()}
    >
      {children}
    </form>
  );
}
