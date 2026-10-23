import Image from "next/image";
import Link from "next/link";
import { CALENDLY_AUDIT_PARC, PARC, PARC_HREF } from "@/lib/site";
import {
  cheminSecteur,
  faqAgence,
  secteursParFamille,
  type Secteur,
} from "@/lib/secteurs";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Contact } from "@/components/landing/contact";
import { Testimonial } from "@/components/landing/testimonial";
import { ParcFaq } from "@/components/landing/parc-faq";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";
import { NeonIcon } from "@/components/neon-icon";
import { CountUp } from "@/components/count-up";

/* Même gabarit visuel que la landing parcs de loisirs, alimenté par
   les données de src/lib/secteurs.ts. Les sections « équipe » et
   « humain + IA » restent communes : c'est ce qui nous distingue des
   pages sectorielles générées à la chaîne. */

const eyebrowClass =
  "text-base uppercase tracking-[0.2em] md:text-xl text-pink/80";

function formatVolume(n: number) {
  return n.toLocaleString("fr-FR");
}

function Hero({ s }: { s: Secteur }) {
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
            className="h-40 w-auto animate-float sm:h-48 md:h-56"
            wrapperClassName="block w-fit"
            amount={0.4}
            once
            priority
          />
        </Reveal>
        <Reveal>
          <span className="inline-block rounded-full border border-pink/30 bg-pink/10 px-4 py-1.5 text-sm uppercase tracking-[0.2em] text-pink md:text-base">
            Marketing digital · {s.nom}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Accompagnement marketing digital pour{" "}
            <span className="text-spectrum">{s.pour}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/65 md:text-lg">
            {s.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex justify-center">
            <CtaButton href={CALENDLY_AUDIT_PARC}>Réserver mon audit</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Problème et mission dans une même carte, la photo de l'équipe à côté :
   on casse le tout-centré dès le premier écran après le hero. */
function ProblemeMission({ s }: { s: Secteur }) {
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 neon-ring">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

            <div className="relative grid lg:grid-cols-[1.4fr_1fr]">
              <div className="px-6 py-12 md:px-12 md:py-14">
                <span className={eyebrowClass}>Vous gérez {s.un} ?</span>
                <div className="mt-6 space-y-4">
                  {s.probleme.map((line, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-foreground/65 md:text-lg"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <div className="mt-10 border-t border-white/10 pt-8">
                  <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {PARC.mission.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    <p className="text-base leading-relaxed text-foreground/65 md:text-lg">
                      {PARC.mission.lines[0]}
                    </p>
                    <p className="text-base leading-relaxed text-foreground/65 md:text-lg">
                      Nous pilotons votre stratégie marketing, afin que vous
                      puissiez vous concentrer sur l&apos;essentiel :
                      l&apos;expérience de vos clients et la gestion de{" "}
                      {s.votre}.
                    </p>
                  </div>
                  <p className="mt-8 font-display text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    <span className="text-spectrum">
                      Prêt(e) à booster la fréquentation de {s.votre} ?
                    </span>
                  </p>
                  <div className="mt-6">
                    <CtaButton href={CALENDLY_AUDIT_PARC}>
                      {PARC.mission.cta}
                    </CtaButton>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[24rem] border-t border-pink/15 lg:min-h-full lg:border-l lg:border-t-0">
                <Image
                  src="/canva/photos/equipe-banana.jpg"
                  alt="L'équipe Banana Growth Agency"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[center_25%] lg:object-center"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {PARC.stats.map((st, i) => (
            <Reveal key={st.label} delay={i * 0.08} className="h-full">
              <div className="glass flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 px-4 py-6 text-center">
                <CountUp
                  value={st.value}
                  className="font-display text-2xl font-bold text-spectrum md:text-3xl"
                />
                <p className="mt-1.5 text-xs leading-tight text-foreground/55 md:text-sm">
                  {st.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Demande({ s }: { s: Secteur }) {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={eyebrowClass}>La demande en ligne</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Ce que cherchent <span className="text-spectrum">vos clients</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/65 md:text-lg">
            {s.demande.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.demande.requetes.map((r, i) => (
            <Reveal key={r.mot} delay={(i % 3) * 0.06} className="h-full">
              <div className="glass flex h-full items-center justify-between gap-4 rounded-2xl border border-white/10 px-5 py-4">
                <span className="text-base text-foreground/80">« {r.mot} »</span>
                <span className="whitespace-nowrap text-right">
                  <span className="font-display text-xl font-bold text-spectrum">
                    {formatVolume(r.volume)}
                  </span>
                  <span className="block text-xs text-foreground/45">
                    recherches / mois
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-foreground/40">
          Volumes de recherche Google en France, mesurés avec SE Ranking en
          octobre 2026.
        </p>
      </div>
    </section>
  );
}

function Publics({ s }: { s: Secteur }) {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={eyebrowClass}>Vos publics</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Un message pour <span className="text-spectrum">chaque client</span>
          </h2>
        </Reveal>

        <div
          className={`mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 ${
            s.publics.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {s.publics.map((p, i) => (
            <Reveal key={p.titre} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-soft/60 p-6">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {p.titre}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {p.texte}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Six engagements au même format : trois côté IA, trois côté humain. */
const ENGAGEMENTS = [
  {
    titre: "Un interlocuteur dédié",
    texte:
      "Quelqu'un qui connaît votre activité, vos créneaux creux et vos équipes, et que vous pouvez appeler.",
  },
  {
    titre: "Des méthodes testées sur le terrain",
    texte:
      "Ce que nous mettons en place a déjà fonctionné chez d'autres acteurs du loisir. Pas de théorie.",
  },
  {
    titre: "De la pédagogie",
    texte:
      "Nous formons vos équipes pour qu'elles comprennent ce qui se passe et gagnent en autonomie.",
  },
  {
    titre: "Visible dans les réponses des IA",
    texte:
      "Vos clients demandent déjà à ChatGPT ou à Google quoi faire ce week-end. Nous travaillons votre présence dans ces réponses.",
  },
  {
    titre: "Des créations testées à grande échelle",
    texte:
      "L'IA nous aide à décliner et tester des dizaines de variantes d'annonces. Nous gardons celles qui remplissent vos créneaux.",
  },
  {
    titre: "Un reporting qui tourne tout seul",
    texte:
      "Vos données publicitaires et vos réservations remontent chaque matin dans un tableau de bord.",
  },
];

function HumainIa({ s }: { s: Secteur }) {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-pink/20 neon-ring">
              <Image
                src="/canva/photos/qui-sommes-nous.jpg"
                alt="L'équipe Banana Growth Agency devant des enseignes de loisirs"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className={eyebrowClass}>Qui sommes-nous</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Une équipe humaine,{" "}
                <span className="text-spectrum">augmentée par l&apos;IA</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
                Nous ne sommes pas une plateforme qui génère des campagnes à la
                chaîne. Nous sommes une petite équipe passionnée par le loisir,
                qui utilise l&apos;IA pour aller plus vite, et garde
                l&apos;humain pour ce qui compte : comprendre {s.votre} et vos
                clients.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ENGAGEMENTS.map((item, i) => (
                <Reveal key={item.titre} delay={(i % 2) * 0.06} className="h-full">
                  <div className="h-full rounded-2xl border border-white/10 bg-ink-soft/60 p-5">
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {item.titre}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                      {item.texte}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={eyebrowClass}>Nos services</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Un cocktail de services qui{" "}
            <span className="text-spectrum">porte ses fruits</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {PARC.services.map((sv, i) => (
            <Reveal key={sv.title} delay={(i % 3) * 0.08}>
              <div className="flex flex-col items-center text-center">
                <NeonIcon
                  src={`/canva/icons/${sv.icon}.png`}
                  className="h-24 w-24 object-contain md:h-32 md:w-32"
                />
                <h3 className="mt-5 font-display text-2xl font-bold text-foreground md:text-3xl">
                  {sv.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-foreground/55">
                  {sv.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SaisonCta({ s }: { s: Secteur }) {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-ink-soft/80 px-6 py-14 text-center neon-ring md:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
            <span className={`relative ${eyebrowClass}`}>Votre saison</span>
            <p className="relative mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
              {s.saison}
            </p>
            <h2 className="relative mt-10 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              {PARC.finalCta.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-foreground/60">
              Réservez votre audit gratuit et remplissez {s.votre}.
            </p>
            <div className="relative mt-8 flex justify-center">
              <CtaButton href={CALENDLY_AUDIT_PARC}>{PARC.finalCta.cta}</CtaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AutresSecteurs({ s }: { s: Secteur }) {
  return (
    <section className="relative px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Nous accompagnons aussi
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {secteursParFamille().map((f) => (
            <div key={f.famille}>
              <p className="text-sm uppercase tracking-[0.15em] text-pink/80">
                {f.label}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {f.secteurs
                  .filter((o) => o.slug !== s.slug)
                  .map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={cheminSecteur(o.slug)}
                        className="inline-block rounded-full border border-white/10 px-3 py-1 text-sm text-foreground/65 transition-colors hover:border-pink/50 hover:text-pink"
                      >
                        {o.nom}
                      </Link>
                    </li>
                  ))}
                {f.famille === "indoor" && (
                  <li>
                    <Link
                      href={PARC_HREF}
                      className="inline-block rounded-full border border-white/10 px-3 py-1 text-sm text-foreground/65 transition-colors hover:border-pink/50 hover:text-pink"
                    >
                      Parcs de loisirs
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SecteurPage({ secteur: s }: { secteur: Secteur }) {
  // FAQ agence d'abord, puis FAQ métier du secteur.
  const faq = [...faqAgence(s), ...s.faq];

  return (
    <>
      <Navbar />
      <main>
        <Hero s={s} />
        <ProblemeMission s={s} />
        <Demande s={s} />
        <Publics s={s} />
        <Services />
        <Testimonial
          items={PARC.testimonials}
          quoteMinH="min-h-[26rem] sm:min-h-[18rem] md:min-h-[15rem]"
          title={
            <>
              Ils nous font déjà <span className="text-spectrum">confiance</span>
            </>
          }
        />
        <SaisonCta s={s} />
        <HumainIa s={s} />
        <ParcFaq items={faq} />
        <AutresSecteurs s={s} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
