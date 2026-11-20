import type { Metadata } from "next";
import { titrePage } from "@/lib/metadata";
import { PARC, PARC_HREF, PARC_ES_HREF } from "@/lib/site";
import { ParcLanding } from "@/components/landing/parc-landing";

/* Métier en tête, marque en suffixe : seule l'accueil commence par
   « Banana Growth Agency », pour que les recherches de marque y mènent
   et non ici. Open Graph redéfini aussi, sinon il hérite du titre racine. */
const TITLE = titrePage("Agence marketing digital pour parcs de loisirs");
const DESCRIPTION =
  "Agence de Growth Marketing dédiée aux parcs de loisirs indoor et outdoor. Une méthode clés en main et mesurable pour remplir votre parc. Audit offert.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Version espagnole déclarée en hreflang, dans les deux sens.
  alternates: {
    canonical: PARC_HREF,
    languages: { "fr-FR": PARC_HREF, "es-ES": PARC_ES_HREF },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "fr_FR",
    siteName: "Banana Growth Agency",
  },
};

export default function ParcDeLoisirPage() {
  return <ParcLanding t={PARC} />;
}
