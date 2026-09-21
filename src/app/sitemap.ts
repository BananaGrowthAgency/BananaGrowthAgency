import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { OUTILS } from "@/lib/outils";
import { GUIDES, toutesLesPlateformes } from "@/lib/tracking";

/**
 * sitemap.xml — les pages indexables du site.
 *
 * /remerciements en est volontairement absente : elle est en noindex.
 *
 * `lastModified` prend la date du build. Le site est entièrement statique,
 * donc son contenu ne change qu'au déploiement : la date reste juste tant
 * qu'on ne redéploie pas pour des raisons étrangères au contenu.
 */
const PAGES: Array<{
  chemin: string;
  priorite: number;
  frequence: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { chemin: "/", priorite: 1, frequence: "monthly" },
  { chemin: "/accompagnement-marketing-digital-parc-de-loisir", priorite: 0.9, frequence: "monthly" },
  { chemin: "/logiciel-gestion-parc-de-loisirs", priorite: 0.8, frequence: "monthly" },
  { chemin: "/plan-de-taggage-parc-de-loisirs", priorite: 0.8, frequence: "monthly" },
  // Les fiches outils évoluent au fil des réponses des éditeurs.
  ...OUTILS.map((o) => ({
    chemin: `/logiciel-gestion-parc-de-loisirs/${o.slug}`,
    priorite: 0.7,
    frequence: "monthly" as const,
  })),
  // Plans de taggage : une page pilier par outil couvert.
  ...GUIDES.map((g) => ({
    chemin: `/plan-de-taggage-parc-de-loisirs/${g.slug}`,
    priorite: 0.7,
    frequence: "monthly" as const,
  })),
  // Puis une page par plateforme publicitaire.
  ...toutesLesPlateformes().map(({ slug, plateforme }) => ({
    chemin: `/plan-de-taggage-parc-de-loisirs/${slug}/${plateforme}`,
    priorite: 0.6,
    frequence: "monthly" as const,
  })),
  { chemin: "/mentions-legales", priorite: 0.3, frequence: "yearly" },
  { chemin: "/politique-de-confidentialite", priorite: 0.3, frequence: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const construitLe = new Date();

  return PAGES.map(({ chemin, priorite, frequence }) => ({
    url: chemin === "/" ? SITE_URL : `${SITE_URL}${chemin}`,
    lastModified: construitLe,
    changeFrequency: frequence,
    priority: priorite,
  }));
}
