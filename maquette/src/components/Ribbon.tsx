import { specialties } from "@/content/gallery";

/**
 * Slow ribbon of the specialities cited by the public listing. It repeats the same three names;
 * the duplicate half is hidden from screen readers, and reduced motion keeps it still (see globals.css).
 */
export function Ribbon() {
  if (specialties.length === 0) return null;
  const names = specialties.map((s) => s.title);

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {[...names, ...names].map((name, i) => (
        <li key={`${name}-${i}`} className="flex items-center gap-6 pr-6 font-display text-2xl italic text-surface md:gap-8 md:pr-8 md:text-3xl">
          {name}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-highlight" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 12c3-4 6-4 9 0s6 4 9 0" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Spécialités citées par la source publique" className="ribbon overflow-hidden bg-accent py-5 md:py-6">
      <div className="ribbon-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
