import type { Metadata } from "next";
import { titrePage } from "@/lib/metadata";
import { PARC_HREF, PARC_ES_HREF } from "@/lib/site";
import { PARC_ES } from "@/lib/parc-es";
import { ParcLanding } from "@/components/landing/parc-landing";

/* Version espagnole de la landing parcs de loisirs. Le layout racine reste
   en lang="fr" : la langue est donc posée sur <main>, et la page est liée
   à la version française en hreflang. */
const TITLE = titrePage("Agencia de marketing digital para parques de ocio");
const DESCRIPTION =
  "Agencia de Growth Marketing especializada en parques de ocio indoor y outdoor. Un método llave en mano y medible para llenar tu parque. Auditoría gratuita.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PARC_ES_HREF,
    languages: { "fr-FR": PARC_HREF, "es-ES": PARC_ES_HREF },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PARC_ES_HREF,
    type: "website",
    locale: "es_ES",
    siteName: "Banana Growth Agency",
  },
};

export default function ParquesDeOcioPage() {
  return <ParcLanding t={PARC_ES} locale="es" />;
}
