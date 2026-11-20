import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { getPlateformeEs, toutesLesPlateformesEs } from "@/lib/es/tracking";
import { TrackingPlateforme } from "@/components/landing/tracking-plateforme";

export function generateStaticParams() {
  return toutesLesPlateformesEs();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; plateforme: string }>;
}) {
  const { slug, plateforme } = await params;
  const trouve = getPlateformeEs(slug, plateforme);
  if (!trouve) return {};

  return pageMetadata({
    title: trouve.plateforme.titre,
    description: trouve.plateforme.description,
    path: `/plan-de-taggage-parc-de-loisirs/${slug}/${plateforme}`,
    locale: "es",
  });
}

export default async function TrackingPlateformePageEs({
  params,
}: {
  params: Promise<{ slug: string; plateforme: string }>;
}) {
  const { slug, plateforme } = await params;
  const trouve = getPlateformeEs(slug, plateforme);
  if (!trouve) notFound();

  return (
    <TrackingPlateforme
      locale="es"
      guide={trouve.guide}
      plateforme={trouve.plateforme}
    />
  );
}
