import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { getPlateforme, toutesLesPlateformes } from "@/lib/tracking";
import { TrackingPlateforme } from "@/components/landing/tracking-plateforme";

export function generateStaticParams() {
  return toutesLesPlateformes();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; plateforme: string }>;
}) {
  const { slug, plateforme } = await params;
  const trouve = getPlateforme(slug, plateforme);
  if (!trouve) return {};

  return pageMetadata({
    title: `${trouve.plateforme.titre} | Banana Growth Agency`,
    description: `${trouve.plateforme.chapo.slice(0, 150)}… Variables, déclencheurs, balises nommées et code à copier.`,
    path: `/plan-de-taggage-parc-de-loisirs/${slug}/${plateforme}`,
  });
}

export default async function TrackingPlateformePage({
  params,
}: {
  params: Promise<{ slug: string; plateforme: string }>;
}) {
  const { slug, plateforme } = await params;
  const trouve = getPlateforme(slug, plateforme);
  if (!trouve) notFound();

  return (
    <TrackingPlateforme
      guide={trouve.guide}
      plateforme={trouve.plateforme}
    />
  );
}
