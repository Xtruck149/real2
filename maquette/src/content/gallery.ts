import type { EventFormat, GalleryImage, Specialty } from "./types";

/**
 * Visuels de démonstration générés (aucune photo du restaurant n'est utilisée).
 * Remplacez les fichiers de /public/images par les photos fournies et autorisées,
 * puis lancez `python3 scripts/images.py manifest public/images src/content/images.generated.json`.
 */
export const gallery: GalleryImage[] = [
  { file: "plat-1.webp", alt: "Visuel de démonstration d'un plat de fruits de mer", caption: "Fruits de mer (visuel de démonstration)", category: "plats" },
  { file: "ambiance-1.webp", alt: "Visuel de démonstration d'une salle de restaurant", caption: "La salle (visuel de démonstration)", category: "ambiance" },
  { file: "plat-2.webp", alt: "Visuel de démonstration d'un poisson braisé", caption: "Grillades (visuel de démonstration)", category: "plats" },
  { file: "evenement-1.webp", alt: "Visuel de démonstration d'une table de fête", caption: "Repas de famille (visuel de démonstration)", category: "evenements" },
  { file: "plat-3.webp", alt: "Visuel de démonstration d'une soupe", caption: "Soupe (visuel de démonstration)", category: "plats" },
  { file: "ambiance-2.webp", alt: "Visuel de démonstration d'une terrasse", caption: "Terrasse (visuel de démonstration)", category: "ambiance" },
  { file: "plat-4.webp", alt: "Visuel de démonstration d'accompagnements", caption: "Accompagnements (visuel de démonstration)", category: "plats" },
  { file: "evenement-2.webp", alt: "Visuel de démonstration d'un repas d'entreprise", caption: "Repas d'entreprise (visuel de démonstration)", category: "evenements" },
];

export const heroImage = { file: "hero.webp", alt: "Visuel de démonstration d'une assiette de fruits de mer" };

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
    image: "specialite-soupe.webp",
    status: "public",
    source: BAAB,
  },
  {
    title: "Fruits de mer",
    description:
      "Deuxième spécialité citée. Les plats proposés, leur disponibilité selon l'arrivage et leurs prix seront précisés par le restaurant.",
    image: "specialite-fruits-de-mer.webp",
    status: "public",
    source: BAAB,
  },
  {
    title: "Grillades",
    description:
      "Troisième spécialité citée. Poissons et viandes à la braise : la sélection réelle et les accompagnements seront confirmés avec l'équipe.",
    image: "specialite-grillades.webp",
    status: "public",
    source: BAAB,
  },
];
