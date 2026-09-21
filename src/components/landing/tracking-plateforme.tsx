import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, TriangleAlert } from "lucide-react";
import type { GuideOutil, Plateforme } from "@/lib/tracking";
import { CALENDLY_AUDIT_PARC } from "@/lib/site";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";

function SectionTitle({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <span className="text-sm uppercase tracking-[0.2em] text-pink/80 md:text-base">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {children}
      </h2>
    </>
  );
}

/** Bloc de code, scrollable horizontalement sur mobile. */
function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-[#06040f]/80 px-4 py-4 md:px-5">
      <code className="font-mono text-xs leading-relaxed text-foreground/75 md:text-[13px]">
        {children}
      </code>
    </pre>
  );
}

export function TrackingPlateforme({
  guide,
  plateforme,
}: {
  guide: GuideOutil;
  plateforme: Plateforme;
}) {
  const autres = guide.plateformes.filter((p) => p.slug !== plateforme.slug);

  return (
    <>
      <Navbar />
      <main className="reading-scrim relative">
        {/* ── En-tête ── */}
        <section className="relative overflow-hidden px-4 pb-10 pt-28 md:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <Link
                href={`/plan-de-taggage-parc-de-loisirs/${guide.slug}`}
                className="inline-flex items-center gap-2 text-sm text-foreground/55 transition-colors hover:text-pink"
              >
                <ArrowLeft className="h-4 w-4" />
                Plan de taggage {guide.nom}
              </Link>
            </Reveal>

            <Reveal delay={0.06}>
              <span className="mt-6 inline-block rounded-full border border-pink/30 bg-pink/10 px-4 py-1.5 text-sm uppercase tracking-[0.2em] text-pink">
                {plateforme.nom}
              </span>
            </Reveal>

            <Reveal delay={0.12}>
              <h1 className="mt-5 font-display text-3xl font-bold uppercase leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {plateforme.titre}
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 text-base leading-relaxed text-foreground/70 md:text-lg">
                {plateforme.chapo}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Prérequis ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-ink-soft/50 px-5 py-6 md:px-7">
                <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  Avant de commencer
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {plateforme.prerequis.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check className="mt-1 h-4 w-4 flex-none text-pink" />
                      <span className="text-base leading-relaxed text-foreground/70">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Variables ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Étape 1">
                Les <span className="text-spectrum">variables</span> à créer
              </SectionTitle>
            </Reveal>
            <div className="mt-8 space-y-3">
              {plateforme.variables.map((v, i) => (
                <Reveal key={v.nom} delay={Math.min(i, 5) * 0.04}>
                  <div className="rounded-xl border border-white/10 bg-ink-soft/50 px-4 py-4 md:px-5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-lg tracking-tight text-foreground">
                        {v.nom}
                      </span>
                      <span className="text-xs uppercase tracking-[0.12em] text-foreground/40">
                        {v.type}
                      </span>
                    </div>
                    <code className="mt-1.5 block font-mono text-sm text-pink/90">
                      {v.cle}
                    </code>
                    {v.note && (
                      <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                        {v.note}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Déclencheurs ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Étape 2">
                Les <span className="text-spectrum">déclencheurs</span>
              </SectionTitle>
            </Reveal>
            <div className="mt-8 space-y-3">
              {plateforme.declencheurs.map((d, i) => (
                <Reveal key={d.nom} delay={Math.min(i, 5) * 0.04}>
                  <div className="rounded-xl border border-white/10 bg-ink-soft/50 px-4 py-4 md:px-5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-lg tracking-tight text-foreground">
                        {d.nom}
                      </span>
                      <span className="text-xs uppercase tracking-[0.12em] text-foreground/40">
                        {d.type}
                      </span>
                    </div>
                    <code className="mt-1.5 block font-mono text-sm text-pink/90">
                      {d.condition}
                    </code>
                    {d.note && (
                      <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                        {d.note}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Balises ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Étape 3">
                Les <span className="text-spectrum">balises</span>
              </SectionTitle>
              <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
                Les noms suivent la convention que nous utilisons en production :
                le rôle de la balise se lit d&apos;un coup d&apos;œil dans la
                liste, même après plusieurs années.
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {plateforme.balises.map((b, i) => (
                <Reveal key={b.nom} delay={Math.min(i, 4) * 0.05}>
                  <div className="rounded-2xl border border-white/10 bg-ink-soft/50 px-5 py-5 md:px-7 md:py-6">
                    <h3 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                      {b.nom}
                    </h3>
                    <div className="mt-2 flex flex-col gap-1 text-sm sm:flex-row sm:gap-5">
                      <span className="text-foreground/55">
                        <span className="text-foreground/35">Type — </span>
                        {b.type}
                      </span>
                      <span className="text-foreground/55">
                        <span className="text-foreground/35">
                          Déclencheur —{" "}
                        </span>
                        {b.declencheur}
                      </span>
                    </div>

                    {b.champs && (
                      <dl className="mt-4 space-y-1.5 border-l-2 border-pink/30 pl-4">
                        {b.champs.map((c) => (
                          <div
                            key={c.cle}
                            className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
                          >
                            <dt className="w-52 flex-none text-sm text-foreground/45">
                              {c.cle}
                            </dt>
                            <dd className="font-mono text-sm text-foreground/75">
                              {c.valeur}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {b.code && <Code>{b.code}</Code>}

                    {b.note && (
                      <p className="mt-4 border-l-2 border-white/15 pl-4 text-sm leading-relaxed text-foreground/55">
                        {b.note}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pièges ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Pièges">
                Ce qui casse le{" "}
                <span className="text-spectrum">plus souvent</span>
              </SectionTitle>
            </Reveal>
            <div className="mt-8 space-y-4">
              {plateforme.pieges.map((p, i) => (
                <Reveal key={p.titre} delay={Math.min(i, 4) * 0.05}>
                  <div className="flex gap-3 rounded-2xl border border-white/10 bg-ink-soft/50 px-5 py-5 md:px-7">
                    <TriangleAlert className="mt-1 h-5 w-5 flex-none text-pink/80" />
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-foreground md:text-xl">
                        {p.titre}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-foreground/65">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Vérification ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Recette">
                Vérifier que ça <span className="text-spectrum">fonctionne</span>
              </SectionTitle>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-2.5">
                {plateforme.verification.map((v) => (
                  <li
                    key={v}
                    className="flex gap-3 rounded-xl border border-white/10 bg-ink-soft/40 px-4 py-3 md:px-5"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-none text-pink" />
                    <span className="text-sm leading-relaxed text-foreground/70 md:text-base">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Les autres plateformes ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Les autres plateformes sur {guide.nom}
              </h2>
            </Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {autres.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05} className="h-full">
                  <Link
                    href={`/plan-de-taggage-parc-de-loisirs/${guide.slug}/${p.slug}`}
                    className="card-link group flex h-full flex-col rounded-2xl border bg-ink-soft/50 px-4 py-4 md:px-5 md:py-5"
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-display text-lg font-bold tracking-tight text-foreground">
                        {p.nom}
                      </span>
                      <ArrowUpRight className="card-arrow mt-0.5 h-4 w-4 flex-none text-pink/60 group-hover:text-pink" />
                    </span>
                    <span className="mt-1 text-sm leading-snug text-foreground/50">
                      {p.titre}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative px-4 pb-24 pt-6">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-ink-soft/80 px-6 py-12 text-center neon-ring md:px-12 md:py-14">
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
                <h2 className="relative font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Vos conversions ne collent pas avec votre caisse ?
                </h2>
                <p className="relative mx-auto mt-4 max-w-lg text-foreground/60">
                  C&apos;est le symptôme le plus courant, et il a presque
                  toujours l&apos;une des causes listées ci-dessus. Nous auditons
                  votre installation et vous disons ce qui se perd, où, et
                  combien ça coûte.
                </p>
                <div className="relative mt-8 flex justify-center">
                  <CtaButton href={CALENDLY_AUDIT_PARC}>
                    Réserver mon audit
                  </CtaButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
