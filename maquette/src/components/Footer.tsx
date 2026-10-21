import Link from "next/link";
import { site } from "@/content/site";
import { FactBadge, FactText } from "./FactBadge";
import { C, Waves } from "./Illustrations";

export function Footer() {
  const c = site.contact;
  return (
    <footer className="mt-24">
      <div aria-hidden="true" className="-mb-px leading-[0]">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-10 w-full md:h-14">
          <Waves w={1440} y={6} color={C.lagoon} amp={14} len={96} />
        </svg>
      </div>
      <div className="border-t-0 bg-lagoon pb-10 pt-12 text-white">
        <div className="container-site">
          <p className="font-display text-5xl leading-none text-sun sm:text-7xl">{site.name}</p>
          <p className="mt-3 max-w-xl text-lg text-white">{site.tagline}</p>

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="font-body text-sm font-extrabold uppercase tracking-widest text-sun">Adresse</h2>
              <address className="mt-3 not-italic leading-relaxed">
                <FactText fact={c.address} />
              </address>
            </div>
            <div>
              <h2 className="font-body text-sm font-extrabold uppercase tracking-widest text-sun">Pages</h2>
              <ul className="mt-3 space-y-2">
                {site.nav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="font-semibold underline-offset-4 hover:text-sun hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-body text-sm font-extrabold uppercase tracking-widest text-sun">Réseaux sociaux</h2>
              <ul className="mt-3 space-y-2">
                {site.social.length === 0 ? <li>Liens officiels à confirmer avec l&apos;établissement.</li> : null}
                {site.social.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-4 hover:text-sun hover:underline">
                      {s.network}
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                    <FactBadge status={s.status} source={s.source} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t-2 border-white/30 pt-6 text-sm md:flex-row md:justify-between">
            <p>
              Maquette indépendante réalisée par RealSpill (Abidjan). Contenus marqués « Démo » ou « à confirmer » : non validés par
              l&apos;établissement.
            </p>
            <Link href="/maquette" className="font-bold underline underline-offset-2 hover:text-sun">
              À propos de cette maquette
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
