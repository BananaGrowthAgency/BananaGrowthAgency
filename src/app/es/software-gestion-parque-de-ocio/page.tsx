import { pageMetadata } from "@/lib/metadata";
import { OUTILS_ES, OUTILS_HUB_ES } from "@/lib/es/outils";
import { OutilsHub } from "@/app/logiciel-gestion-parc-de-loisirs/hub";

export const metadata = pageMetadata({
  title: "Software de gestión para parques de ocio: la comparativa",
  description:
    "Qweekle, PlayPro, Apex Timing, ROLLER, BMI Leisure: para quién, funciones clave y precios. Fichas independientes, escritas por una agencia que los opera.",
  path: "/logiciel-gestion-parc-de-loisirs",
  locale: "es",
});

export default function OutilsHubPageEs() {
  return <OutilsHub outils={OUTILS_ES} hub={OUTILS_HUB_ES} locale="es" />;
}
