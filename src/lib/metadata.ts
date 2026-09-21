import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

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
}: {
  title: string;
  description: string;
  /** Chemin absolu depuis la racine, ex. « /outils-parc-de-loisirs ». */
  path: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "fr_FR",
      siteName: "Banana Growth Agency",
    },
  };
}
