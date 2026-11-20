import type { Metadata } from "next";
import { hreflang } from "@/lib/i18n";
import { Merci } from "./merci";

export const metadata: Metadata = {
  title: "Merci ! — Banana Growth Agency",
  description:
    "Votre demande a bien été prise en compte. Notre équipe vous recontacte dans les meilleurs délais.",
  alternates: { languages: hreflang("/remerciements") },
  robots: { index: false, follow: false },
};

export default function RemerciementsPage() {
  return <Merci />;
}
