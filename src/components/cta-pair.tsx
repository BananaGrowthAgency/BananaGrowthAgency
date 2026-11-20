import { CtaButton } from "@/components/cta-button";
import { cn } from "@/lib/utils";
import { lien, type Locale } from "@/lib/i18n";

/** Double appel à l'action : réserver l'audit (Calendly) ou écrire via le formulaire de contact. */
export function CtaPair({
  audit,
  locale = "fr",
  label = locale === "es" ? "Reservar mi auditoría" : "Réserver mon audit",
  contact = "#contact",
  contactLabel = locale === "es" ? "Enviar un mensaje" : "Envoyer un message",
  className,
}: {
  /** En espagnol, les liens internes (audit, contact) pointent vers /es. */
  locale?: Locale;
  audit: string;
  label?: string;
  /** « #contact » sur les pages qui ont le formulaire, sinon la page parcs + #contact. */
  contact?: string;
  contactLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 sm:flex-row", className)}>
      <CtaButton href={lien(locale, audit)} className="w-full sm:w-auto">
        {label}
      </CtaButton>
      <CtaButton href={lien(locale, contact)} variant="ghost" className="w-full sm:w-auto">
        {contactLabel}
      </CtaButton>
    </div>
  );
}
