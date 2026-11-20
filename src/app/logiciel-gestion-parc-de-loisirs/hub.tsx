import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Outil } from "@/lib/outils";
import { AUDIT_PARC_URL, PARC_HREF } from "@/lib/site";
import { lien, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";

/* Corps de la page « logiciels de gestion », partagé par la version
   française et la version espagnole (/es/software-gestion-parque-de-ocio).
   Le contenu (fiches, textes du hub) arrive en props dans la bonne langue. */

export type HubOutils = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  intro: string;
  intro2: string;
  methodo: { titre: string; lignes: readonly string[] };
  suite: { titre: string; lignes: readonly string[] };
  taggage: { titre: string; texte: string; bouton: string };
  cta: { titre: string; texte: string; bouton: string };
};

const TEXTES = {
  fr: {
    editeur: "Éditeur",
    depuis: "depuis",
    pourQui: "Pour qui",
    lire: "Lire la fiche",
    plans: "Plans de taggage",
    voirAussi: "Voir aussi",
    accompagnement: "notre accompagnement dédié aux parcs de loisirs",
  },
  es: {
    editeur: "Proveedor de",
    depuis: "desde",
    pourQui: "Para quién",
    lire: "Leer la ficha",
    plans: "Planes de etiquetado",
    voirAussi: "Ver también",
    accompagnement: "nuestro acompañamiento para parques de ocio",
  },
} as const;

export function OutilsHub({
  outils,
  hub,
  locale = "fr",
}: {
  outils: readonly Outil[];
  hub: HubOutils;
  locale?: Locale;
}) {
  const t = TEXTES[locale];
  return (
    <>
      <Navbar />
      <main className="reading-scrim relative">
        {/* ── En-tête ── */}
        <section className="relative overflow-hidden px-4 pb-14 pt-28 md:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(42% 48% at 50% 18%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 72%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <span className="inline-block rounded-full border border-pink/30 bg-pink/10 px-4 py-1.5 text-sm uppercase tracking-[0.2em] text-pink">
                {hub.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {hub.title}{" "}
                <span className="text-spectrum">{hub.titleHighlight}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg leading-relaxed text-foreground/70 md:text-xl">
                {hub.intro}
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-4 text-base leading-relaxed text-foreground/60 md:text-lg">
                {hub.intro2}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Les fiches ── */}
        <section className="relative px-4 py-10 md:py-14">
          <div className="mx-auto max-w-4xl space-y-4">
            {outils.map((o, i) => (
              <Reveal key={o.slug} delay={Math.min(i, 5) * 0.06}>
                <Link
                  href={lien(locale, `/logiciel-gestion-parc-de-loisirs/${o.slug}`)}
                  className="card-link group block rounded-2xl border bg-ink-soft/50 px-5 py-6 md:px-8 md:py-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                        <span className="transition-colors group-hover:text-spectrum">
                          {o.nom}
                        </span>
                      </h2>
                      <p className="mt-1 text-sm text-foreground/45">
                        {t.editeur} {o.editeur.pays}
                        {o.editeur.depuis && ` · ${t.depuis} ${o.editeur.depuis}`}
                      </p>
                    </div>
                    <ArrowUpRight className="card-arrow mt-1 h-5 w-5 flex-none text-pink/60 group-hover:text-pink" />
                  </div>

                  <p className="mt-4 text-base leading-relaxed text-foreground/65">
                    {o.baseline}
                  </p>

                  <p className="mt-4 border-t border-white/10 pt-4 text-sm text-foreground/50">
                    <span className="font-semibold uppercase tracking-[0.12em] text-foreground/40">
                      {t.pourQui}
                    </span>{" "}
                    — {o.pourQuiCourt}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pink">
                    {t.lire}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Renvoi vers les plans de taggage ── */}
        <section className="relative px-4 py-10 md:py-14">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Link
                href={lien(locale, "/plan-de-taggage-parc-de-loisirs")}
                className="card-link group block rounded-2xl border bg-ink-soft/60 px-5 py-6 md:px-8 md:py-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-pink/80">
                      {t.plans}
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-spectrum md:text-3xl">
                      {hub.taggage.titre}
                    </h2>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/65">
                      {hub.taggage.texte}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pink">
                      {hub.taggage.bouton}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                  <ArrowUpRight className="card-arrow mt-1 h-5 w-5 flex-none text-pink/60 group-hover:text-pink" />
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── Méthode & suite ── */}
        <section className="relative px-4 py-14 md:py-20">
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-2xl border border-white/10 bg-ink-soft/40 px-5 py-6 md:px-7 md:py-7">
                <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  {hub.methodo.titre}
                </h2>
                <ul className="mt-4 space-y-3">
                  {hub.methodo.lignes.map((l) => (
                    <li key={l} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-pink/60" />
                      <span className="text-sm leading-relaxed text-foreground/60">
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="h-full">
              <div className="h-full rounded-2xl border border-white/10 bg-ink-soft/40 px-5 py-6 md:px-7 md:py-7">
                <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  {hub.suite.titre}
                </h2>
                <ul className="mt-4 space-y-3">
                  {hub.suite.lignes.map((l) => (
                    <li key={l} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground/30" />
                      <span className="text-sm leading-relaxed text-foreground/60">
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative px-4 pb-24 pt-6">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-ink-soft/80 px-6 py-12 text-center neon-ring md:px-12 md:py-14">
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
                <h2 className="relative font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {hub.cta.titre}
                </h2>
                <p className="relative mx-auto mt-4 max-w-lg text-foreground/60">
                  {hub.cta.texte}
                </p>
                <div className="relative mt-8 flex justify-center">
                  <CtaButton href={lien(locale, AUDIT_PARC_URL)}>
                    {hub.cta.bouton}
                  </CtaButton>
                </div>
                <p className="relative mt-6 text-sm text-foreground/45">
                  {t.voirAussi}{" "}
                  <Link
                    href={lien(locale, PARC_HREF)}
                    className="text-pink underline-offset-4 transition-colors hover:underline"
                  >
                    {t.accompagnement}
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
