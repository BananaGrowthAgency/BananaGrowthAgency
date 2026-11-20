import { pageMetadata } from "@/lib/metadata";
import { GUIDES_ES, TAGGAGE_HUB_ES } from "@/lib/es/tracking";
import { TaggageHub } from "@/app/plan-de-taggage-parc-de-loisirs/hub";

export const metadata = pageMetadata({
  title: "Plan de etiquetado para parques de ocio: guía por software",
  description:
    "¿Tus conversiones de Google Ads no cuadran con tu caja? Las cuatro causas y un plan de etiquetado detallado para cada motor de reservas.",
  path: "/plan-de-taggage-parc-de-loisirs",
  locale: "es",
});

export default function PlanDeEtiquetadoPage() {
  return <TaggageHub guides={GUIDES_ES} hub={TAGGAGE_HUB_ES} locale="es" />;
}
