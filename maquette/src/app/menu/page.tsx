import Link from "next/link";
import type { ReactNode } from "react";
import { Appear } from "@/components/Appear";
import { FactBadge } from "@/components/FactBadge";
import { Bowl, Crab, Flame, Glass, Plantain } from "@/components/Illustrations";
import { PageHeader } from "@/components/PageHeader";
import { menu } from "@/content/menu";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Menu", `L'ardoise de ${site.name} à ${site.district} : catégories, plats et boissons.`, "/menu");

const price = (value: number | null) => (value === null ? "Prix à confirmer" : `${value.toLocaleString("fr-FR")} FCFA`);

/** One small drawing per category; chalk-white outline so it sits on the board. */
const ART: Record<string, ReactNode> = {
  soupes: <Bowl s={0.8} />,
  "fruits-de-mer": <Crab s={0.8} />,
  grillades: <Flame s={0.9} />,
  accompagnements: <Plantain s={1} />,
  boissons: <Glass s={0.85} />,
};

export default function MenuPage() {
  const unpriced = menu.every((c) => c.items.every((i) => i.price === null));
  return (
    <>
      <PageHeader eyebrow="La carte" title="L'ardoise">
        <p>Parcourez la carte, catégorie par catégorie.</p>
        {unpriced ? (
          <p className="mt-4 rounded-2xl border-[2.5px] border-ink bg-surface p-4 text-base shadow-[4px_4px_0_var(--color-ink)]">
            <strong>Démonstration :</strong> les plats sont des exemples et aucun prix n&apos;est affiché tant que l&apos;établissement n&apos;a pas
            communiqué sa carte officielle.
          </p>
        ) : null}
      </PageHeader>

      <nav aria-label="Catégories du menu" className="sticky top-16 z-20 border-y-[3px] border-ink bg-sun">
        <ul className="container-site flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {menu.map((c) => (
            <li key={c.id} className="shrink-0">
              <a href={`#${c.id}`} className="inline-flex min-h-11 items-center rounded-full border-[2.5px] border-ink bg-surface px-4 text-sm font-extrabold text-ink hover:bg-ink hover:text-sun">
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-site mt-16 grid gap-16 lg:grid-cols-2 lg:gap-x-20">
        {menu.map((cat, i) => (
          <Appear as="section" key={cat.id} delay={(i % 2) * 100} className="chalkboard min-w-0 p-6 sm:p-9">
            <div id={cat.id} aria-labelledby={`${cat.id}-title`} role="group" className="scroll-mt-40">
              <div className="flex items-center justify-between gap-4 border-b-2 border-dashed border-chalk/50 pb-4">
                <div className="min-w-0">
                  <h2 id={`${cat.id}-title`} className="chalk text-4xl font-normal sm:text-5xl">
                    {cat.name}
                  </h2>
                  <p className="chalk mt-1 text-xl text-sun">{cat.intro}</p>
                </div>
                <svg aria-hidden="true" viewBox="-110 -110 220 220" className="h-20 w-20 shrink-0 sm:h-24 sm:w-24">
                  {ART[cat.id]}
                </svg>
              </div>
              <ul className="mt-6 space-y-6">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <div className="sm:flex sm:items-end sm:gap-3">
                      <h3 className="chalk min-w-0 text-2xl font-normal leading-tight sm:text-3xl">
                        {item.name}
                        <FactBadge status={item.status} />
                      </h3>
                      <span aria-hidden="true" className="leader hidden sm:block" />
                      <p className={`chalk tabular mt-1 text-lg sm:mt-0 sm:shrink-0 sm:text-xl ${item.price === null ? "italic text-chalk/90" : "text-sun"}`}>{price(item.price)}</p>
                    </div>
                    <p className="mt-1 max-w-md text-sm text-chalk/85">{item.description}</p>
                    {item.tags?.length ? (
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <li key={t} className="chalk rounded-full border-2 border-chalk/70 px-3 py-0.5 text-base">
                            {t}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </Appear>
        ))}
      </div>

      <div className="container-site mt-24">
        <div className="card flex flex-col items-start justify-between gap-6 bg-sun p-6 md:flex-row md:items-center md:p-10">
          <p className="font-display text-3xl md:text-4xl">Une envie ? Composez votre table.</p>
          <Link href="/reservation#composer" className="btn btn-ink">
            Composer ma table
          </Link>
        </div>
      </div>
    </>
  );
}
