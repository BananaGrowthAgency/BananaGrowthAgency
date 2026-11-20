import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { hreflang, lien, type Locale } from "@/lib/i18n";

/** Suffixe de marque des titres. Google affiche déjà le nom du site au-dessus
 *  du titre : on garde la forme courte, et seulement quand elle tient. */
const SUFFIXE_TITRE = " | Banana Growth";
const TITRE_MAX = 62;

/**
 * Titre complet envoyé à Google : le titre de la page, suivi de la marque si
 * l'ensemble tient dans ~62 caractères (au-delà, Google coupe). Un titre long
 * reste donc entier plutôt que de voir sa fin remplacée par « … ».
 */
export function titrePage(base: string): string {
  const complet = `${base}${SUFFIXE_TITRE}`;
  return complet.length <= TITRE_MAX ? complet : base;
}

/**
 * Fabrique les métadonnées d'une page.
 *
 * Le `metadata` du layout racine sert de socle, mais Next ne fusionne pas
 * `openGraph` : une page qui redéfinit `title` sans redéfinir `openGraph`
 * hérite du titre Open Graph de la racine et se partage donc sous le mauvais
 * libellé. Ce helper redéfinit les deux ensemble, et pose le `canonical` que
 * les pages existantes n'ont pas.
 *
 * `title` est le titre complet envoyé à Google : on met le mot-clé devant et
 * la marque en suffixe, pas l'inverse.
 */
export function pageMetadata({
  title,
  description,
  path,
  locale = "fr",
}: {
  title: string;
  description: string;
  /**
   * Chemin FRANÇAIS de la page, ex. « /logiciel-gestion-parc-de-loisirs ».
   * En espagnol, le chemin /es correspondant est déduit, et les deux
   * versions sont déclarées en hreflang.
   */
  path: string;
  locale?: Locale;
}): Metadata {
  const chemin = lien(locale, path);
  const url = chemin === "/" ? SITE_URL : `${SITE_URL}${chemin}`;
  title = titrePage(title);

  return {
    title,
    description,
    alternates: { canonical: url, languages: hreflang(path) },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: locale === "es" ? "es_ES" : "fr_FR",
      siteName: "Banana Growth Agency",
    },
  };
}
