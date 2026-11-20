/**
 * Français / espagnol.
 *
 * Le site français reste à la racine, sans préfixe. Toutes les pages
 * espagnoles vivent sous /es, avec des slugs espagnols. Ce module fait la
 * correspondance dans les deux sens : bouton de langue, hreflang, liens
 * internes des composants partagés.
 *
 * Il est importé par la barre de navigation (composant client) : il doit
 * rester léger — des chemins, pas de contenu.
 */

export type Locale = "fr" | "es";

export const ES = "/es";

/** Slug espagnol de chaque page secteur, indexé par le slug français. */
export const SLUG_SECTEUR_ES: Record<string, string> = {
  karting: "karting",
  "escape-game": "escape-room",
  "laser-game": "laser-tag",
  "trampoline-park": "parque-de-trampolines",
  bowling: "bolera",
  "parc-indoor-enfants": "parque-infantil-indoor",
  "salle-escalade": "rocodromo",
  "realite-virtuelle": "realidad-virtual",
  karaoke: "karaoke",
  "lancer-de-hache": "lanzamiento-de-hachas",
  "salle-arcade": "salon-recreativo",
  "jeux-aventure-indoor": "juegos-de-aventura-indoor",
  patinoire: "pista-de-hielo",
  paintball: "paintball",
  "mini-golf": "minigolf",
  "parc-attractions": "parque-de-atracciones",
  "parc-aquatique": "parque-acuatico",
  "zoo-parc-animalier": "zoo-parque-de-animales",
  "sports-aventure": "deportes-de-aventura",
  "quad-buggy": "quad-buggy",
  "activites-nautiques": "actividades-nauticas",
  "base-de-loisirs": "centro-de-ocio-al-aire-libre",
  camping: "camping",
  "hebergement-insolite": "alojamiento-singular",
  spa: "spa",
  tourisme: "turismo",
  "love-room": "love-room",
};

/** Pages fixes : chemin français → chemin espagnol. */
const FIXES: Record<string, string> = {
  "/": ES,
  "/accompagnement-marketing-digital-parc-de-loisir": `${ES}/agencia-marketing-digital-parque-de-ocio`,
  "/logiciel-gestion-parc-de-loisirs": `${ES}/software-gestion-parque-de-ocio`,
  "/plan-de-taggage-parc-de-loisirs": `${ES}/plan-de-etiquetado-parque-de-ocio`,
  "/mentions-legales": `${ES}/aviso-legal`,
  "/politique-de-confidentialite": `${ES}/politica-de-privacidad`,
  "/rendez-vous": `${ES}/cita`,
  "/rendez-vous/audit-offert-parc-de-loisir": `${ES}/cita/auditoria-gratuita-parque-de-ocio`,
  "/rendez-vous/confirme": `${ES}/cita/confirmada`,
  "/remerciements": `${ES}/gracias`,
  "/remerciements/rendez-vous": `${ES}/gracias/cita`,
};

/** Préfixes dont la suite du chemin (slug d'outil, de plateforme) ne change pas. */
const PREFIXES: [string, string][] = [
  ["/logiciel-gestion-parc-de-loisirs/", `${ES}/software-gestion-parque-de-ocio/`],
  ["/plan-de-taggage-parc-de-loisirs/", `${ES}/plan-de-etiquetado-parque-de-ocio/`],
];

const SECTEUR_FR = "/accompagnement-marketing-digital-";
const SECTEUR_ES = `${ES}/agencia-marketing-digital-`;

const FIXES_INV = Object.fromEntries(
  Object.entries(FIXES).map(([fr, es]) => [es, fr]),
);
const SLUG_SECTEUR_FR = Object.fromEntries(
  Object.entries(SLUG_SECTEUR_ES).map(([fr, es]) => [es, fr]),
);

export function localeDe(pathname: string): Locale {
  return pathname === ES || pathname.startsWith(`${ES}/`) ? "es" : "fr";
}

/** Sépare « /chemin » de « #ancre » ou « ?requete ». */
function decouper(href: string): [string, string] {
  const i = href.search(/[?#]/);
  return i === -1 ? [href, ""] : [href.slice(0, i), href.slice(i)];
}

/** Chemin français → chemin espagnol. Renvoie undefined s'il n'existe pas. */
function versEs(chemin: string): string | undefined {
  if (FIXES[chemin]) return FIXES[chemin];
  for (const [fr, es] of PREFIXES) {
    if (chemin.startsWith(fr)) return es + chemin.slice(fr.length);
  }
  if (chemin.startsWith(SECTEUR_FR)) {
    const slug = SLUG_SECTEUR_ES[chemin.slice(SECTEUR_FR.length)];
    if (slug) return SECTEUR_ES + slug;
  }
  return undefined;
}

/** Chemin espagnol → chemin français. */
function versFr(chemin: string): string | undefined {
  if (FIXES_INV[chemin]) return FIXES_INV[chemin];
  for (const [fr, es] of PREFIXES) {
    if (chemin.startsWith(es)) return fr + chemin.slice(es.length);
  }
  if (chemin.startsWith(SECTEUR_ES)) {
    const slug = SLUG_SECTEUR_FR[chemin.slice(SECTEUR_ES.length)];
    if (slug) return SECTEUR_FR + slug;
  }
  return undefined;
}

/**
 * Lien interne dans la langue voulue. Les composants partagés écrivent leurs
 * liens en chemin français ; en espagnol, on les traduit. Les liens externes,
 * mailto et ancres seules passent tels quels.
 */
export function lien(locale: Locale, href: string): string {
  if (locale === "fr" || !href.startsWith("/")) return href;
  const [chemin, suite] = decouper(href);
  const es = versEs(chemin);
  return es ? es + suite : href;
}

/** Même page dans l'autre langue (bouton de langue). Accueil si inconnue. */
export function autreLangue(pathname: string): { locale: Locale; href: string } {
  if (localeDe(pathname) === "es") {
    return { locale: "fr", href: versFr(pathname) ?? "/" };
  }
  return { locale: "es", href: versEs(pathname) ?? ES };
}

/**
 * hreflang d'une page, à partir de son chemin français. À passer dans
 * `alternates.languages` des métadonnées des deux versions.
 */
export function hreflang(cheminFr: string): Record<string, string> {
  const es = versEs(cheminFr);
  return es ? { "fr-FR": cheminFr, "es-ES": es, "x-default": cheminFr } : {};
}
