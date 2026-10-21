import Link from "next/link";
import { FactBadge } from "@/components/FactBadge";
import { PageHeader } from "@/components/PageHeader";
import { TableComposer } from "@/components/TableComposer";
import { EventForm, ReservationForm } from "@/components/forms/RestaurantForms";
import { copy, site } from "@/content/site";
import { isDemo } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  copy.reservationIncludesEvents ? "Réservations & événements" : "Réservation",
  `Demandez une table${copy.reservationIncludesEvents ? " ou organisez un événement" : ""} chez ${site.name}, ${site.district}.`,
  "/reservation",
);

const CHIP = "inline-flex min-h-11 items-center rounded-full border-[2.5px] border-ink bg-surface px-5 text-sm font-extrabold shadow-[3px_3px_0_var(--color-ink)] hover:bg-sun";

export default function ReservationPage() {
  const h = site.contact.hours;
  return (
    <>
      <PageHeader eyebrow="Réservation" title={copy.reservationIncludesEvents ? "Réserver une table ou une fête" : "Réserver une table"}>
        <p>{copy.reservationIntro}</p>
      </PageHeader>

      {copy.reservationIncludesEvents ? (
        <nav aria-label="Aller à" className="container-site -mt-4 mb-10 flex flex-wrap gap-3">
          <a href="#composer" className={CHIP}>
            Composer ma table
          </a>
          <a href="#reservation" className={CHIP}>
            Réserver
          </a>
          <a href="#evenement" className={CHIP}>
            Événement
          </a>
        </nav>
      ) : null}

      <div className="container-site grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-16">
          <section id="composer" aria-labelledby="composer-title">
            <TableComposer restaurant={site.name} />
          </section>
          <section id="reservation" aria-label="Réserver une table">
            <ReservationForm restaurant={site.name} />
          </section>
          {copy.reservationIncludesEvents ? (
            <section id="evenement" aria-label="Demande pour un événement">
              <EventForm restaurant={site.name} />
            </section>
          ) : null}
        </div>

        <aside aria-labelledby="aside-title" className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <h2 id="aside-title" className="sr-only">
            Informations utiles
          </h2>
          {isDemo ? (
            <div className="card bg-sun p-6" data-testid="demo-booking-note">
              <h3 className="text-2xl">En démonstration</h3>
              <p className="mt-2">
                Ce formulaire montre le parcours prévu : <strong>aucune demande n&apos;est transmise</strong> au restaurant et aucune
                réservation n&apos;est enregistrée. Le circuit réel (destinataire, délai de réponse, mode de confirmation) sera défini avec{" "}
                {site.name}.
              </p>
            </div>
          ) : (
            <div className="card bg-sun p-6">
              <h3 className="text-2xl">Comment ça marche ?</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                <li>Vous envoyez votre demande.</li>
                <li>L&apos;équipe vérifie la disponibilité.</li>
                <li>Vous recevez une confirmation par téléphone ou WhatsApp.</li>
              </ol>
            </div>
          )}
          <div className="card p-6">
            <h3 className="text-2xl">
              Horaires
              <FactBadge status={h.status} source={h.source} />
            </h3>
            <ul className="mt-3 text-muted">
              {h.rows.map((r) => (
                <li key={r.days}>
                  {r.days} : {r.hours}
                </li>
              ))}
            </ul>
          </div>
          {!copy.reservationIncludesEvents ? (
            <div className="card p-6">
              <h3 className="text-2xl">Plus de 40 personnes ?</h3>
              <p className="mt-2 text-muted">Pour une fête ou une privatisation, utilisez la demande d&apos;événement.</p>
              <Link href="/evenements" className="btn btn-ghost mt-4 min-h-11 text-sm">
                Organiser un événement
              </Link>
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}
