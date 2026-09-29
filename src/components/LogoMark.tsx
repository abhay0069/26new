export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill="#101010" stroke="rgba(244,241,234,0.14)" />
      <g stroke="#c7ff35" strokeWidth="2.2" strokeLinecap="round">
        <line x1="16" y1="5.5" x2="16" y2="26.5" />
        <line x1="5.5" y1="16" x2="26.5" y2="16" />
        <line x1="8.6" y1="8.6" x2="23.4" y2="23.4" />
        <line x1="23.4" y1="8.6" x2="8.6" y2="23.4" />
      </g>
      <circle cx="16" cy="16" r="4" fill="#101010" stroke="#f4f1ea" strokeWidth="2" />
    </svg>
  );
}
