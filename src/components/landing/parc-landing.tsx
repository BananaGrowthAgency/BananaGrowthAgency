import Image from "next/image";
import { AUDIT_PARC_URL } from "@/lib/site";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Contact } from "@/components/landing/contact";
import type { Locale } from "@/lib/i18n";
import { Testimonial } from "@/components/landing/testimonial";
import { ParcFaq } from "@/components/landing/parc-faq";
import { CtaPair } from "@/components/cta-pair";
import { Reveal } from "@/components/reveal";
import { NeonIcon } from "@/components/neon-icon";
import { CountUp } from "@/components/count-up";
import { OffrePiliers } from "@/components/landing/offre-piliers";

/**
 * Landing parcs de loisirs, partagée entre la version française
 * (/accompagnement-marketing-digital-parc-de-loisir) et la version
 * espagnole (/es/agencia-marketing-digital-parque-de-ocio). Seul le contenu change.
 */
export type ParcContenu = {
  hero: { eyebrow: string; title: string; titleHighlight: string; subtitle: string; cta: string };
  problem: { eyebrow: string; lines: readonly string[]; punch: string };
  stats: readonly { value: string; label: string }[];
  mission: {
    eyebrow: string;
    title: string;
    lines: readonly string[];
    ctaTitle: string;
    ctaText: string;
    cta: string;
  };
  services: readonly { title: string; desc: string; icon: string }[];
  testimonials: readonly {
    quote: string;
    author: string;
    role: string;
    photo: string;
    logo: string;
    company: string;
  }[];
  faq: readonly { q: string; a: string }[];
  finalCta: { title: string; subtitle: string; cta: string };
  ui: {
    contactCta: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesHighlight: string;
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    testimonialsHighlight: string;
    faqTitle: string;
    faqHighlight: string;
    teamAlt: string;
  };
};

function ParcHero({ t, locale }: { t: ParcContenu; locale: Locale }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-20 pt-28 md:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(42% 48% at 50% 26%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 38%, transparent 72%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <NeonIcon
            src="/logo/logoCol.png"
            sizes="(max-width: 640px) 240px, 320px"
            alt="Banana Growth Agency"
            width={460}
            height={475}
            className="h-48 w-auto animate-float sm:h-56 md:h-64"
            wrapperClassName="block w-fit"
            amount={0.4}
            once
            priority
          />
        </div>
        <div>
          <span className="inline-block rounded-full border border-pink/30 bg-pink/10 px-4 py-1.5 text-sm uppercase tracking-[0.2em] md:text-base text-pink">
            {t.hero.eyebrow}
          </span>
        </div>
        <div>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {t.hero.title}{" "}
            <span className="text-spectrum">{t.hero.titleHighlight}</span>
          </h1>
        </div>
        <div>
          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/65 md:text-lg">
            {t.hero.subtitle}
          </p>
        </div>
        <div>
          <div className="mt-9 flex justify-center">
            <CtaPair audit={AUDIT_PARC_URL} label={t.hero.cta} contactLabel={t.ui.contactCta} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ParcProblem({ t }: { t: ParcContenu }) {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="text-base uppercase tracking-[0.2em] md:text-xl text-pink/80">
            {t.problem.eyebrow}
          </span>
        </Reveal>
        <div className="mt-6 space-y-4">
          {t.problem.lines.map((line, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-foreground/65 md:text-lg">
                {line}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            <span className="text-spectrum">{t.problem.punch}</span>
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {t.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="h-full">
              <div className="glass flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 px-4 py-6">
                <CountUp
                  value={s.value}
                  className="font-display text-2xl font-bold text-spectrum md:text-3xl"
                />
                <p className="mt-1.5 text-xs leading-tight text-foreground/55 md:text-sm">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParcMission({ t, locale }: { t: ParcContenu; locale: Locale }) {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 neon-ring">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

            <div className="relative grid lg:grid-cols-[1.55fr_1fr]">
              {/* Texte — à gauche */}
              <div className="px-6 py-12 text-center md:px-10 md:py-14">
                <span className="text-base uppercase tracking-[0.2em] md:text-xl text-pink/80">
                  {t.mission.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {t.mission.title}
                </h2>
                <div className="mx-auto mt-6 max-w-xl space-y-4">
                  {t.mission.lines.map((line, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-foreground/65 md:text-lg"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <div className="mt-10 border-t border-white/10 pt-8">
                  <p className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {t.mission.ctaTitle}
                  </p>
                  <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/60 md:text-base">
                    {t.mission.ctaText}
                  </p>
                  <div className="mt-7 flex justify-center">
                    <CtaPair audit={AUDIT_PARC_URL} label={t.mission.cta} contactLabel={t.ui.contactCta} locale={locale} />
                  </div>
                </div>
              </div>

              {/* Photo de l'équipe — à droite, pleine hauteur.
                  Portrait cadré serré : on remonte le point d'ancrage pour
                  garder les visages dans le champ quand la colonne rogne. */}
              <div className="relative min-h-[22rem] border-t border-pink/15 lg:min-h-full lg:border-l lg:border-t-0">
                <Image
                  src="/canva/photos/equipe-banana.jpg"
                  alt={t.ui.teamAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[center_25%] lg:object-center"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ParcServices({ t }: { t: ParcContenu }) {
  return (
    <section id="services" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-base uppercase tracking-[0.2em] md:text-xl text-pink/80">
            {t.ui.servicesEyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t.ui.servicesTitle}{" "}
            <span className="text-spectrum">{t.ui.servicesHighlight}</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {t.services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="flex flex-col items-center text-center">
                <NeonIcon
                  src={`/canva/icons/${s.icon}.png`}
                  className="h-24 w-24 object-contain md:h-32 md:w-32"
                />
                <h3 className="mt-5 font-display text-2xl font-bold text-foreground md:text-3xl">
                  {s.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-foreground/55">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParcFinalCta({ t, locale }: { t: ParcContenu; locale: Locale }) {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-ink-soft/80 px-6 py-14 text-center neon-ring md:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
            <NeonIcon
              src="/canva/steps/growth.png"
              width={160}
              height={160}
              className="relative mx-auto mb-6 h-16 w-16 object-contain md:h-20 md:w-20"
              wrapperClassName="relative mx-auto mb-6 block w-fit"
            />
            <h2 className="relative font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              {t.finalCta.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-foreground/60">
              {t.finalCta.subtitle}
            </p>
            <div className="relative mt-8 flex justify-center">
              <CtaPair audit={AUDIT_PARC_URL} label={t.finalCta.cta} contactLabel={t.ui.contactCta} locale={locale} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ParcLanding({
  t,
  locale = "fr",
}: {
  t: ParcContenu;
  locale?: Locale;
}) {
  return (
    <>
      <Navbar />
      <main lang={locale}>
        <ParcHero t={t} locale={locale} />
        <ParcProblem t={t} />
        <ParcMission t={t} locale={locale} />
        <ParcServices t={t} />
        <OffrePiliers locale={locale} />
        <Testimonial
          items={t.testimonials}
          eyebrow={t.ui.testimonialsEyebrow}
          quoteMinH="min-h-[26rem] sm:min-h-[18rem] md:min-h-[15rem]"
          title={
            <>
              {t.ui.testimonialsTitle}{" "}
              <span className="text-spectrum">{t.ui.testimonialsHighlight}</span>
            </>
          }
        />
        <ParcFinalCta t={t} locale={locale} />
        <ParcFaq items={t.faq} title={t.ui.faqTitle} highlight={t.ui.faqHighlight} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
