import type { GuideOutil, Plateforme } from "./types";
import { QWEEKLE } from "./qweekle";
import { APEX_TIMING } from "./apex-timing";
import { ROLLER } from "./roller";
import { BMI_LEISURE } from "./bmi-leisure";

export type { GuideOutil, Plateforme, Balise, Variable, Declencheur } from "./types";

export const GUIDES: GuideOutil[] = [QWEEKLE, APEX_TIMING, ROLLER, BMI_LEISURE];

export function getGuide(slug: string): GuideOutil | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function aUnGuide(slug: string): boolean {
  return GUIDES.some((g) => g.slug === slug);
}

export function getPlateforme(
  slugOutil: string,
  slugPlateforme: string,
): { guide: GuideOutil; plateforme: Plateforme } | undefined {
  const guide = getGuide(slugOutil);
  const plateforme = guide?.plateformes.find((p) => p.slug === slugPlateforme);
  return guide && plateforme ? { guide, plateforme } : undefined;
}

/** Toutes les combinaisons outil × plateforme, pour la génération statique. */
export function toutesLesPlateformes(): { slug: string; plateforme: string }[] {
  return GUIDES.flatMap((g) =>
    g.plateformes.map((p) => ({ slug: g.slug, plateforme: p.slug })),
  );
}
