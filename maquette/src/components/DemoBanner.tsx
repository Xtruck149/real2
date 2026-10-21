import Link from "next/link";
import { site } from "@/content/site";
import { isDemo } from "@/lib/env";

export function DemoBanner() {
  if (!isDemo) return null;
  return (
    <div role="note" aria-label="Statut de la maquette" className="border-b-[3px] border-ink bg-ink text-chalk">
      <p className="container-site flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-xs font-semibold sm:text-sm">
        <span className="rounded-full bg-sun px-2.5 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-ink">Démo</span>
        <span>
          Maquette de démonstration : proposition indépendante de RealSpill, ni commandée ni validée par {site.name}.{" "}
          <Link href="/maquette" className="font-bold text-sun underline underline-offset-2">
            En savoir plus
          </Link>
        </span>
      </p>
    </div>
  );
}
