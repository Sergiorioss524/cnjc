export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1" />
      <path
        d="M24 12 L27.5 21 H36.5 L29.5 26.5 L32 35.5 L24 30 L16 35.5 L18.5 26.5 L11.5 21 H20.5 Z"
        fill="var(--accent)"
      />
    </svg>
  );
}
