# Maquette — Chez Thia (Angré, Abidjan)

> **Statut : proposition commerciale indépendante de RealSpill.** Ce site n'a été ni commandé ni validé par
> l'établissement. Il est publié **uniquement comme démonstration** (bandeau sur chaque page, pages non indexées
> par les moteurs de recherche). Tous les contenus non confirmés sont signalés dans l'interface
> (« Démo » ou « Source publique · à confirmer ») et récapitulés sur la page `/maquette`.
>
> **Ce que les formulaires font réellement :** ils valident la saisie, puis l'API répond « démonstration ».
> **Aucune demande n'est transmise au restaurant, aucune réservation n'est enregistrée.** L'écran de succès le dit
> explicitement et la référence affichée commence par `DEMO-`.

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil : présentation, spécialités, aperçu du menu, événements, galerie, infos pratiques |
| `/menu` | Menu par catégories (soupes, fruits de mer, grillades…), navigation rapide par ancres |
| `/specialites` | Page dédiée aux trois spécialités citées publiquement |
| `/galerie` | Galerie filtrable avec visionneuse accessible (clavier, flèches, Échap) |
| `/reservation` | Réservation de table **et** demande d'événement sur la même page |
| `/contact` | Adresse, horaires, itinéraire Google Maps, réseaux sociaux (après vérification) |
| `/maquette` | Transparence : statut de chaque information et sources consultées |
| `/api/demandes` | Réception des formulaires (validation serveur, aucune donnée stockée) |

## Installation et lancement

Prérequis : Node.js 20.9 ou plus récent.

```bash
npm install
npm run dev          # développement : http://localhost:3000
npm run build        # build de production (vérifie aussi les types TypeScript)
npm run start        # sert le build : http://localhost:3000
```

Variables d'environnement (facultatives) : copier `.env.example` en `.env.local`.

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp (chiffres, format international). Vide = bouton de démonstration |
| `NEXT_PUBLIC_SITE_URL` | URL publique définitive (métadonnées, sitemap, JSON-LD). Sur Vercel, à défaut, le domaine de production attribué par la plateforme est utilisé ; aucune URL n'est devinée |
| `NEXT_PUBLIC_SITE_MODE` | `demo` (défaut : bandeau + `noindex`) ou `production` |
| `RATE_LIMIT_PER_MINUTE` | Demandes par minute et par IP sur `/api/demandes` (défaut 8) |

## Vérification automatique

```bash
npm run build && RATE_LIMIT_PER_MINUTE=1000 npm run start   # terminal 1 (limite relevée pour les tests)
npm run verify                          # terminal 2 (BASE_URL=http://localhost:3000 par défaut)
```

Le script `scripts/verify.mjs` parcourt tous les liens internes et contrôle, sur mobile (360 px),
tablette (768 px) et ordinateur (1280 px) :

- codes HTTP 200 sur toutes les pages, 404 sur une URL inconnue, `sitemap.xml` et `robots.txt` ;
- absence de défilement horizontal, un seul `h1` par page, images avec `alt`, boutons nommés,
  aucune erreur dans la console ;
- menu mobile : ouverture, fermeture avec Échap, fermeture après navigation ;
- chaque formulaire : erreurs à l'envoi vide (avec focus sur le récapitulatif), état de chargement,
  message de succès, message d'erreur si le serveur ne répond pas ;
- API : refus des données invalides (422), des types inconnus, des corps JSON invalides ou inattendus (400),
  des requêtes d'une autre origine (403) et des corps trop volumineux (413) ; champ piège ignoré en silence ;
  réponses jamais mises en cache ; une demande valide est reconnue comme démonstration ;
- transparence en démonstration : le message de succès n'affirme jamais qu'une demande est partie,
  l'avertissement est visible avant l'envoi, aucun lien `tel:`, `mailto:` ou WhatsApp tant que rien n'est confirmé ;
- référencement : `noindex` sur chaque page, `robots.txt` fermé, JSON-LD sans téléphone, e-mail, horaires,
  adresse, image ni réseaux non confirmés, `sitemap.xml` présent ;
- sécurité : en-têtes (`nosniff`, `referrer-policy`, `permissions-policy`), `X-Powered-By` masqué, aucun secret
  dans le HTML publié ;
- aucun contenu resté masqué après défilement (apparitions progressives) ;
- bouton WhatsApp en mode démo (fenêtre d'information, aucun vrai numéro).

Captures d'écran et `rapport.json` dans `verify-output/`. Navigateur : celui de Playwright, ou
`CHROMIUM_PATH=/chemin/vers/chromium npm run verify`.

## Mettre à jour les contenus

Tout le contenu éditable est dans `src/content/` ; aucun composant à modifier.

| Fichier | Contenu |
|---|---|
| `site.ts` | Nom, coordonnées, horaires, réseaux sociaux, navigation, textes d'accueil |
| `menu.ts` | Carte : catégories, plats, prix (`null` = « Prix à confirmer ») |
| `gallery.ts` | Galerie, formules d'événements, spécialités |

Chaque information porte un statut : `"demo"`, `"public"` (avec sa source) ou `"confirme"`.
Seules les informations `"confirme"` deviennent cliquables (téléphone) et apparaissent dans les
données structurées (JSON-LD) lues par Google.

**Photos** : déposer les fichiers autorisés dans `public/images/` (WebP ou JPEG), puis régénérer le
manifeste (dimensions + aperçu flou) :

```bash
python3 scripts/images.py manifest public/images src/content/images.generated.json
```

Next.js sert ensuite automatiquement des versions AVIF/WebP redimensionnées selon l'écran.

## Architecture technique

- **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4.** Toutes les pages sont générées
  statiquement : chargement rapide, hébergement simple.
- **JavaScript client limité** à ce qui en a besoin : menu mobile, formulaires, galerie, bouton WhatsApp.
- **Formulaires** : un même schéma `zod` (`src/lib/forms.ts`) valide côté navigateur et côté serveur ;
  champ piège anti-robots ; limitation de débit simple ; aucune donnée personnelle dans les journaux.
  Le texte de succès suit la réponse du serveur (`mode: "demo"`), jamais l'inverse.
- **API `/api/demandes`** : même origine uniquement, corps limité à 8 Ko, JSON objet uniquement, limitation de débit
  par IP. Cette limitation vit en mémoire : sur un hébergement sans serveur elle est **par instance**, elle freine
  les abus ordinaires mais n'est pas une garantie ; une vraie intégration doit ajouter un stockage partagé ou le
  pare-feu de la plateforme.
- **Identité visuelle « côte de Bassam »** : bleu pétrole, sable et terracotta ; vagues de séparation, bandeau défilant
  des trois spécialités citées par la source publique, cadre du héros qui se balance doucement. Composants propres au
  projet : `Appear` (apparition au défilement), `Wave`, `Ribbon`. Les apparitions ne masquent jamais le contenu
  (visible sans JavaScript, avec mouvement réduit, à l'impression, ou si l'observateur ne répond pas).
- **Accessibilité** : lien d'évitement, repères ARIA, focus visible, erreurs reliées aux champs
  (`aria-invalid`, `aria-describedby`), cibles tactiles ≥ 44 px, mouvement réduit respecté.
- **Référencement local** : métadonnées par page, Open Graph `fr_CI`, URL canoniques, `sitemap.xml`,
  JSON-LD `Restaurant` limité aux informations confirmées. En mode démo : `noindex` et `robots.txt` fermé,
  pour que la maquette ne soit jamais prise pour le site officiel.
- **Carte** : pas d'iframe Google Maps (poids, cookies) ; lien d'itinéraire à la demande.
- **Aucun service externe ni compte payant.**

## Brancher les formulaires (après accord de l'établissement)

`src/app/api/demandes/route.ts` valide les demandes puis répond sans rien transmettre. Pour la mise
en production, ajouter à l'endroit indiqué l'un de ces envois, avec les comptes de l'établissement :

- e-mail transactionnel (Resend, Brevo…) vers l'adresse du restaurant ;
- ajout d'une ligne dans un tableur partagé (Google Sheets) ;
- notification WhatsApp Business (API officielle Meta, compte vérifié requis).

Prévoir alors une mention d'information sur les données personnelles (loi ivoirienne n° 2013-450,
autorité de contrôle : ARTCI) et une durée de conservation.

## Déployer la démonstration (Vercel)

Le dossier à déployer est `maquette/` (le site n'est pas à la racine du dépôt). Aucune variable d'environnement n'est
nécessaire : le site démarre en mode démonstration.

```bash
cd maquette
npx vercel login
npx vercel deploy --prod
```

Le plan gratuit (Hobby) de Vercel est réservé à un usage non commercial : pour présenter la démonstration à un
prospect, vérifier les conditions du plan ou prendre un plan adapté. Ne jamais commiter `.vercel/` ni un fichier `.env*`
contenant des identifiants.

## Mise en production (après validation)

1. Remplir `INFOS-A-OBTENIR.md` avec l'établissement et passer les informations en `"confirme"`.
2. Remplacer les visuels par des photos autorisées, compléter la carte et les prix.
3. Brancher l'envoi des formulaires.
4. Définir `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` et `NEXT_PUBLIC_SITE_MODE=production`.
5. `npm run build && npm run verify`, puis déployer (Vercel, Netlify ou serveur Node).
