import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { SECTEURS, SECTEUR_PREFIXE, getSecteur } from "@/lib/secteurs";
import { SecteurPage } from "@/components/landing/secteur-page";

/**
 * Pages « accompagnement-marketing-digital-<secteur> ».
 *
 * Next ne sait pas matcher un préfixe à l'intérieur d'un segment : la route
 * prend donc tout le segment racine, et seuls les slugs connus sont générés.
 * `dynamicParams = false` renvoie un 404 pour tout le reste. Les routes
 * statiques (dont la landing parc de loisir) restent prioritaires.
 */
export function generateStaticParams() {
  return SECTEURS.map((s) => ({ secteur: `${SECTEUR_PREFIXE}${s.slug}` }));
}

export const dynamicParams = false;

function secteurDepuisSegment(segment: string) {
  if (!segment.startsWith(SECTEUR_PREFIXE)) return undefined;
  return getSecteur(segment.slice(SECTEUR_PREFIXE.length));
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
    title: s.titre ?? `Marketing digital pour ${s.pour}`,
    description: s.metaDescription,
    path: `/${secteur}`,
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

  return <SecteurPage secteur={s} />;
}
