import React from 'react';

interface AuthFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  name: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
}

export function AuthField({
  id,
  label,
  type = 'text',
  name,
  placeholder,
  autoComplete,
  hint,
  error,
  required,
  minLength,
  maxLength,
  disabled,
}: AuthFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

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
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
        className="min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-60"
      />
      {hint ? (
        <p
          id={hintId}
          className="mt-2 text-xs leading-5 text-[var(--color-muted)]"
        >
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 text-xs leading-5 text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
