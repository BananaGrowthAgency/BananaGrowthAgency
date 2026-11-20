import Image from "next/image";
import { DIFFERENTIATION as DIFFERENTIATION_FR, RDV_URL } from "@/lib/site";
import { DIFFERENTIATION_ES } from "@/lib/es/site";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/reveal";
import { CtaPair } from "@/components/cta-pair";

const HIGHLIGHT_ICONS = ["shield", "trophy"];

const TEXTES = {
  fr: {
    title: "En quoi sommes-nous",
    highlight: "différents\u00a0?",
    cta: "Prendre rendez-vous",
    alt: "L'équipe Banana Growth Agency",
  },
  es: {
    title: "¿En qué nos",
    highlight: "diferenciamos?",
    cta: "Reservar una cita",
    alt: "El equipo de Banana Growth Agency",
  },
} as const;

export function Differentiation({ locale = "fr" }: { locale?: Locale }) {
  const DIFFERENTIATION = locale === "es" ? DIFFERENTIATION_ES : DIFFERENTIATION_FR;
  const t = TEXTES[locale];
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 neon-ring">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

            <div className="relative grid lg:grid-cols-2">
              {/* Texte — à gauche */}
              <div className="p-8 md:p-12">
                <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  {t.title}{" "}
                  <span className="text-spectrum">{t.highlight}</span>
                </h2>

                <div className="mt-6 space-y-4">
                  {DIFFERENTIATION.lines.map((line, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-foreground/65 md:text-lg"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <ul className="mt-8 space-y-4">
                  {DIFFERENTIATION.highlights.map((h, i) => (
                    <Reveal key={h} delay={0.15 + i * 0.18}>
                      <li className="flex items-center gap-3">
                        <span className="neon-step is-lit flex-none">
                          <Image
                            src={`/canva/steps/${HIGHLIGHT_ICONS[i] ?? "trophy"}.png`}
                            alt=""
                            width={96}
                            height={96}
                            className="h-11 w-11 object-contain"
                          />
                        </span>
                        <span className="font-display text-lg font-semibold text-foreground">
                          {h}
                        </span>
                      </li>
                    </Reveal>
                  ))}
                </ul>

                <p className="mt-8 text-base text-foreground/60 md:text-lg">
                  {DIFFERENTIATION.closing}
                </p>

                <div className="mt-8">
                  <CtaPair locale={locale} audit={RDV_URL} label={t.cta} className="sm:justify-start" />
                </div>
              </div>

              {/* Image — à droite, pleine hauteur */}
              <div className="relative min-h-[24rem] border-t border-pink/15 lg:min-h-full lg:border-l lg:border-t-0">
                <Image
                  src="/canva/photos/equipe-banana.jpg"
                  alt={t.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[center_22%] lg:object-center"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
