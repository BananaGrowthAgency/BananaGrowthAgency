import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { OUTILS_ES, getOutilEs } from "@/lib/es/outils";
import { OutilArticle } from "@/components/landing/outil-article";

/** Las fichas se generan en el build: nada de renderizado al vuelo. */
export function generateStaticParams() {
  return OUTILS_ES.map((o) => ({ slug: o.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const outil = getOutilEs(slug);
  if (!outil) return {};

  return pageMetadata({
    title: `${outil.nom}: para quién, funcionalidades y precios`,
    description: outil.description,
    path: `/logiciel-gestion-parc-de-loisirs/${outil.slug}`,
    locale: "es",
  });
}

export default async function OutilPageEs({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const outil = getOutilEs(slug);
  if (!outil) notFound();

  return <OutilArticle outil={outil} locale="es" />;
}
