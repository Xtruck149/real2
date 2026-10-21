import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Appear } from "@/components/Appear";
import { FactBadge, FactText } from "@/components/FactBadge";
import { Hero } from "@/components/Hero";
import { Bowl, Crab, Flame, ICONS, Icon } from "@/components/Illustrations";
import { Marquee } from "@/components/Marquee";
import { Visual } from "@/components/Visual";
import { gallery, specialties } from "@/content/gallery";
import { menu } from "@/content/menu";
import { site } from "@/content/site";

/** A drawn piece in a round sticker. Decorative. */
function Sticker({ children, bg }: { children: ReactNode; bg: string }) {
  return (
    <svg aria-hidden="true" viewBox="-110 -110 220 220" className="h-28 w-28 rounded-full border-[3px] border-ink" style={{ background: bg }}>
      {children}
    </svg>
  );
}

const STEPS = [
  { n: "01", title: "La mer", text: "Soupe, crabe, crevettes : choisissez ce qui vous fait envie.", bg: "bg-sun", ink: "text-ink", art: <Sticker bg="#0A6670"><Crab s={0.85} /></Sticker> },
  { n: "02", title: "La braise", text: "Poisson, poulet, brochettes : ajoutez une grillade.", bg: "bg-surface", ink: "text-ink", art: <Sticker bg="#FFC21A"><Flame s={0.95} /></Sticker> },
  { n: "03", title: "La table", text: "Accompagnements, boissons, puis votre jour et votre heure.", bg: "bg-coral", ink: "text-white", art: <Sticker bg="#FFE3A0"><Bowl s={0.85} /></Sticker> },
];

const CARD_TONE = [
  { bg: "bg-lagoon", text: "text-white", muted: "text-white" },
  { bg: "bg-sun", text: "text-ink", muted: "text-ink" },
  { bg: "bg-coral", text: "text-white", muted: "text-white" },
];

export default function HomePage() {
  const c = site.contact;
  const featured = menu.flatMap((cat) => cat.items.map((item) => ({ ...item, category: cat.name }))).slice(0, 5);
  const price = (n: number | null) => (n ? `${n.toLocaleString("fr-FR")} F` : "Prix à confirmer");

  return (
    <>
      <Hero />
      <Marquee />

      {/* 1 — The signature tool: build a table in three gestes */}
      <section aria-labelledby="compose-title" className="container-site py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">Composer ma table</p>
            <h2 id="compose-title" className="mt-5 text-4xl sm:text-5xl md:text-6xl">
              Votre table, en trois gestes.
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-lg text-muted">
              Cochez ce qui vous tente : votre sélection s&apos;ajoute à votre demande de réservation. Les plats proposés sont des
              exemples, le restaurant confirmera ce qui est disponible.
            </p>
            <Link href="/reservation#composer" className="btn btn-ink mt-6">
              Composer ma table
              <Icon d={ICONS.arrow} className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Appear as="li" key={s.n} delay={i * 110} className={`card ${s.bg} ${s.ink} flex flex-col gap-5 p-6 md:p-8 ${i === 1 ? "md:translate-y-6" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <span aria-hidden="true" className="font-display text-6xl leading-none">
                  {s.n}
                </span>
                {s.art}
              </div>
              <div>
                <h3 className="text-3xl">{s.title}</h3>
                <p className="mt-2 font-medium">{s.text}</p>
              </div>
            </Appear>
          ))}
        </ol>
      </section>

      {/* 2 — The three specialities, as posters that stack while scrolling */}
      {specialties.length > 0 ? (
        <section aria-labelledby="spec-title" className="bg-surface-2 py-16 md:py-24">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Nos spécialités</p>
                <h2 id="spec-title" className="mt-5 text-4xl sm:text-5xl md:text-6xl">
                  Trois affiches, trois envies.
                </h2>
              </div>
              <Link href="/specialites" className="btn btn-ghost">
                Toutes les spécialités
              </Link>
            </div>
            <ul className="mt-12 space-y-8">
              {specialties.map((s, i) => {
                const tone = CARD_TONE[i % CARD_TONE.length];
                return (
                  <li
                    key={s.title}
                    className={`stack-card hard grid items-center gap-6 rounded-[2rem] border-[3px] border-ink p-5 md:grid-cols-[1fr_1.1fr] md:gap-10 md:p-8 ${tone.bg} ${tone.text}`}
                    style={{ "--stack-top": `${5.5 + i * 1.2}rem` } as CSSProperties}
                  >
                    <Visual scene={s.scene} file={s.file} alt={`Illustration : ${s.title}`} className="rounded-2xl border-[3px] border-ink" />
                    <div className="min-w-0">
                      <p className="font-display text-6xl leading-none opacity-90 md:text-7xl" aria-hidden="true">
                        0{i + 1}
                      </p>
                      <h3 className="mt-3 text-3xl [overflow-wrap:anywhere] md:text-4xl lg:text-5xl">
                        {s.title}
                      </h3>
                      <p className="mt-3">
                        <FactBadge status={s.status} source={s.source} />
                      </p>
                      <p className={`mt-4 max-w-lg text-lg ${tone.muted}`}>{s.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 3 — The chalkboard */}
      <section aria-labelledby="menu-title" className="container-site py-20 md:py-28">
        <div className="chalkboard mx-auto max-w-4xl p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="menu-title" className="chalk text-5xl font-normal sm:text-6xl">
              L&apos;ardoise du jour
            </h2>
            <p className="chalk text-xl text-sun">exemples de plats</p>
          </div>
          <ul className="mt-8 space-y-5">
            {featured.map((item) => (
              <li key={item.name} className="sm:flex sm:items-end sm:gap-3">
                <span className="block min-w-0">
                  <span className="chalk text-2xl sm:text-3xl">{item.name}</span>
                  <FactBadge status={item.status} />
                  <span className="block text-sm text-chalk/80">{item.category}</span>
                </span>
                <span aria-hidden="true" className="leader hidden sm:block" />
                <span className="chalk mt-1 block text-lg italic text-chalk/90 sm:mt-0 sm:shrink-0 sm:text-xl">{price(item.price)}</span>
              </li>
            ))}
          </ul>
          <Link href="/menu" className="btn btn-primary mt-10">
            Voir toute l&apos;ardoise
          </Link>
        </div>
      </section>

      {/* 4 — A loose collage */}
      <section aria-labelledby="gallery-title" className="overflow-x-clip bg-lagoon py-16 text-white md:py-24">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="gallery-title" className="text-4xl sm:text-5xl md:text-6xl">
              En images
            </h2>
            <Link href="/galerie" className="btn btn-primary">
              Ouvrir la galerie
            </Link>
          </div>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {gallery.slice(0, 3).map((img, i) => (
              <Appear as="li" key={img.scene} delay={i * 110} className={`hard zoom-art overflow-hidden rounded-2xl border-[3px] border-ink bg-surface ${["-rotate-2", "rotate-1 sm:translate-y-6", "-rotate-1"][i]}`}>
                <Visual scene={img.scene} file={img.file} alt={img.alt} sizes="(min-width: 640px) 33vw, 100vw" />
                <p className="border-t-[3px] border-ink px-4 py-3 font-display text-lg text-ink">{img.caption}</p>
              </Appear>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — Practical information as a till receipt */}
      <section aria-labelledby="info-title" className="container-site py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Appear className="ticket mx-auto w-full max-w-md rotate-1 p-6 font-mono text-[0.95rem] sm:p-8">
            <p className="text-center font-display text-3xl">{site.name}</p>
            <p className="text-center text-sm text-muted">Ticket de démonstration</p>
            <hr className="my-4 border-t-[3px] border-dashed border-ink" />
            <h2 id="info-title" className="sr-only">
              Infos pratiques
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-bold uppercase tracking-wider">Adresse</dt>
                <dd className="mt-1">
                  <FactText fact={c.address} />
                </dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-wider">Horaires</dt>
                <dd className="mt-1">
                  {c.hours.rows.map((r) => (
                    <span key={r.days} className="block">
                      {r.days} : {r.hours}
                    </span>
                  ))}
                  <FactBadge status={c.hours.status} source={c.hours.source} />
                </dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-wider">Téléphone</dt>
                <dd className="mt-1">{c.phone ? <FactText fact={c.phone} /> : "Non communiqué"}</dd>
              </div>
            </dl>
            <hr className="my-4 border-t-[3px] border-dashed border-ink" />
            <p className="text-center text-sm">Merci de votre visite ★</p>
          </Appear>
          <Appear delay={120}>
            <p className="eyebrow">Venir nous voir</p>
            <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl">On vous garde une place.</h2>
            <p className="mt-5 max-w-lg text-lg text-muted">
              Demandez une table, composez-la, et retrouvez l&apos;itinéraire dans la page contact. Rien n&apos;est définitif avant la
              confirmation du restaurant.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={site.primaryCta.href} className="btn btn-primary">
                {site.primaryCta.label}
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact et itinéraire
              </Link>
            </div>
          </Appear>
        </div>
      </section>
    </>
  );
}
