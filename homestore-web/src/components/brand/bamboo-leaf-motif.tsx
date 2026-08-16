import React from 'react';

interface BambooLeafMotifProps {
  className?: string;
}

export function BambooLeafMotif({ className = '' }: BambooLeafMotifProps) {
  return (
    <svg
      viewBox="0 0 520 520"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="260" cy="260" r="220" fill="var(--color-brand-soft)" />
      <circle cx="378" cy="142" r="72" fill="var(--color-accent-warm)" />

      <g
        fill="none"
        stroke="var(--color-brand)"
        strokeLinecap="round"
        strokeWidth="7"
        opacity="0.78"
      >
        <path d="M186 438C202 347 206 254 203 93" />
        <path d="M293 432C304 335 304 237 296 128" />
        <path d="M376 415C378 337 366 258 345 185" />
      </g>

      <g fill="var(--color-brand)" opacity="0.72">
        <path d="M204 176c-51-18-78-5-99 24 48 9 78 1 99-24Z" />
        <path d="M205 224c54-14 82-1 101 31-49 5-80-5-101-31Z" />
        <path d="M203 291c-52-17-81-4-101 26 49 7 80-2 101-26Z" />
        <path d="M296 202c-47-22-76-12-99 15 45 13 77 8 99-15Z" />
        <path d="M298 256c51-18 81-8 103 21-47 10-79 3-103-21Z" />
        <path d="M345 259c45-24 74-17 99 8-43 16-75 13-99-8Z" />
        <path d="M357 320c48-16 76-5 96 23-45 8-76 0-96-23Z" />
      </g>

      <g fill="var(--color-surface)" opacity="0.92">
        <rect x="103" y="356" width="102" height="74" rx="20" />
        <rect x="220" y="332" width="118" height="98" rx="24" />
        <rect x="354" y="365" width="70" height="65" rx="18" />
      </g>
    </svg>
  );
}
