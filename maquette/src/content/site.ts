import type { SiteConfig } from "./types";

const BAAB = "Fiche « Chez Thia » de l'annuaire baab.ci (publiée il y a environ 4 ans), consultée le 19/10/2026";

export const site: SiteConfig = {
  name: "Chez Thia",
  shortName: "CT",
  schemaType: "Restaurant",
  tagline: "Fruits de mer, grillades & soupe bassamoise à Angré",
  description:
    "Maquette de démonstration pour le restaurant Chez Thia à Angré, Abidjan : spécialités, menu, galerie, réservations et événements.",
  locality: "Abidjan",
  district: "Cocody Angré",
  keywords: ["restaurant Angré", "fruits de mer Abidjan", "soupe bassamoise Abidjan", "grillades Angré", "Chez Thia"],
  nav: [
    { href: "/", label: "Accueil" },
    { href: "/menu", label: "Menu" },
    { href: "/specialites", label: "Spécialités" },
    { href: "/galerie", label: "Galerie" },
    { href: "/reservation", label: "Réservations & événements" },
    { href: "/contact", label: "Contact" },
  ],
  primaryCta: { href: "/reservation", label: "Réserver une table" },
  contact: {
    address: { value: "Angré, Cocody, Abidjan (adresse exacte à confirmer)", status: "public", source: BAAB },
    phone: { value: "Numéro à confirmer", status: "demo" },
    email: null,
    whatsapp: null,
    whatsappMessage: "Bonjour, je souhaite réserver une table chez Thia.",
    mapsQuery: "Chez Thia restaurant Angré Abidjan",
    hours: {
      status: "demo",
      source: "Aucune source publique trouvée pour les horaires (recherche du 19/10/2026).",
      rows: [{ days: "Tous les jours", hours: "Horaires à confirmer" }],
    },
  },
  // No official account was found: links are added only after the owner confirms them.
  social: [],
};

export const copy = {
  heroEyebrow: "Restaurant · Angré · Abidjan",
  heroTitle: "La mer, la braise et le goût de Bassam.",
  heroText:
    "Fruits de mer, grillades et soupe bassamoise : une cuisine généreuse à partager à Angré. Consultez le menu, découvrez nos spécialités et réservez votre table en ligne.",
  heroLayout: "split" as "full" | "split",
  introTitle: "Une cuisine de caractère, servie simplement",
  introText:
    "Cette maquette imagine comment Chez Thia pourrait mettre en valeur ses spécialités. Les textes et visuels sont des exemples à remplacer par les contenus fournis par le restaurant.",
  highlights: [
    { title: "Fruits de mer", text: "Selon l'arrivage, à découvrir dans la carte et auprès de l'équipe." },
    { title: "Grillades", text: "Poissons et viandes à la braise, accompagnements ivoiriens." },
    { title: "Soupe bassamoise", text: "Une spécialité de la côte, à faire décrire par le restaurant." },
  ],
  reservationIntro:
    "Réservez une table ou décrivez votre événement (anniversaire, repas d'entreprise, famille). L'équipe vous recontacte pour confirmer : rien n'est définitif avant cette confirmation.",
  reservationIncludesEvents: true,
};
