import { pageMetadata } from "@/lib/metadata";
import { OUTILS, OUTILS_HUB } from "@/lib/outils";
import { OutilsHub } from "./hub";

export const metadata = pageMetadata({
  title:
    "Logiciels de gestion pour parc de loisirs : le comparatif",
  description:
    "Qweekle, PlayPro, Apex Timing, ROLLER, BMI Leisure : pour qui, fonctions clés et tarifs. Cinq fiches indépendantes, par une agence qui les opère.",
  path: "/logiciel-gestion-parc-de-loisirs",
});

export default function OutilsHubPage() {
  return <OutilsHub outils={OUTILS} hub={OUTILS_HUB} />;
}
