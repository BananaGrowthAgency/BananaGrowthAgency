import type { Metadata } from "next";
import { hreflang } from "@/lib/i18n";
import { Confirme, type SearchParams } from "./confirme";

export const metadata: Metadata = {
  title: "Rendez-vous confirmé — Banana Growth Agency",
  alternates: { languages: hreflang("/remerciements/rendez-vous") },
  robots: { index: false, follow: false },
};

export default function ConfirmePage({ searchParams }: { searchParams: SearchParams }) {
  return <Confirme searchParams={searchParams} />;
}
