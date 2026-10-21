/**
 * Decorative sea-wave edge between two sections. It takes the colour of the section it closes
 * (`text-*` class on the wrapper) and is hidden from assistive technology.
 */
export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="block h-8 w-full md:h-12" fill="currentColor">
        <path d="M0 28c120 0 120 24 240 24s120-24 240-24 120 24 240 24 120-24 240-24 120 24 240 24 120-24 240-24v28H0Z" />
      </svg>
    </div>
  );
}
