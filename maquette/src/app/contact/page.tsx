import Link from "next/link";
import { FactBadge, FactText } from "@/components/FactBadge";
import { C, ICONS, Icon } from "@/components/Illustrations";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/content/site";
import { telHref } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Contact & accès", `Adresse, horaires et itinéraire pour venir chez ${site.name}, ${site.district}, ${site.locality}.`, "/contact");

const DT = "text-sm font-extrabold uppercase tracking-widest";

/** Hand-drawn neighbourhood sketch. It is an illustration, not a geolocated map: the exact position is still to be confirmed. */
function SketchMap() {
  return (
    <svg viewBox="0 0 400 300" className="block h-full w-full" role="img" aria-label="Plan dessiné du quartier : illustration, position exacte à confirmer" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill={C.sand} />
      <path d="M-10 210 Q120 150 230 190 T420 120 V320 H-10Z" fill={C.lagoon} stroke={C.ink} strokeWidth="4" />
      <path d="M0 60 H400 M0 140 H260 M90 0 V300 M250 0 V210 M330 70 V300" stroke={C.paper} strokeWidth="18" strokeLinecap="round" />
      <path d="M0 60 H400 M0 140 H260 M90 0 V300 M250 0 V210 M330 70 V300" stroke={C.ink} strokeWidth="3" strokeDasharray="10 12" strokeLinecap="round" />
      {[
        [130, 20, 52, 28],
        [130, 92, 56, 30],
        [18, 92, 54, 30],
        [280, 20, 40, 30],
        [276, 150, 44, 30],
        [352, 90, 38, 36],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill={i % 2 ? C.paper : C.cream} stroke={C.ink} strokeWidth="3" />
      ))}
      <g transform="translate(170 110)">
        <g className="bob">
          <path d="M0 0 C-26 -34 -22 -62 0 -62 C22 -62 26 -34 0 0Z" fill={C.coral} stroke={C.ink} strokeWidth="4" strokeLinejoin="round" />
          <circle cy="-40" r="9" fill={C.sun} stroke={C.ink} strokeWidth="3" />
        </g>
      </g>
    </svg>
  );
}

export default function ContactPage() {
  const c = site.contact;
  const tel = telHref(c.phone);
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapsQuery)}`;

  return (
    <>
      <PageHeader eyebrow="Contact" title="Nous trouver, nous joindre" />
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-start">
        <section aria-labelledby="coord-title" className="ticket mb-5 rotate-[-0.6deg] p-6 font-mono md:p-9">
          <h2 id="coord-title" className="font-display text-3xl">
            Coordonnées
          </h2>
          <hr className="my-4 border-t-[3px] border-dashed border-ink" />
          <dl className="space-y-6">
            <div>
              <dt className={DT}>Adresse</dt>
              <dd className="mt-1 text-lg">
                <address className="not-italic">
                  <FactText fact={c.address} />
                </address>
              </dd>
            </div>
            <div>
              <dt className={DT}>Téléphone</dt>
              <dd className="mt-1 text-lg">
                {c.phone && tel ? <a href={tel} className="underline underline-offset-4">{c.phone.value}</a> : c.phone ? <FactText fact={c.phone} /> : "Non communiqué"}
              </dd>
            </div>
            {c.email ? (
              <div>
                <dt className={DT}>E-mail</dt>
                <dd className="mt-1 text-lg">
                  {c.email.status === "confirme" ? <a href={`mailto:${c.email.value}`} className="underline underline-offset-4">{c.email.value}</a> : <FactText fact={c.email} />}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className={DT}>
                Horaires
                <FactBadge status={c.hours.status} source={c.hours.source} />
              </dt>
              <dd className="mt-1">
                <ul>
                  {c.hours.rows.map((r) => (
                    <li key={r.days} className="text-lg">
                      {r.days} : {r.hours}
                    </li>
                  ))}
                </ul>
                {c.hours.source ? <p className="mt-2 text-sm text-muted">{c.hours.source}</p> : null}
              </dd>
            </div>
          </dl>
          <hr className="my-6 border-t-[3px] border-dashed border-ink" />
          <div className="flex flex-wrap gap-3 font-body">
            <a href={maps} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
              <Icon d={ICONS.pin} className="h-5 w-5" />
              Itinéraire Google Maps<span className="sr-only"> (nouvel onglet)</span>
            </a>
            <Link href={site.primaryCta.href} className="btn btn-primary">
              {site.primaryCta.label}
            </Link>
          </div>
        </section>

        <section aria-labelledby="map-title" className="space-y-5">
          <div className="hard sticker-tilt-r aspect-[4/3] overflow-hidden rounded-[2rem] border-[3px] border-ink">
            <SketchMap />
          </div>
          <div>
            <h2 id="map-title" className="text-3xl">
              {site.district}, {site.locality}
            </h2>
            <p className="mt-2 text-muted">
              Plan dessiné pour la démonstration, sans module tiers : rien n&apos;est chargé tant que le visiteur n&apos;ouvre pas l&apos;itinéraire.
              L&apos;emplacement exact sera vérifié avec l&apos;établissement.
            </p>
          </div>
        </section>

        <section aria-labelledby="social-title" className="card bg-sun p-6 md:p-10 lg:col-span-2">
          <h2 id="social-title" className="text-3xl">
            Réseaux sociaux
          </h2>
          <ul className="mt-4 flex flex-wrap items-center gap-3">
            {site.social.length === 0 ? <li>Liens officiels à confirmer avec l&apos;établissement.</li> : null}
            {site.social.map((s) => (
              <li key={s.url} className="flex items-center">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-11 text-sm">
                  {s.network}
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
                <FactBadge status={s.status} source={s.source} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
