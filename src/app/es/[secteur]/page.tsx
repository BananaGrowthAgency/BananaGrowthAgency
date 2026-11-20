import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { SECTEUR_PREFIXE } from "@/lib/secteurs";
import {
  SECTEURS_ES,
  faqAgenceEs,
  getSecteurEs,
  secteursParFamilleEs,
} from "@/lib/es/secteurs";
import { getOutilEs } from "@/lib/es/outils";
import { SLUG_SECTEUR_ES } from "@/lib/i18n";
import { SecteurPage } from "@/components/landing/secteur-page";

/**
 * Pages « agencia-marketing-digital-<sector> », version espagnole des pages
 * « accompagnement-marketing-digital-<secteur> ».
 *
 * Même principe que la route française : la route prend tout le segment,
 * seuls les slugs connus sont générés, le reste renvoie un 404. La page
 * statique /es/agencia-marketing-digital-parque-de-ocio reste prioritaire.
 */
const PREFIXE_ES = "agencia-marketing-digital-";

/** Slug espagnol → slug français (clé des données). */
const SLUG_FR = Object.fromEntries(
  Object.entries(SLUG_SECTEUR_ES).map(([fr, es]) => [es, fr]),
);

export function generateStaticParams() {
  return SECTEURS_ES.filter((s) => SLUG_SECTEUR_ES[s.slug]).map((s) => ({
    secteur: `${PREFIXE_ES}${SLUG_SECTEUR_ES[s.slug]}`,
  }));
}

export const dynamicParams = false;

function secteurDepuisSegment(segment: string) {
  if (!segment.startsWith(PREFIXE_ES)) return undefined;
  const slugFr = SLUG_FR[segment.slice(PREFIXE_ES.length)];
  return slugFr ? getSecteurEs(slugFr) : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ secteur: string }>;
}) {
  const { secteur } = await params;
  const s = secteurDepuisSegment(secteur);
  if (!s) return {};

  return pageMetadata({
    title: s.titre ?? `Marketing digital para ${s.pour}`,
    description: s.metaDescription,
    path: `/${SECTEUR_PREFIXE}${s.slug}`,
    locale: "es",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ secteur: string }>;
}) {
  const { secteur } = await params;
  const s = secteurDepuisSegment(secteur);
  if (!s) notFound();

  return (
    <SecteurPage
      locale="es"
      secteur={s}
      // FAQ agencia primero, luego la FAQ del sector.
      faq={[...faqAgenceEs(s), ...s.faq]}
      outils={(s.outils ?? []).map(getOutilEs).filter((o) => o !== undefined)}
      familles={secteursParFamilleEs()}
    />
  );
}
