"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICONS, Icon } from "./Illustrations";

/** The five destinations, in thumb order. "Réserver" sits in the middle and is the one that stands out. */
const ITEMS = [
  { href: "/menu", label: "Carte", icon: ICONS.menu },
  { href: "/specialites", label: "Spécialités", icon: ICONS.star },
  { href: "/reservation", label: "Réserver", icon: ICONS.table, primary: true },
  { href: "/galerie", label: "Galerie", icon: ICONS.image },
  { href: "/contact", label: "Contact", icon: ICONS.phone },
] as const;

/**
 * Floating dock: a full-width bar on phones, a centred pill on larger screens. It replaces both the top menu
 * and the mobile action bar. The current page is exposed with aria-current and a filled background.
 */
export function Dock() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-ink bg-ink pb-[env(safe-area-inset-bottom)] md:inset-x-auto md:bottom-5 md:left-1/2 md:-translate-x-1/2 md:rounded-full md:border-[3px] md:pb-0 md:shadow-[5px_5px_0_var(--color-sun)]"
    >
      <ul className="grid grid-cols-5 items-end gap-1 px-2 pb-1.5 pt-1.5 md:flex md:items-center md:gap-1.5 md:px-2.5 md:py-2">
        {ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const tone = "primary" in item && item.primary ? "bg-coral text-white" : active ? "bg-sun text-ink" : "text-chalk hover:bg-white/10";
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[0.75rem] font-bold leading-tight transition-colors md:min-h-11 md:flex-row md:gap-2 md:rounded-full md:px-4 md:text-sm ${tone} ${
                  "primary" in item && item.primary && active ? "ring-2 ring-sun ring-offset-2 ring-offset-ink" : ""
                }`}
              >
                <Icon d={item.icon} className="h-5 w-5 md:h-5 md:w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
