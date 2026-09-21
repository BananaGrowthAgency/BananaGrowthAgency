import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import type { GuideOutil } from "@/lib/tracking";
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

/** Une destination dans la vue d'ensemble. « — » se grise. */
function Destination({ label, valeur }: { label: string; valeur: string }) {
  const vide = valeur === "—";
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <span className="w-28 flex-none text-xs font-semibold uppercase tracking-[0.12em] text-foreground/40">
        {label}
      </span>
      <span
        className={
          vide
            ? "text-sm text-foreground/25"
            : "text-sm leading-relaxed text-foreground/70"
        }
      >
        {valeur}
      </span>
    </div>
  );
}

export function TrackingGuide({ guide }: { guide: GuideOutil }) {
  const { pilier } = guide;

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
                href={`/outils-parc-de-loisirs/${guide.slug}`}
                className="inline-flex items-center gap-2 text-sm text-foreground/55 transition-colors hover:text-pink"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à la fiche {guide.nom}
              </Link>
            </Reveal>

            <Reveal delay={0.06}>
              <span className="mt-6 inline-block rounded-full border border-pink/30 bg-pink/10 px-4 py-1.5 text-sm uppercase tracking-[0.2em] text-pink">
                Plan de taggage
              </span>
            </Reveal>

            <Reveal delay={0.12}>
              <h1 className="mt-5 font-display text-3xl font-bold uppercase leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {pilier.titre}
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 text-base leading-relaxed text-foreground/70 md:text-lg">
                {pilier.chapo}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Les quatre guides ── */}
        <section className="relative px-4 py-10 md:py-14">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Les guides par <span className="text-spectrum">plateforme</span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/60">
                Chaque plateforme a ses balises, ses noms d&apos;événements et
                ses pièges. Un guide par destination, avec le code à copier.
              </p>
            </Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {guide.plateformes.map((p, i) => (
                <Reveal key={p.slug} delay={Math.min(i, 4) * 0.05} className="h-full">
                  <Link
                    href={`/outils-parc-de-loisirs/${guide.slug}/tracking/${p.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-soft/50 px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink/40 md:px-6 md:py-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-spectrum md:text-2xl">
                        {p.nom}
                      </span>
                      <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-foreground/30 transition-colors group-hover:text-pink" />
                    </div>
                    <span className="mt-2 text-sm leading-snug text-foreground/55">
                      {p.titre}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Architecture ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Architecture">
                Où se passe <span className="text-spectrum">l&apos;achat</span>
              </SectionTitle>
              <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
                {pilier.architecture.intro}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-3">
                {pilier.architecture.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-pink/70" />
                    <span className="text-base leading-relaxed text-foreground/70">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Couche de données ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Couche de données">
                Ce que {guide.nom}{" "}
                <span className="text-spectrum">pousse réellement</span>
              </SectionTitle>
              <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
                {pilier.dataLayer.intro}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-2">
                {pilier.dataLayer.events.map((e) => (
                  <li
                    key={e.nom}
                    className="flex flex-col gap-1 rounded-xl border border-white/10 bg-ink-soft/50 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4 md:px-5"
                  >
                    <code className="font-mono text-sm text-pink">{e.nom}</code>
                    {e.note && (
                      <span className="text-sm text-foreground/55">
                        {e.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-6 rounded-2xl border border-white/10 bg-ink-soft/40 px-5 py-5 md:px-7">
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-foreground/45">
                  Variables disponibles
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {pilier.dataLayer.variables.map((v) => (
                    <li
                      key={v}
                      className="font-mono text-sm leading-relaxed text-foreground/60"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-6 rounded-2xl border border-pink/25 bg-ink-soft/60 px-5 py-6 neon-ring md:px-7">
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground md:text-xl">
                  Le point qui change tout
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/70">
                  {pilier.dataLayer.remarque}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Vue d'ensemble ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Vue d'ensemble">
                Quel événement vers{" "}
                <span className="text-spectrum">quelle destination</span>
              </SectionTitle>
              <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
                {pilier.parcours.intro}
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {pilier.parcours.etapes.map((e, i) => (
                <Reveal key={e.etape} delay={Math.min(i, 4) * 0.05}>
                  <div className="rounded-2xl border border-white/10 bg-ink-soft/50 px-5 py-5 md:px-7 md:py-6">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-white/10 pb-4">
                      <h3 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                        {e.etape}
                      </h3>
                      <code className="font-mono text-xs text-pink/90 md:text-sm">
                        {e.source}
                      </code>
                    </div>
                    <div className="mt-4 space-y-2.5">
                      <Destination label="GA4" valeur={e.ga4} />
                      <Destination label="Google Ads" valeur={e.ads} />
                      <Destination label="Meta" valeur={e.meta} />
                      <Destination label="TikTok" valeur={e.tiktok} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ordre de déploiement ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle eyebrow="Méthode">
                Dans quel <span className="text-spectrum">ordre</span>
              </SectionTitle>
            </Reveal>
            <Reveal delay={0.08}>
              <ol className="mt-8 space-y-3">
                {pilier.ordre.map((o, i) => (
                  <li
                    key={o}
                    className="flex gap-4 rounded-xl border border-white/10 bg-ink-soft/40 px-4 py-4 md:px-5"
                  >
                    <span className="font-display text-xl text-spectrum">
                      {i + 1}
                    </span>
                    <span className="text-base leading-relaxed text-foreground/70">
                      {o}
                    </span>
                  </li>
                ))}
              </ol>
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
                  Vos conversions ne collent pas avec votre caisse ?
                </h2>
                <p className="relative mx-auto mt-4 max-w-lg text-foreground/60">
                  C&apos;est le symptôme le plus courant, et il a presque
                  toujours l&apos;une des causes listées dans ces guides. Nous
                  auditons votre installation et vous disons ce qui se perd, où,
                  et combien ça coûte.
                </p>
                <div className="relative mt-8 flex justify-center">
                  <CtaButton href={CALENDLY_AUDIT_PARC}>
                    Réserver mon audit
                  </CtaButton>
                </div>
                <p className="relative mt-6 flex items-center justify-center gap-2 text-sm text-foreground/45">
                  <Check className="h-4 w-4 text-pink/70" />
                  Guides établis d&apos;après des installations en production
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
