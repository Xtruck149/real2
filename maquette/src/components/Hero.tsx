import Link from "next/link";
import { FactText } from "./FactBadge";
import { HeroPoster, ICONS, Icon } from "./Illustrations";
import { copy, site } from "@/content/site";

/**
 * Poster hero: the title is set as four painted lines in three colours, next to an illustrated poster.
 * The lines keep the sentence readable as one heading (see the sr-only text of the h1).
 */
export function Hero() {
  const [l1, l2, l3, l4] = copy.heroLines;
  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip">
      <div className="container-site grid items-center gap-10 pb-8 pt-10 md:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <p className="eyebrow">{copy.heroEyebrow}</p>
          <h1 id="hero-title" className="mt-6 text-[2.9rem] leading-[0.98] sm:text-7xl lg:text-[5.4rem]">
            <span className="sr-only">{copy.heroTitle}</span>
            <span aria-hidden="true" className="block text-ink">{l1}</span>
            <span aria-hidden="true" className="block text-coral">{l2}</span>
            <span aria-hidden="true" className="block text-lagoon">{l3}</span>
            <span aria-hidden="true" className="inline-block -rotate-1 bg-sun px-3 text-ink">{l4}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">{copy.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={site.primaryCta.href} className="btn btn-primary">
              {site.primaryCta.label}
            </Link>
            <Link href="/menu" className="btn btn-ghost">
              Voir l&apos;ardoise
            </Link>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <Icon d={ICONS.pin} className="h-4 w-4 shrink-0 text-coral" />
            <FactText fact={site.contact.address} />
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="hard sticker-tilt-r overflow-hidden rounded-[2rem] border-[3px] border-ink">
            <HeroPoster className="block h-auto w-full" />
          </div>
          <p aria-hidden="true" className="hard-sm absolute -bottom-5 -left-3 rotate-[-6deg] rounded-full border-[2.5px] border-ink bg-coral px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-white sm:-left-6">
            Illustration
          </p>
          <p aria-hidden="true" className="hard-sm absolute -right-2 -top-4 rotate-6 rounded-xl border-[2.5px] border-ink bg-surface px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-ink sm:-right-5">
            Angré · Abidjan
          </p>
        </div>
      </div>
    </section>
  );
}
