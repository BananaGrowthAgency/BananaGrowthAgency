import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { GUIDES, getGuide } from "@/lib/tracking";
import { TrackingGuide } from "@/components/landing/tracking-guide";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return pageMetadata({
    title: `${guide.pilier.titre} | Banana Growth Agency`,
    description: `Couche de données, plan de taggage et ordre de déploiement pour suivre ses conversions Google Analytics, Google Ads, Meta et TikTok depuis un tunnel ${guide.nom}. D'après des installations en production.`,
    path: `/outils-parc-de-loisirs/${guide.slug}/tracking`,
  });
}

export default async function TrackingPilierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return <TrackingGuide guide={guide} />;
}
