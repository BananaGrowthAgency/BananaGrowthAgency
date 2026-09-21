import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { OUTILS, getOutil } from "@/lib/outils";
import { OutilArticle } from "@/components/landing/outil-article";

/** Les cinq fiches sont générées au build : pas de rendu à la volée. */
export function generateStaticParams() {
  return OUTILS.map((o) => ({ slug: o.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const outil = getOutil(slug);
  if (!outil) return {};

  return pageMetadata({
    title: `${outil.nom} : pour qui, fonctionnalités et tarifs | Banana Growth Agency`,
    description: `${outil.nom} — ${outil.baseline} À qui s'adresse l'outil, ses fonctionnalités clés et ce qu'il coûte. Fiche indépendante, par une agence qui opère ces plateformes.`,
    path: `/logiciel-gestion-parc-de-loisirs/${outil.slug}`,
  });
}

export default async function OutilPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const outil = getOutil(slug);
  if (!outil) notFound();

  return <OutilArticle outil={outil} />;
}
