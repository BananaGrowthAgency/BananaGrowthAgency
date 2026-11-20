import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { hreflang, lien } from "@/lib/i18n";
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

/** Version espagnole publiée le 20/11/2026 : sa date de mise à jour propre. */
const MAJ_ES = "2026-11-20";

const absolue = (chemin: string) => (chemin === "/" ? SITE_URL : `${SITE_URL}${chemin}`);

/**
 * Chaque page française a sa jumelle espagnole sous /es. Les deux entrées
 * portent les hreflang croisés, en plus de ceux posés dans le <head>.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ chemin, maj, priorite, frequence }) => {
    const langues = Object.fromEntries(
      Object.entries(hreflang(chemin))
        .filter(([l]) => l !== "x-default")
        .map(([l, c]) => [l, absolue(c)]),
    );
    const alternates = Object.keys(langues).length ? { languages: langues } : undefined;
    const fr = {
      url: absolue(chemin),
      lastModified: maj,
      changeFrequency: frequence,
      priority: priorite,
      alternates,
    };
    const cheminEs = lien("es", chemin);
    if (cheminEs === chemin) return [fr];
    return [
      fr,
      {
        url: absolue(cheminEs),
        lastModified: maj > MAJ_ES ? maj : MAJ_ES,
        changeFrequency: frequence,
        priority: priorite,
        alternates,
      },
    ];
  });
}
