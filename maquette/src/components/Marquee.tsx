import { specialties } from "@/content/gallery";
import { C } from "./Illustrations";

/**
 * Tilted ticker tape of the specialities cited by the public listing. The duplicate half is hidden from screen
 * readers; hover or focus pauses it; reduced motion keeps it still (see globals.css).
 */
export function Marquee() {
  if (specialties.length === 0) return null;
  const names = specialties.map((s) => s.title);

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {[...names, ...names].map((name, i) => (
        <li key={`${name}-${i}`} className="flex items-center gap-5 pr-5 font-display text-3xl uppercase text-sun md:gap-8 md:pr-8 md:text-5xl">
          {name}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 md:h-9 md:w-9">
            <circle cx="12" cy="12" r="5" fill={C.coral} stroke={C.sun} strokeWidth="2" />
            {Array.from({ length: 8 }, (_, k) => (
              <line key={k} x1="12" y1="2.5" x2="12" y2="5" stroke={C.sun} strokeWidth="2" strokeLinecap="round" transform={`rotate(${k * 45} 12 12)`} />
            ))}
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-x-clip py-6 md:py-10">
      <section aria-label="Spécialités citées par la source publique" className="marquee -rotate-1 scale-[1.03] border-y-[3px] border-ink bg-ink py-3 md:py-4">
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </section>
    </div>
  );
}
