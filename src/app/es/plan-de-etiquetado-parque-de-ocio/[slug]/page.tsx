import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { GUIDES_ES, getGuideEs } from "@/lib/es/tracking";
import { TrackingGuide } from "@/components/landing/tracking-guide";

export function generateStaticParams() {
  return GUIDES_ES.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideEs(slug);
  if (!guide) return {};

  return pageMetadata({
    title: guide.pilier.titre,
    description: guide.pilier.description,
    path: `/plan-de-taggage-parc-de-loisirs/${guide.slug}`,
    locale: "es",
  });
}

export default async function TrackingPilierPageEs({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideEs(slug);
  if (!guide) notFound();

  return <TrackingGuide guide={guide} locale="es" />;
}
