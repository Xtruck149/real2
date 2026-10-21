import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { gallery } from "@/content/gallery";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Galerie", `Plats, ambiance et événements de ${site.name} en images.`, "/galerie");

export default function GaleriePage() {
  return (
    <>
      <PageHeader eyebrow="Galerie" title="Plats, ambiance, fêtes">
        <p>
          Les visuels ci-dessous sont des <strong>illustrations dessinées pour la démonstration</strong>, pas des photos du restaurant.
          Elles seront remplacées par des photographies fournies ou autorisées par l&apos;établissement.
        </p>
      </PageHeader>
      <div className="container-site pb-6">
        <Gallery images={gallery} />
      </div>
    </>
  );
}
