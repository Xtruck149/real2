import Link from "next/link";
import type { NavLink } from "@/content/types";
import { C } from "./Illustrations";

/**
 * Slim top bar: the painted sign and one action. Navigation lives in the floating dock (components/Dock.tsx),
 * so the same controls are in thumb reach on a phone and centred at the bottom on a desktop.
 */
export function Header({ name, cta }: { name: string; cta: NavLink }) {
  return (
    <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-bg/95 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={`${name}, accueil`} className="group flex items-center gap-3">
          <span className="hard-sm sticker-tilt-l flex items-center gap-2 rounded-xl border-[2.5px] border-ink bg-sun px-3 py-1 transition-transform group-hover:-rotate-1 group-hover:scale-105">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
              <circle cx="12" cy="12" r="5" fill={C.coral} stroke={C.ink} strokeWidth="2" />
              {Array.from({ length: 8 }, (_, i) => (
                <line key={i} x1="12" y1="2.5" x2="12" y2="5" stroke={C.ink} strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 45} 12 12)`} />
              ))}
            </svg>
            <span className="font-display text-xl leading-none text-ink sm:text-2xl">{name}</span>
          </span>
          <span className="hidden text-sm font-semibold text-muted lg:inline">Angré · Abidjan</span>
        </Link>
        <Link href={cta.href} className="btn btn-primary min-h-11 px-4 text-sm sm:px-5">
          {cta.label}
        </Link>
      </div>
    </header>
  );
}
