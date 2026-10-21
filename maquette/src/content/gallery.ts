import type { EventFormat, GalleryImage, Specialty } from "./types";

/**
 * Visuels : des illustrations dessinées pour Chez Thia (components/Illustrations.tsx), jamais des photos du restaurant.
 * Quand le restaurant fournit des photos autorisées, déposez-les dans /public/images, régénérez le manifeste
 * (`python scripts/images.py manifest public/images src/content/images.generated.json`) puis ajoutez `file: "nom.webp"`
 * à l'élément concerné : la photo remplace alors l'illustration.
 */
export const gallery: GalleryImage[] = [
  { scene: "fruits-de-mer", alt: "Illustration d'un crabe et d'une crevette sur des vagues", caption: "Fruits de mer", category: "plats" },
  { scene: "salle", alt: "Illustration d'une salle de restaurant avec une table dressée", caption: "La salle", category: "ambiance" },
  { scene: "grillades", alt: "Illustration d'un poisson sur les flammes", caption: "Grillades", category: "plats" },
  { scene: "famille", alt: "Illustration d'une table de famille avec des ballons", caption: "Repas de famille", category: "evenements" },
  { scene: "soupe", alt: "Illustration d'un bol de soupe fumante", caption: "Soupe", category: "plats" },
  { scene: "terrasse", alt: "Illustration d'une terrasse avec un parasol", caption: "Terrasse", category: "ambiance" },
  { scene: "accompagnements", alt: "Illustration d'alloco et d'attiéké", caption: "Accompagnements", category: "plats" },
  { scene: "entreprise", alt: "Illustration d'un repas d'équipe autour d'une table", caption: "Repas d'entreprise", category: "evenements" },
];

export const eventFormats: EventFormat[] = [
  { title: "Anniversaires", description: "Une table réservée et un menu à partager.", capacity: { value: "Capacité à confirmer", status: "demo" }, status: "demo" },
  { title: "Repas d'entreprise", description: "Déjeuners d'équipe ou avec des partenaires.", capacity: { value: "Capacité à confirmer", status: "demo" }, status: "demo" },
  { title: "Fêtes de famille", description: "Baptêmes, retrouvailles, célébrations.", capacity: { value: "Capacité à confirmer", status: "demo" }, status: "demo" },
];

const BAAB = "Annuaire baab.ci, fiche « Chez Thia » (consultée le 19/10/2026)";

export const specialties: Specialty[] = [
  {
    title: "Soupe bassamoise",
    description:
      "Spécialité mise en avant dans la fiche publique du restaurant. Le texte définitif (poissons utilisés, assaisonnement, histoire de la recette) sera rédigé avec Chez Thia.",
    scene: "soupe",
    status: "public",
    source: BAAB,
  },
  {
    title: "Fruits de mer",
    description:
      "Deuxième spécialité citée. Les plats proposés, leur disponibilité selon l'arrivage et leurs prix seront précisés par le restaurant.",
    scene: "fruits-de-mer",
    status: "public",
    source: BAAB,
  },
  {
    title: "Grillades",
    description:
      "Troisième spécialité citée. Poissons et viandes à la braise : la sélection réelle et les accompagnements seront confirmés avec l'équipe.",
    scene: "grillades",
    status: "public",
    source: BAAB,
  },
];
