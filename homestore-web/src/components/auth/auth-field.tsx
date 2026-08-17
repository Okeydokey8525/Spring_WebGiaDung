import React from 'react';

interface AuthFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  name: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
}

export function AuthField({
  id,
  label,
  type = 'text',
  name,
  placeholder,
  autoComplete,
  hint,
}: AuthFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[var(--color-primary)]"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-describedby={hintId}
        className="min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
      />
      {hint ? (
        <p id={hintId} className="mt-2 text-xs leading-5 text-[var(--color-muted)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
