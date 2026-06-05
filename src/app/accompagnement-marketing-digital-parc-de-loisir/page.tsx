import type { Metadata } from "next";
import { CALENDLY_URL, PARC } from "@/lib/site";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Contact } from "@/components/landing/contact";
import { Testimonial } from "@/components/landing/testimonial";
import { ParcFaq } from "@/components/landing/parc-faq";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";
import { NeonIcon } from "@/components/neon-icon";
import { CountUp } from "@/components/count-up";

export const metadata: Metadata = {
  title: "Banana Growth Agency — Agence marketing spécialiste des parcs de loisirs",
  description:
    "Agence de Growth Marketing dédiée aux parcs de loisirs indoor & outdoor. Une méthode clés en main, réplicable et mesurable pour maximiser la fréquentation de votre parc.",
};

function ParcHero() {
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
        <Reveal className="mb-8 flex justify-center">
          <NeonIcon
            src="/logo/logoCol.png"
            alt="Banana Growth Agency"
            width={460}
            height={475}
            className="h-48 w-auto animate-float sm:h-56 md:h-64"
            wrapperClassName="block w-fit"
            amount={0.4}
            once
            priority
          />
        </Reveal>
        <Reveal>
          <span className="inline-block rounded-full border border-pink/30 bg-pink/10 px-4 py-1.5 text-sm uppercase tracking-[0.2em] md:text-base text-pink">
            {PARC.hero.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {PARC.hero.title}{" "}
            <span className="text-spectrum">{PARC.hero.titleHighlight}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/65 md:text-lg">
            {PARC.hero.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex justify-center">
            <CtaButton href={CALENDLY_URL}>{PARC.hero.cta}</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ParcProblem() {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="text-sm uppercase tracking-[0.2em] md:text-base text-pink/80">
            {PARC.problem.eyebrow}
          </span>
        </Reveal>
        <div className="mt-6 space-y-4">
          {PARC.problem.lines.map((line, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-foreground/65 md:text-lg">
                {line}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            <span className="text-spectrum">{PARC.problem.punch}</span>
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {PARC.stats.map((s, i) => (
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

function ParcMission() {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 px-6 py-12 text-center neon-ring md:px-12 md:py-16">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />
            <div className="relative">
              <span className="text-sm uppercase tracking-[0.2em] md:text-base text-pink/80">
                {PARC.mission.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {PARC.mission.title}
              </h2>
              <div className="mx-auto mt-6 max-w-2xl space-y-4">
                {PARC.mission.lines.map((line, i) => (
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
                  {PARC.mission.ctaTitle}
                </p>
                <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/60 md:text-base">
                  {PARC.mission.ctaText}
                </p>
                <div className="mt-7 flex justify-center">
                  <CtaButton href={CALENDLY_URL}>{PARC.mission.cta}</CtaButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ParcServices() {
  return (
    <section id="services" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm uppercase tracking-[0.2em] md:text-base text-pink/80">
            Nos services
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Un cocktail de services qui{" "}
            <span className="text-spectrum">porte ses fruits</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {PARC.services.map((s, i) => (
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

function ParcFinalCta() {
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
              {PARC.finalCta.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-foreground/60">
              {PARC.finalCta.subtitle}
            </p>
            <div className="relative mt-8 flex justify-center">
              <CtaButton href={CALENDLY_URL}>{PARC.finalCta.cta}</CtaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function ParcDeLoisirPage() {
  return (
    <>
      <Navbar />
      <main>
        <ParcHero />
        <ParcProblem />
        <ParcMission />
        <ParcServices />
        <Testimonial
          items={PARC.testimonials}
          title={
            <>
              Ils nous font déjà <span className="text-spectrum">confiance</span>
            </>
          }
        />
        <ParcFinalCta />
        <ParcFaq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
