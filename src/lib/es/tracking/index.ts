/**
 * Guides de plan de taggage en espagnol : même API que src/lib/tracking,
 * suffixée « Es ». Mêmes slugs d'outils et de plateformes qu'en français.
 */
import type { GuideOutil, Plateforme } from "@/lib/tracking";
import { QWEEKLE_ES } from "./qweekle";
import { APEX_TIMING_ES } from "./apex-timing";
import { ROLLER_ES } from "./roller";
import { BMI_LEISURE_ES } from "./bmi-leisure";
import { YURPLAN_ES } from "./yurplan";

export { TAGGAGE_HUB_ES } from "./hub";

export const GUIDES_ES: GuideOutil[] = [
  QWEEKLE_ES,
  APEX_TIMING_ES,
  ROLLER_ES,
  BMI_LEISURE_ES,
  YURPLAN_ES,
];

export function getGuideEs(slug: string): GuideOutil | undefined {
  return GUIDES_ES.find((g) => g.slug === slug);
}

export function aUnGuideEs(slug: string): boolean {
  return GUIDES_ES.some((g) => g.slug === slug);
}

export function getPlateformeEs(
  slugOutil: string,
  slugPlateforme: string,
): { guide: GuideOutil; plateforme: Plateforme } | undefined {
  const guide = getGuideEs(slugOutil);
  const plateforme = guide?.plateformes.find((p) => p.slug === slugPlateforme);
  return guide && plateforme ? { guide, plateforme } : undefined;
}

/** Toutes les combinaisons outil × plateforme, pour la génération statique. */
export function toutesLesPlateformesEs(): { slug: string; plateforme: string }[] {
  return GUIDES_ES.flatMap((g) =>
    g.plateformes.map((p) => ({ slug: g.slug, plateforme: p.slug })),
  );
}
