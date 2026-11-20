import Image from "next/image";
import Link from "next/link";
import { AUDIT_PARC_URL, PARC, PARC_HREF } from "@/lib/site";
import { PARC_ES } from "@/lib/parc-es";
import type { ParcContenu } from "@/components/landing/parc-landing";
import type { Outil } from "@/lib/outils";
import { aUnGuide } from "@/lib/tracking";
import { cheminSecteur, type Famille, type Secteur } from "@/lib/secteurs";
import { lien, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Contact } from "@/components/landing/contact";
import { Testimonial } from "@/components/landing/testimonial";
import { ParcFaq } from "@/components/landing/parc-faq";
import { CtaPair } from "@/components/cta-pair";
import { FilAriane } from "@/components/fil-ariane";
import { Reveal } from "@/components/reveal";
import { NeonIcon } from "@/components/neon-icon";
import { CountUp } from "@/components/count-up";

/* Même gabarit visuel que la landing parcs de loisirs, alimenté par
   les données de src/lib/secteurs.ts (ou src/lib/es/secteurs.ts). La
   frise « 45 premiers jours » reste commune : elle dit concrètement ce qui
   se passe après la signature, quel que soit le secteur.

   Le contenu (secteur, FAQ, fiches outils, autres secteurs) arrive en props
   depuis la page, déjà dans la bonne langue. Seuls les textes d'interface
   sont ici, dans TEXTES. */

/* Les 45 premiers jours : ce qui se passe concrètement après la signature.
   Reprend les engagements de la FAQ (campagnes en moins de 15 jours,
   +20 % de fréquentation visés à 45 jours). */
const ETAPES = {
  fr: [
    { quand: "Semaine 1", titre: "L'audit", texte: "Site, fiche Google, campagnes en cours, suivi des réservations : nous repérons ce qui freine vos ventes." },
    { quand: "Semaine 2", titre: "Le tracking", texte: "Nous branchons votre logiciel de réservation à Google et Meta, pour savoir enfin d'où vient chaque réservation." },
    { quand: "Jour 15", titre: "Les campagnes en ligne", texte: "Google Ads et Meta Ads démarrent sur les publics et les offres qui remplissent vos créneaux." },
    { quand: "Jour 45", titre: "Le premier bilan", texte: "Réservations, coût par réservation, prochaines actions. Notre objectif : +20 % de fréquentation." },
  ],
  es: [
    { quand: "Semana 1", titre: "La auditoría", texte: "Web, ficha de Google, campañas activas, seguimiento de reservas: detectamos lo que frena tus ventas." },
    { quand: "Semana 2", titre: "El tracking", texte: "Conectamos tu software de reservas con Google y Meta para saber por fin de dónde viene cada reserva." },
    { quand: "Día 15", titre: "Campañas en marcha", texte: "Google Ads y Meta Ads arrancan con los públicos y las ofertas que llenan tus franjas." },
    { quand: "Día 45", titre: "El primer balance", texte: "Reservas, coste por reserva, próximos pasos. Nuestro objetivo: +20 % de afluencia." },
  ],
} as const;

const TEXTES = {
  fr: {
    nombre: "fr-FR",
    accueil: "Accueil",
    parcs: "Parcs de loisirs",
    badge: "Marketing digital",
    h1: "Accompagnement marketing digital pour",
    vousGerez: (un: string) => `Vous gérez ${un} ?`,
    pilotons: (votre: string) =>
      `Nous pilotons votre stratégie marketing, afin que vous puissiez vous concentrer sur l'essentiel : l'expérience de vos clients et la gestion de ${votre}.`,
    pret: (votre: string) => `Prêt(e) à booster la fréquentation de ${votre} ?`,
    equipeAlt: "L'équipe Banana Growth Agency",
    demande: "La demande en ligne",
    demandeTitre: ["Ce que cherchent", "vos clients"],
    recherches: "recherches / mois",
    source:
      "Volumes de recherche Google en France, mesurés avec SE Ranking en octobre 2026.",
    publics: "Vos publics",
    publicsTitre: ["Un message pour", "chaque client"],
    logiciel: "Votre logiciel de réservation",
    logicielTitre: ["Des campagnes", "reliées à vos ventes"],
    logicielTexte:
      "Une publicité ne s'optimise que si elle voit les réservations qu'elle génère. Nos fiches sur les logiciels du secteur expliquent ce que chacun permet de mesurer, et comment le brancher.",
    fiche: "Fiche",
    plan: "Plan de taggage",
    jours: "Concrètement",
    joursTitre: ["Vos 45 premiers jours", "avec nous"],
    joursTexte: (votre: string) =>
      `Pas de long tunnel de préparation : voici ce qui se passe pour ${votre} dès la signature.`,
    services: "Nos services",
    servicesTitre: ["Un cocktail de services qui", "porte ses fruits"],
    avis: ["Ils nous font déjà", "confiance"],
    saison: "Votre saison",
    remplir: (votre: string) =>
      `Réservez votre audit gratuit et remplissez ${votre}.`,
    aussi: "Nous accompagnons aussi",
    faq: undefined,
  },
  es: {
    nombre: "es-ES",
    accueil: "Inicio",
    parcs: "Parques de ocio",
    badge: "Marketing digital",
    h1: "Agencia de marketing digital para",
    vousGerez: (un: string) => `¿Gestionas ${un}?`,
    pilotons: (votre: string) =>
      `Pilotamos tu estrategia de marketing para que puedas centrarte en lo esencial: la experiencia de tus clientes y la gestión de ${votre}.`,
    pret: (votre: string) => `¿Listo para disparar la afluencia de ${votre}?`,
    equipeAlt: "El equipo de Banana Growth Agency",
    demande: "La demanda online",
    demandeTitre: ["Lo que buscan", "tus clientes"],
    recherches: "búsquedas / mes",
    source:
      "Volúmenes de búsqueda de Google en Francia, medidos con SE Ranking en octubre de 2026.",
    publics: "Tus públicos",
    publicsTitre: ["Un mensaje para", "cada cliente"],
    logiciel: "Tu software de reservas",
    logicielTitre: ["Campañas", "conectadas a tus ventas"],
    logicielTexte:
      "Un anuncio solo se optimiza si ve las reservas que genera. Nuestras fichas sobre el software del sector explican qué permite medir cada uno y cómo conectarlo.",
    fiche: "Ficha de",
    plan: "Plan de etiquetado de",
    jours: "En concreto",
    joursTitre: ["Tus primeros 45 días", "con nosotros"],
    joursTexte: (votre: string) =>
      `Sin largas fases de preparación: esto es lo que pasa en ${votre} desde la firma.`,
    services: "Nuestros servicios",
    servicesTitre: ["Un cóctel de servicios que", "da sus frutos"],
    avis: ["Ya confían en", "nosotros"],
    saison: "Tu temporada",
    remplir: (votre: string) =>
      `Reserva tu auditoría gratuita y llena ${votre}.`,
    aussi: "También acompañamos a",
    faq: { title: "Preguntas", highlight: "frecuentes" },
  },
} as const;

type Textes = (typeof TEXTES)[Locale];

/** Ce dont chaque section a besoin, en plus du secteur. */
type Ctx = { s: Secteur; t: Textes; P: ParcContenu; locale: Locale };

export type FamilleSecteurs = {
  famille: Famille;
  label: string;
  secteurs: readonly Secteur[];
};

const eyebrowClass =
  "text-base uppercase tracking-[0.2em] md:text-xl text-pink/80";

function Hero({ s, t, locale }: Ctx) {
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
            className="h-40 w-auto animate-float sm:h-48 md:h-56"
            wrapperClassName="block w-fit"
            amount={0.4}
            once
            priority
          />
        </div>
        <div>
          <FilAriane
            className="mb-6 flex justify-center"
            locale={locale}
            etapes={[
              { nom: t.accueil, href: lien(locale, "/") },
              { nom: t.parcs, href: lien(locale, PARC_HREF) },
              { nom: s.nom },
            ]}
          />
          <span className="inline-block rounded-full border border-pink/30 bg-pink/10 px-4 py-1.5 text-sm uppercase tracking-[0.2em] text-pink md:text-base">
            {t.badge} · {s.nom}
          </span>
        </div>
        <div>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {t.h1}{" "}
            <span className="text-spectrum">{s.pour}</span>
          </h1>
        </div>
        <div>
          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/65 md:text-lg">
            {s.subtitle}
          </p>
        </div>
        <div>
          <div className="mt-9 flex justify-center">
            <CtaPair locale={locale} audit={AUDIT_PARC_URL} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Problème et mission dans une même carte, la photo de l'équipe à côté :
   on casse le tout-centré dès le premier écran après le hero. */
function ProblemeMission({ s, t, P, locale }: Ctx) {
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 neon-ring">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

            <div className="relative grid lg:grid-cols-[1.4fr_1fr]">
              <div className="px-6 py-12 md:px-12 md:py-14">
                <span className={eyebrowClass}>{t.vousGerez(s.un)}</span>
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
                    {P.mission.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    <p className="text-base leading-relaxed text-foreground/65 md:text-lg">
                      {P.mission.lines[0]}
                    </p>
                    <p className="text-base leading-relaxed text-foreground/65 md:text-lg">
                      {t.pilotons(s.votre)}
                    </p>
                  </div>
                  <p className="mt-8 font-display text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    <span className="text-spectrum">
                      {t.pret(s.votre)}
                    </span>
                  </p>
                  <div className="mt-6">
                    <CtaPair
                      locale={locale}
                      audit={AUDIT_PARC_URL}
                      label={P.mission.cta}
                    />
                  </div>
                </div>
              </div>

              <div className="relative min-h-[24rem] border-t border-pink/15 lg:min-h-full lg:border-l lg:border-t-0">
                <Image
                  src="/canva/photos/equipe-banana.jpg"
                  alt={t.equipeAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[center_25%] lg:object-center"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {P.stats.map((st, i) => (
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

function Demande({ s, t }: Ctx) {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={eyebrowClass}>{t.demande}</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {t.demandeTitre[0]}{" "}
            <span className="text-spectrum">{t.demandeTitre[1]}</span>
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
                    {r.volume.toLocaleString(t.nombre)}
                  </span>
                  <span className="block text-xs text-foreground/45">
                    {t.recherches}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-foreground/40">
          {s.demande.source ?? t.source}
        </p>
      </div>
    </section>
  );
}

function Publics({ s, t }: Ctx) {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={eyebrowClass}>{t.publics}</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {t.publicsTitre[0]}{" "}
            <span className="text-spectrum">{t.publicsTitre[1]}</span>
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

/* Liens vers les fiches logiciels et plans de taggage : du contenu existant,
   mieux relié, et un bloc propre à chaque secteur. */
function Outils({
  t,
  locale,
  outils,
}: Ctx & { outils: readonly Outil[] }) {
  if (outils.length === 0) return null;

  return (
    <section className="relative px-4 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={eyebrowClass}>{t.logiciel}</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t.logicielTitre[0]}{" "}
            <span className="text-spectrum">{t.logicielTitre[1]}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
            {t.logicielTexte}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {outils.map((o) => (
            <Reveal key={o.slug} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-soft/60 p-6">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {o.nom}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/60">
                  {o.pourQuiCourt}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link
                    href={lien(locale, `/logiciel-gestion-parc-de-loisirs/${o.slug}`)}
                    className="text-pink underline decoration-pink/40 underline-offset-4 transition-colors hover:decoration-pink"
                  >
                    {t.fiche} {o.nom}
                  </Link>
                  {aUnGuide(o.slug) && (
                    <Link
                      href={lien(locale, `/plan-de-taggage-parc-de-loisirs/${o.slug}`)}
                      className="text-pink underline decoration-pink/40 underline-offset-4 transition-colors hover:decoration-pink"
                    >
                      {t.plan} {o.nom}
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


function PremiersJours({ s, t, locale }: Ctx) {
  const etapes = ETAPES[locale];
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={eyebrowClass}>{t.jours}</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {t.joursTitre[0]}{" "}
            <span className="text-spectrum">{t.joursTitre[1]}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
            {t.joursTexte(s.votre)}
          </p>
        </Reveal>

        <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Fil de la frise, derrière les pastilles (grand écran seulement). */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-gradient-to-r from-yellow/50 via-orange/50 to-pink/50 lg:block"
          />
          {etapes.map((e, i) => (
            <Reveal key={e.quand} delay={i * 0.08} className="h-full">
              <li className="relative flex h-full flex-col items-center text-center">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-spectrum font-display text-lg font-bold text-white neon-ring-strong">
                  {i + 1}
                </span>
                <div className="mt-4 h-full w-full rounded-2xl border border-white/10 bg-ink-soft/60 p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-pink/80">
                    {e.quand}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                    {e.titre}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                    {e.texte}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Version compacte des services : les descriptions sont sur la page parcs,
   inutile de les répéter sur chaque page secteur. */
function Services({ t, P }: Ctx) {
  return (
    <section id="services" className="relative px-4 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={eyebrowClass}>{t.services}</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t.servicesTitre[0]}{" "}
            <span className="text-spectrum">{t.servicesTitre[1]}</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {P.services.map((sv, i) => (
            <Reveal key={sv.title} delay={(i % 3) * 0.05}>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-soft/60 p-3 md:p-4">
                <NeonIcon
                  src={`/canva/icons/${sv.icon}.png`}
                  width={96}
                  height={96}
                  className="h-10 w-10 flex-none object-contain md:h-12 md:w-12"
                />
                <span className="font-display text-base font-bold text-foreground md:text-lg">
                  {sv.title}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SaisonCta({ s, t, P, locale }: Ctx) {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-ink-soft/80 px-6 py-14 text-center neon-ring md:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
            <span className={`relative ${eyebrowClass}`}>{t.saison}</span>
            <p className="relative mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
              {s.saison}
            </p>
            <h2 className="relative mt-10 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              {P.finalCta.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-foreground/60">
              {t.remplir(s.votre)}
            </p>
            <div className="relative mt-8 flex justify-center">
              <CtaPair
                locale={locale}
                audit={AUDIT_PARC_URL}
                label={P.finalCta.cta}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AutresSecteurs({
  s,
  t,
  locale,
  familles,
}: Ctx & { familles: readonly FamilleSecteurs[] }) {
  return (
    <section className="relative px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {t.aussi}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {familles.map((f) => (
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
                        href={lien(locale, cheminSecteur(o.slug))}
                        className="inline-block rounded-full border border-white/10 px-3 py-1 text-sm text-foreground/65 transition-colors hover:border-pink/50 hover:text-pink"
                      >
                        {o.nom}
                      </Link>
                    </li>
                  ))}
                {f.famille === "indoor" && (
                  <li>
                    <Link
                      href={lien(locale, PARC_HREF)}
                      className="inline-block rounded-full border border-white/10 px-3 py-1 text-sm text-foreground/65 transition-colors hover:border-pink/50 hover:text-pink"
                    >
                      {t.parcs}
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

/** Le carrousel ne rend qu'un avis dans le HTML : on met le plus proche du
    secteur en premier, pour que chaque page ne serve pas le même texte. */
function avisEnPremier(s: Secteur, P: ParcContenu) {
  const cle = s.avis ?? "overland";
  return [
    ...P.testimonials.filter((t) => t.logo === cle),
    ...P.testimonials.filter((t) => t.logo !== cle),
  ];
}

export function SecteurPage({
  secteur: s,
  faq,
  outils,
  familles,
  locale = "fr",
}: {
  secteur: Secteur;
  /** FAQ complète, agence d'abord puis métier du secteur. */
  faq: readonly { q: string; a: string }[];
  /** Fiches outils du secteur, déjà résolues dans la bonne langue. */
  outils: readonly Outil[];
  /** Tous les secteurs par famille, pour le maillage en bas de page. */
  familles: readonly FamilleSecteurs[];
  locale?: Locale;
}) {
  const t = TEXTES[locale];
  const ctx: Ctx = {
    s,
    t,
    P: locale === "es" ? PARC_ES : PARC,
    locale,
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero {...ctx} />
        <ProblemeMission {...ctx} />
        <Demande {...ctx} />
        <Publics {...ctx} />
        <Outils {...ctx} outils={outils} />
        <Services {...ctx} />
        <Testimonial
          locale={locale}
          items={avisEnPremier(s, ctx.P)}
          eyebrow={locale === "es" ? PARC_ES.ui.testimonialsEyebrow : undefined}
          quoteMinH="min-h-[26rem] sm:min-h-[18rem] md:min-h-[15rem]"
          title={
            <>
              {t.avis[0]} <span className="text-spectrum">{t.avis[1]}</span>
            </>
          }
        />
        <SaisonCta {...ctx} />
        <PremiersJours {...ctx} />
        <ParcFaq
          items={faq}
          title={t.faq?.title}
          highlight={t.faq?.highlight}
        />
        <AutresSecteurs {...ctx} familles={familles} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
