import type { MenuCategory } from "./types";

/**
 * MENU — modifiez ce fichier pour mettre la carte à jour.
 * - `price`: montant en FCFA (nombre) ou `null` tant que le prix n'est pas communiqué.
 * - `status`: "demo" pour un plat d'exemple, "public" s'il est cité par une source publique,
 *   "confirme" une fois validé par le restaurant.
 * Aucun prix n'est inventé : tous les prix sont à `null`.
 */
const BAAB = "Spécialité citée par l'annuaire baab.ci (consulté le 19/10/2026)";

export const menu: MenuCategory[] = [
  {
    id: "soupes",
    name: "Soupes",
    intro: "Le cœur de la maison.",
    items: [
      { name: "Soupe bassamoise", description: `${BAAB}. Recette et accompagnement à décrire par le restaurant.`, price: null, tags: ["Spécialité"], status: "public" },
      { name: "Soupe du pêcheur", description: "Poissons de la côte, piment et légumes (exemple).", price: null, status: "demo" },
    ],
  },
  {
    id: "fruits-de-mer",
    name: "Fruits de mer",
    intro: "Selon l'arrivage du jour.",
    items: [
      { name: "Plateau de fruits de mer", description: "À partager, composition selon l'arrivage (exemple).", price: null, tags: ["À partager"], status: "demo" },
      { name: "Crevettes sautées à l'ail", description: "Crevettes, ail, persil, citron vert (exemple).", price: null, status: "demo" },
      { name: "Crabe en sauce", description: "Sauce tomate pimentée, riz blanc (exemple).", price: null, status: "demo" },
    ],
  },
  {
    id: "grillades",
    name: "Grillades",
    intro: "Cuisson à la braise.",
    items: [
      { name: "Poisson braisé", description: "Capitaine ou carpe selon arrivage, sauce oignon-tomate (exemple).", price: null, tags: ["Spécialité"], status: "demo" },
      { name: "Poulet braisé", description: "Mariné aux épices (exemple).", price: null, status: "demo" },
      { name: "Brochettes mixtes", description: "Bœuf et poisson (exemple).", price: null, status: "demo" },
    ],
  },
  {
    id: "accompagnements",
    name: "Accompagnements",
    intro: "Pour compléter l'assiette.",
    items: [
      { name: "Attiéké", description: "Semoule de manioc.", price: null, status: "demo" },
      { name: "Alloco", description: "Bananes plantain frites.", price: null, status: "demo" },
      { name: "Riz blanc", description: "Nature.", price: null, status: "demo" },
    ],
  },
  {
    id: "boissons",
    name: "Boissons",
    intro: "Fraîches et maison.",
    items: [
      { name: "Bissap", description: "Infusion d'hibiscus glacée.", price: null, tags: ["Sans alcool"], status: "demo" },
      { name: "Gnamakoudji", description: "Jus de gingembre.", price: null, tags: ["Sans alcool"], status: "demo" },
      { name: "Boissons fraîches", description: "Sodas, eaux, bières (selon la carte du restaurant).", price: null, status: "demo" },
    ],
  },
];
