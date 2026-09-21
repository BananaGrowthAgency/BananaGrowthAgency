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
    description: guide.pilier.description,
    path: `/plan-de-taggage-parc-de-loisirs/${guide.slug}`,
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
