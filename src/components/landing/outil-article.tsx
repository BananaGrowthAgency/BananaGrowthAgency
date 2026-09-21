import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, CircleHelp, TriangleAlert } from "lucide-react";
import type { Outil } from "@/lib/outils";
import { aUnGuide } from "@/lib/tracking";
import { CALENDLY_AUDIT_PARC } from "@/lib/site";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";

function SectionTitle({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {eyebrow && (
        <span className="text-sm uppercase tracking-[0.2em] text-pink/80 md:text-base">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {children}
      </h2>
    </>
  );
}

export function OutilArticle({ outil }: { outil: Outil }) {
  const { editeur } = outil;
  const guide = aUnGuide(outil.slug);

  return (
    <>
      <Navbar />
      <main className="reading-scrim relative">
        {/* ── En-tête ── */}
        <section className="relative overflow-hidden px-4 pb-12 pt-28 md:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <Link
                href="/outils-parc-de-loisirs"
                className="inline-flex items-center gap-2 text-sm text-foreground/55 transition-colors hover:text-pink"
              >
                <ArrowLeft className="h-4 w-4" />
                Tous les outils pour parcs de loisirs
              </Link>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground md:text-6xl">
                <span className="text-spectrum">{outil.nom}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-foreground/70 md:text-xl">
                {outil.baseline}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/50">
                <span>Éditeur {editeur.pays}</span>
                {editeur.depuis && <span>Depuis {editeur.depuis}</span>}
                {editeur.groupe && <span>{editeur.groupe}</span>}
                <a
                  href={outil.site}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-pink transition-colors hover:text-pink/75"
                >
                  Site officiel
                </a>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {outil.chiffres.map((c, i) => (
                <Reveal key={c.label} delay={0.2 + i * 0.06} className="h-full">
                  <div className="glass flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 px-4 py-5 text-center">
                    <span className="font-display text-2xl font-bold text-spectrum md:text-3xl">
                      {c.valeur}
                    </span>
                    <span className="mt-1 text-xs leading-tight text-foreground/55 md:text-sm">
                      {c.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pour qui ── */}
        <section className="relative px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Pour qui">
                À qui s&apos;adresse <span className="text-spectrum">{outil.nom}</span>
              </SectionTitle>
              <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
                {outil.pourQui.intro}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-3">
                {outil.pourQui.profils.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 flex-none text-pink" />
                    <span className="text-base leading-relaxed text-foreground/70">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 rounded-2xl border border-white/10 bg-ink-soft/60 px-5 py-6 md:px-7">
                <h3 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  Quand ce n&apos;est pas le bon outil
                </h3>
                <ul className="mt-4 space-y-3">
                  {outil.pourQui.moinsAdapte.map((m) => (
                    <li key={m} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground/35" />
                      <span className="text-base leading-relaxed text-foreground/60">
                        {m}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Fonctionnalités ── */}
        <section className="relative px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Fonctionnalités">
                Les fonctionnalités <span className="text-spectrum">clés</span>
              </SectionTitle>
            </Reveal>

            <div className="mt-10 space-y-5">
              {outil.fonctionnalites.map((f, i) => (
                <Reveal key={f.titre} delay={Math.min(i, 5) * 0.05}>
                  <div className="rounded-2xl border border-white/10 bg-ink-soft/50 px-5 py-5 transition-colors hover:border-pink/30 md:px-7 md:py-6">
                    <h3 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                      {f.titre}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-foreground/65">
                      {f.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tarifs ── */}
        <section className="relative px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Tarifs">
                Combien coûte <span className="text-spectrum">{outil.nom}</span>
              </SectionTitle>
              <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
                {outil.tarifs.intro}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-8 overflow-hidden rounded-2xl border border-white/10">
                {outil.tarifs.lignes.map((l, i) => (
                  <div
                    key={l.label}
                    className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 md:px-7 ${
                      i % 2 === 0 ? "bg-ink-soft/60" : "bg-ink-soft/30"
                    }`}
                  >
                    <dt className="text-sm text-foreground/60 md:text-base">
                      {l.label}
                    </dt>
                    <dd className="text-right">
                      <span className="font-display text-lg tracking-tight text-foreground md:text-xl">
                        {l.valeur}
                      </span>
                      {l.source && (
                        <span className="mt-0.5 block text-xs text-foreground/40">
                          {l.source}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 rounded-2xl border border-white/10 bg-ink-soft/40 px-5 py-6 md:px-7">
                <div className="flex items-center gap-2.5">
                  <CircleHelp className="h-5 w-5 flex-none text-pink" />
                  <h3 className="font-display text-lg font-bold tracking-tight text-foreground md:text-xl">
                    Ce qui manque encore
                  </h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {outil.tarifs.manquant.map((m) => (
                    <li key={m} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-pink/60" />
                      <span className="text-sm leading-relaxed text-foreground/60 md:text-base">
                        {m}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-foreground/45">
                  Nous sollicitons l&apos;éditeur pour obtenir ces éléments.
                  Cette fiche sera mise à jour dès réception.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Constaté en production ── */}
        {outil.constate && (
          <section className="relative px-4 py-14 md:py-20">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-pink/25 bg-ink-soft/70 px-5 py-8 neon-ring md:px-9 md:py-10">
                  <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-25" />
                  <div className="relative">
                    <span className="text-sm uppercase tracking-[0.2em] text-pink/80">
                      Vérifié par nos soins
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      Ce que montre une installation réelle
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-foreground/65">
                      {outil.constate.intro}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {outil.constate.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <Check className="mt-1 h-4 w-4 flex-none text-pink" />
                          <span className="text-base leading-relaxed text-foreground/70">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ── Guide d'implémentation, si rédigé ── */}
        {guide && (
          <section className="relative px-4 py-8 md:py-10">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <Link
                  href={`/outils-parc-de-loisirs/${outil.slug}/tracking`}
                  className="group block rounded-2xl border border-pink/25 bg-ink-soft/60 px-5 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink/50 md:px-7 md:py-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-pink/80">
                        Guide technique
                      </span>
                      <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                        Plan de taggage{" "}
                        <span className="transition-colors group-hover:text-spectrum">
                          {outil.nom}
                        </span>
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/60 md:text-base">
                        Plan de marquage, couche de données, pièges courants et
                        checklist de recette — d&apos;après des installations en
                        production.
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 flex-none text-foreground/30 transition-colors duration-300 group-hover:text-pink" />
                  </div>
                </Link>
              </Reveal>
            </div>
          </section>
        )}

        {/* ── Points de vigilance ── */}
        <section className="relative px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="À savoir">
                Points de <span className="text-spectrum">vigilance</span>
              </SectionTitle>
            </Reveal>

            <div className="mt-8 space-y-4">
              {outil.vigilance.map((v, i) => (
                <Reveal key={v} delay={Math.min(i, 4) * 0.06}>
                  <div className="flex gap-4 rounded-2xl border border-white/10 bg-ink-soft/50 px-5 py-5 md:px-7">
                    <TriangleAlert className="mt-0.5 h-5 w-5 flex-none text-pink/80" />
                    <p className="text-base leading-relaxed text-foreground/65">
                      {v}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Transparence ── */}
        <section className="relative px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-ink-soft/40 px-5 py-6 md:px-7 md:py-8">
                <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  Ce que nous n&apos;avons pas pu vérifier
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/55 md:text-base">
                  Par souci d&apos;honnêteté, voici les points sur lesquels nous
                  manquons d&apos;information à ce jour. Nous préférons les
                  signaler plutôt que de les combler par des suppositions.
                </p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {outil.lacunes.map((l) => (
                    <li key={l} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground/30" />
                      <span className="text-sm leading-relaxed text-foreground/55">
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-foreground/45">
                    Sources
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {outil.sources.map((s) => (
                      <li key={s.url}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-sm text-pink/85 underline-offset-4 transition-colors hover:text-pink hover:underline"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
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
                  {outil.nom} est-il fait pour votre parc ?
                </h2>
                <p className="relative mx-auto mt-4 max-w-lg text-foreground/60">
                  Nous opérons ces plateformes au quotidien pour une vingtaine de
                  parcs en France. Trente minutes suffisent à cadrer le choix
                  selon votre activité et vos objectifs de fréquentation.
                </p>
                <div className="relative mt-8 flex justify-center">
                  <CtaButton href={CALENDLY_AUDIT_PARC}>
                    Réserver mon audit
                  </CtaButton>
                </div>
                <p className="relative mt-6 text-sm text-foreground/45">
                  Voir aussi{" "}
                  <Link
                    href="/accompagnement-marketing-digital-parc-de-loisir"
                    className="text-pink underline-offset-4 transition-colors hover:underline"
                  >
                    notre accompagnement dédié aux parcs de loisirs
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
