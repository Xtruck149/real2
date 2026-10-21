import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { FactBadge } from "@/components/FactBadge";
import { Fish, Sun } from "@/components/Illustrations";
import { PageHeader } from "@/components/PageHeader";
import { Visual } from "@/components/Visual";
import { specialties } from "@/content/gallery";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Spécialités", `Les spécialités de ${site.name} à ${site.district}, ${site.locality}.`, "/specialites");

const TONES = [
  { card: "bg-lagoon text-white", chip: "bg-sun text-ink" },
  { card: "bg-sun text-ink", chip: "bg-ink text-sun" },
  { card: "bg-coral text-white", chip: "bg-sun text-ink" },
];

export default function SpecialitesPage() {
  if (specialties.length === 0) notFound();
  return (
    <>
      <PageHeader
        eyebrow="Spécialités"
        title="Les plats qui font la maison"
        art={
          <svg viewBox="-110 -110 220 220" className="h-36 w-36">
            <Sun s={0.9} />
            <Fish s={0.5} y={4} />
          </svg>
        }
      >
        <p>Les spécialités citées dans les sources publiques, présentées en attendant la description et les photos de l&apos;établissement.</p>
      </PageHeader>

      <div className="container-site">
        <ul className="space-y-10 pb-10">
          {specialties.map((s, i) => {
            const t = TONES[i % TONES.length];
            return (
              <li
                key={s.title}
                className={`stack-card hard grid items-center gap-8 rounded-[2rem] border-[3px] border-ink p-6 md:grid-cols-2 md:gap-12 md:p-10 ${t.card}`}
                style={{ "--stack-top": `${5.5 + i * 1.4}rem` } as CSSProperties}
              >
                <Visual scene={s.scene} file={s.file} alt={`Illustration : ${s.title}`} className={`rounded-2xl border-[3px] border-ink ${i % 2 ? "md:order-2" : ""}`} />
                <div className="min-w-0">
                  <p className={`inline-block rounded-full border-[2.5px] border-ink px-3 py-1 text-xs font-extrabold uppercase tracking-widest ${t.chip}`}>
                    Spécialité {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-4 text-4xl [overflow-wrap:anywhere] lg:text-5xl xl:text-6xl">{s.title}</h2>
                  <p className="mt-4">
                    <FactBadge status={s.status} source={s.source} />
                  </p>
                  <p className="mt-5 text-lg">{s.description}</p>
                  {s.source ? <p className="mt-4 text-sm font-semibold">Source : {s.source}</p> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="container-site mt-16">
        <div className="card flex flex-col items-start justify-between gap-6 bg-surface p-6 md:flex-row md:items-center md:p-10">
          <p className="font-display text-3xl md:text-4xl">Envie d&apos;y goûter ?</p>
          <Link href={site.primaryCta.href} className="btn btn-primary">
            {site.primaryCta.label}
          </Link>
        </div>
      </div>
    </>
  );
}
