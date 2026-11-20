import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";
import { NeonIcon } from "@/components/neon-icon";
import { lien, type Locale } from "@/lib/i18n";

/* Page d'après-envoi du formulaire de contact, partagée par /remerciements et /es/gracias. */

const TEXTES = {
  fr: {
    eyebrow: "Merci",
    titre: "Demande",
    highlight: "bien reçue !",
    texte:
      "Votre demande a bien été prise en compte et sera traitée dans les meilleurs délais. Notre équipe vous recontacte très vite.",
    accueil: "Retour à l'accueil",
    resultats: "Voir nos résultats",
  },
  es: {
    eyebrow: "Gracias",
    titre: "¡Solicitud",
    highlight: "recibida!",
    texte:
      "Hemos recibido tu solicitud y la trataremos lo antes posible. Nuestro equipo se pondrá en contacto contigo muy pronto.",
    accueil: "Volver al inicio",
    resultats: "Ver nuestros resultados",
  },
} as const;

export function Merci({ locale = "fr" }: { locale?: Locale }) {
  const t = TEXTES[locale];
  return (
    <>
      <Navbar />
      <main>
        <section
          id="top"
          className="relative flex min-h-[88vh] items-center overflow-hidden px-4 py-28 md:py-32"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-spectrum-radial opacity-50 blur-3xl" />

          <div className="relative mx-auto w-full max-w-2xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-ink-soft/80 px-6 py-14 text-center neon-ring md:px-12 md:py-16">
                <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

                <div className="relative">
                  {/* Icône courrier néon */}
                  <NeonIcon
                    src="/canva/icons/email.png"
                    alt=""
                    width={220}
                    height={220}
                    className="mx-auto mb-7 h-24 w-24 object-contain md:h-28 md:w-28"
                    wrapperClassName="mx-auto mb-7 block w-fit"
                  />

                  <span className="text-base uppercase tracking-[0.2em] md:text-xl text-pink/80">
                    {t.eyebrow}
                  </span>

                  <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    {t.titre}{" "}
                    <span className="text-spectrum">{t.highlight}</span>
                  </h1>

                  <p className="mx-auto mt-6 max-w-md text-base text-foreground/65 md:text-lg">
                    {t.texte}
                  </p>

                  <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <CtaButton href={lien(locale, "/")} className="w-full sm:w-auto">
                      {t.accueil}
                    </CtaButton>
                    <CtaButton
                      href={lien(locale, "/#use-cases")}
                      variant="ghost"
                      className="w-full sm:w-auto"
                    >
                      {t.resultats}
                    </CtaButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
