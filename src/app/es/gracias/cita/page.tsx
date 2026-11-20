import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Confirme, type SearchParams } from "@/app/remerciements/rendez-vous/confirme";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Cita confirmada",
    description: "Tu cita con Banana Growth Agency está confirmada.",
    path: "/remerciements/rendez-vous",
    locale: "es",
  }),
  robots: { index: false, follow: false },
};

export default function CitaConfirmadaPage({ searchParams }: { searchParams: SearchParams }) {
  return <Confirme searchParams={searchParams} locale="es" />;
}
