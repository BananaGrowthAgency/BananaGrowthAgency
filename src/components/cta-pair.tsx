import { CtaButton } from "@/components/cta-button";
import { cn } from "@/lib/utils";

/** Double appel à l'action : réserver l'audit (Calendly) ou écrire via le formulaire de contact. */
export function CtaPair({
  audit,
  label = "Réserver mon audit",
  contact = "#contact",
  className,
}: {
  audit: string;
  label?: string;
  /** « #contact » sur les pages qui ont le formulaire, sinon la page parcs + #contact. */
  contact?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 sm:flex-row", className)}>
      <CtaButton href={audit} className="w-full sm:w-auto">
        {label}
      </CtaButton>
      <CtaButton href={contact} variant="ghost" className="w-full sm:w-auto">
        Envoyer un message
      </CtaButton>
    </div>
  );
}
