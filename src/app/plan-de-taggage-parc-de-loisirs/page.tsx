import { pageMetadata } from "@/lib/metadata";
import { GUIDES } from "@/lib/tracking";
import { TAGGAGE_HUB } from "@/lib/tracking/hub";
import { TaggageHub } from "./hub";

export const metadata = pageMetadata({
  title:
    "Plan de taggage parc de loisirs : guide par logiciel",
  description:
    "Vos conversions Google Ads ne collent pas avec votre caisse ? Les quatre causes, et un plan de taggage détaillé pour chaque moteur de réservation.",
  path: "/plan-de-taggage-parc-de-loisirs",
});

export default function PlanDeTaggagePage() {
  return <TaggageHub guides={GUIDES} hub={TAGGAGE_HUB} />;
}
