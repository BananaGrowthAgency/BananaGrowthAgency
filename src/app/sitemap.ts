import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { OUTILS } from "@/lib/outils";
import { SECTEURS, cheminSecteur } from "@/lib/secteurs";
import { GUIDES, toutesLesPlateformes } from "@/lib/tracking";

/**
 * sitemap.xml — les pages indexables du site.
 *
 * /remerciements en est volontairement absente : elle est en noindex.
 *
 * `lastModified` est la date du dernier changement de contenu, par section.
 * Ce n'est plus la date du build : avec 60 pages datées du même jour à chaque
 * déploiement, Google finit par ignorer le signal. À mettre à jour à la main
 * quand le contenu d'une section change vraiment.
 */
const MAJ = {
  accueil: "2026-10-29",
  parc: "2026-10-29",
  secteurs: "2026-10-29",
  outils: "2026-10-29",
  taggage: "2026-10-29",
  legal: "2026-06-15",
} as const;

const PAGES: Array<{
  chemin: string;
  maj: string;
  priorite: number;
  frequence: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { chemin: "/", maj: MAJ.accueil, priorite: 1, frequence: "monthly" },
  { chemin: "/accompagnement-marketing-digital-parc-de-loisir", maj: MAJ.parc, priorite: 0.9, frequence: "monthly" },
  // Une page par secteur du loisir expérientiel.
  ...SECTEURS.map((s) => ({
    chemin: cheminSecteur(s.slug),
    maj: MAJ.secteurs,
    priorite: 0.8,
    frequence: "monthly" as const,
  })),
  { chemin: "/logiciel-gestion-parc-de-loisirs", maj: MAJ.outils, priorite: 0.8, frequence: "monthly" },
  { chemin: "/plan-de-taggage-parc-de-loisirs", maj: MAJ.taggage, priorite: 0.8, frequence: "monthly" },
  // Les fiches outils évoluent au fil des réponses des éditeurs.
  ...OUTILS.map((o) => ({
    chemin: `/logiciel-gestion-parc-de-loisirs/${o.slug}`,
    maj: MAJ.outils,
    priorite: 0.7,
    frequence: "monthly" as const,
  })),
  // Plans de taggage : une page pilier par outil couvert.
  ...GUIDES.map((g) => ({
    chemin: `/plan-de-taggage-parc-de-loisirs/${g.slug}`,
    maj: MAJ.taggage,
    priorite: 0.7,
    frequence: "monthly" as const,
  })),
  // Puis une page par plateforme publicitaire.
  ...toutesLesPlateformes().map(({ slug, plateforme }) => ({
    chemin: `/plan-de-taggage-parc-de-loisirs/${slug}/${plateforme}`,
    maj: MAJ.taggage,
    priorite: 0.6,
    frequence: "monthly" as const,
  })),
  { chemin: "/mentions-legales", maj: MAJ.legal, priorite: 0.3, frequence: "yearly" },
  { chemin: "/politique-de-confidentialite", maj: MAJ.legal, priorite: 0.3, frequence: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ chemin, maj, priorite, frequence }) => ({
    url: chemin === "/" ? SITE_URL : `${SITE_URL}${chemin}`,
    lastModified: maj,
    changeFrequency: frequence,
    priority: priorite,
  }));
}
