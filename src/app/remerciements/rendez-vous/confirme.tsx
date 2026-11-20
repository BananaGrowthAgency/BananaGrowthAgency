import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CtaButton } from "@/components/cta-button";
import { bookingTypeFor, getBookingType } from "@/lib/booking/config";
import { lien, type Locale } from "@/lib/i18n";

/* Confirmation d'une réservation, partagée par /remerciements/rendez-vous et /es/gracias/cita. */

const TEXTES = {
  fr: {
    intl: "fr-FR",
    eyebrow: "C'est noté",
    titre: "Rendez-vous",
    highlight: "confirmé !",
    invitation: "Vous allez recevoir une invitation Google Agenda avec le lien de la visio Google Meet.",
    accueil: "Retour à l'accueil",
  },
  es: {
    intl: "es-ES",
    eyebrow: "Apuntado",
    titre: "¡Cita",
    highlight: "confirmada!",
    invitation: "Vas a recibir una invitación de Google Calendar con el enlace de la videollamada de Google Meet.",
    accueil: "Volver al inicio",
  },
} as const;

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function safeTz(tz: string | undefined) {
  try {
    if (tz) new Intl.DateTimeFormat("fr-FR", { timeZone: tz });
    return tz || "Europe/Paris";
  } catch {
    return "Europe/Paris";
  }
}

export async function Confirme({ searchParams, locale = "fr" }: { searchParams: SearchParams; locale?: Locale }) {
  const t = TEXTES[locale];
  const sp = await searchParams;
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]);
  const found = getBookingType(one("type"));
  const type = found ? bookingTypeFor(found.key, locale) : null;
  const start = Date.parse(one("start") ?? "");
  const tz = safeTz(one("tz"));
  const when = Number.isFinite(start)
    ? new Intl.DateTimeFormat(t.intl, {
        timeZone: tz,
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(start))
    : null;

  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex min-h-[80vh] items-center overflow-hidden px-4 py-28 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-grid" />
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-ink-soft/80 px-6 py-14 text-center neon-ring md:px-12 md:py-16">
              <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />
              <div className="relative">
                <span className="text-base uppercase tracking-[0.2em] text-pink/80 md:text-xl">{t.eyebrow}</span>
                <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  {`${t.titre} `}<span className="text-spectrum">{t.highlight}</span>
                </h1>
                {when && (
                  <p className="mt-6 text-lg font-semibold text-foreground first-letter:uppercase md:text-xl">{when}</p>
                )}
                <p className="mx-auto mt-4 max-w-md text-base text-foreground/65 md:text-lg">
                  {type ? `${type.title}. ` : ""}
                  {t.invitation}
                </p>
                <div className="mt-10 flex justify-center">
                  <CtaButton href={lien(locale, "/")}>{t.accueil}</CtaButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
