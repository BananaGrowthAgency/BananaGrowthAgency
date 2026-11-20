import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Merci } from "@/app/remerciements/merci";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "¡Gracias!",
    description: "Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo lo antes posible.",
    path: "/remerciements",
    locale: "es",
  }),
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return <Merci locale="es" />;
}
