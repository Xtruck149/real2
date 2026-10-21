import Link from "next/link";
import { DemoImage } from "@/components/DemoImage";
import { FactBadge, FactText } from "@/components/FactBadge";
import { Hero } from "@/components/Hero";
import { eventFormats, gallery, specialties } from "@/content/gallery";
import { menu } from "@/content/menu";
import { copy, site } from "@/content/site";
import { Appear } from "@/components/Appear";
import { Ribbon } from "@/components/Ribbon";
import { Wave } from "@/components/Wave";

/** Line icons for the three highlights (shell, flame, bowl): decorative only. */
const HIGHLIGHT_ICONS = [
  "M12 3c-4 0-8 3.5-8 8 0 3 2 5 4 5l1 4h6l1-4c2 0 4-2 4-5 0-4.500-4-8-8-8ZM12 3v13M8 5l2 11M16 5l-2 11",
  "M12 3c1 3 4 4.500 4 8a4 4 0 0 1-8 0c0-1.500.5-2.500 1.500-3.500C9.500 9 10 7 12 3ZM9 18h6M10 21h4",
  "M3 11h18a0 0 0 0 1 0 0 9 9 0 0 1-9 9 9 9 0 0 1-9-9ZM8 7c0-1.500 1-1.500 1-3M12 7c0-1.500 1-1.500 1-3M16 7c0-1.500 1-1.500 1-3",
];

export default function HomePage() {
  const c = site.contact;
  const featured = menu.flatMap((cat) => cat.items.map((item) => ({ ...item, category: cat.name }))).slice(0, 4);

  return (
    <>
      <Hero />
      <Ribbon />

      <section aria-labelledby="intro-title" className="container-site py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <p className="eyebrow">Bienvenue</p>
            <h2 id="intro-title" className="mt-3 text-4xl md:text-5xl">
              {copy.introTitle}
            </h2>
          </div>
          <p className="text-lg text-muted">{copy.introText}</p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {copy.highlights.map((h, i) => (
            <Appear as="li" key={h.title} delay={i * 110} className="card p-6 md:p-8">
              <div className="flex items-start justify-between">
                <span aria-hidden="true" className="font-display text-5xl text-accent">
                  0{i + 1}
                </span>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8 text-highlight" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]} />
                </svg>
              </div>
              <h3 className="mt-4 text-2xl">{h.title}</h3>
              <p className="mt-2 text-muted">{h.text}</p>
            </Appear>
          ))}
        </ul>
      </section>

      {specialties.length > 0 ? (
        <>
        <Wave className="text-surface" flip />
        <section aria-labelledby="spec-title" className="bg-surface py-14 md:py-20">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Nos spécialités</p>
                <h2 id="spec-title" className="mt-3 text-4xl md:text-5xl">
                  Ce qui fait notre réputation
                </h2>
              </div>
              <Link href="/specialites" className="btn btn-ghost">
                Toutes les spécialités
              </Link>
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {specialties.map((s, i) => (
                <Appear as="li" key={s.title} delay={i * 110} className="card overflow-hidden !bg-bg">
                  <div className="zoom-img overflow-hidden">
                    <DemoImage file={s.image} alt={`Visuel de démonstration : ${s.title}`} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl">
                      {s.title}
                      <FactBadge status={s.status} source={s.source} />
                    </h3>
                    <p className="mt-2 text-muted">{s.description}</p>
                  </div>
                </Appear>
              ))}
            </ul>
          </div>
        </section>
        <Wave className="text-surface" />
        </>
      ) : null}

      <section aria-labelledby="menu-title" className="container-site py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <Appear className="zoom-img relative overflow-hidden rounded-[var(--radius-card)] shadow-[0_30px_60px_-34px_rgb(14_74_96/0.55)]">
            <DemoImage file={gallery[0].file} alt={gallery[0].alt} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover" />
          </Appear>
          <Appear delay={120} className="flex flex-col justify-center">
            <p className="eyebrow">À la carte</p>
            <h2 id="menu-title" className="mt-3 text-4xl md:text-5xl">
              Un aperçu du menu
            </h2>
            <span className="rule-wave" aria-hidden="true" />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {featured.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-4 py-4">
                  <span>
                    <span className="font-display text-xl">{item.name}</span>
                    <FactBadge status={item.status} />
                    <span className="block text-sm text-muted">{item.category}</span>
                  </span>
                  <span className={`tabular shrink-0 text-sm ${item.price ? "text-muted" : "pending"}`}>{item.price ? `${item.price.toLocaleString("fr-FR")} F` : "Prix à confirmer"}</span>
                </li>
              ))}
            </ul>
            <Link href="/menu" className="btn btn-primary mt-8 self-start">
              Voir tout le menu
            </Link>
          </Appear>
        </div>
      </section>

      {eventFormats.length > 0 ? (
        <section aria-labelledby="events-title" className="border-y border-line bg-surface py-20 md:py-28">
          <div className="container-site grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">Événements</p>
              <h2 id="events-title" className="mt-3 text-4xl md:text-5xl">
                Votre soirée, organisée avec l&apos;équipe
              </h2>
              <p className="mt-4 max-w-xl text-lg text-muted">
                {eventFormats.map((e) => e.title.toLowerCase()).join(", ")} : décrivez votre projet, l&apos;équipe vous recontacte.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={copy.reservationIncludesEvents ? "/reservation#evenement" : "/evenements"} className="btn btn-primary">
                Organiser un événement
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="gallery-title" className="container-site py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="gallery-title" className="text-4xl md:text-5xl">
            En images
          </h2>
          <Link href="/galerie" className="btn btn-ghost">
            Ouvrir la galerie
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {gallery.slice(1, 4).map((img, i) => (
            <li key={img.file} className={`zoom-img relative aspect-square overflow-hidden rounded-[var(--radius-card)] ${i === 0 ? "col-span-2 aspect-[2/1] md:col-span-1 md:aspect-square" : ""}`}>
              <DemoImage file={img.file} alt={img.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="info-title" className="container-site">
        <div className="card grid gap-8 p-6 md:grid-cols-3 md:p-10">
          <h2 id="info-title" className="text-3xl md:text-4xl">
            Infos pratiques
          </h2>
          <div>
            <h3 className="font-body text-sm font-bold uppercase tracking-widest text-muted">Adresse</h3>
            <p className="mt-2">
              <FactText fact={c.address} />
            </p>
          </div>
          <div>
            <h3 className="font-body text-sm font-bold uppercase tracking-widest text-muted">
              Horaires
              <FactBadge status={c.hours.status} source={c.hours.source} />
            </h3>
            <ul className="mt-2">
              {c.hours.rows.map((r) => (
                <li key={r.days}>
                  {r.days} : {r.hours}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-4 inline-block font-semibold text-accent underline underline-offset-4">
              Contact et itinéraire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
