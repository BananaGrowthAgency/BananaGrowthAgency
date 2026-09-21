import Link from "next/link";
import { ArrowRight, ArrowUpRight, TriangleAlert } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { GUIDES } from "@/lib/tracking";
import { TAGGAGE_HUB } from "@/lib/tracking/hub";
import { CALENDLY_AUDIT_PARC } from "@/lib/site";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";

export const metadata = pageMetadata({
  title:
    "Plan de taggage pour parc de loisirs : le guide par moteur de réservation | Banana Growth Agency",
  description:
    "Vos conversions Google Ads ne collent pas avec votre caisse ? Les quatre causes, et un plan de taggage détaillé pour chaque moteur de réservation.",
  path: "/plan-de-taggage-parc-de-loisirs",
});

export default function PlanDeTaggagePage() {
  return (
    <>
      <Navbar />
      <main className="reading-scrim relative">
        {/* ── En-tête ── */}
        <section className="relative overflow-hidden px-4 pb-12 pt-28 md:pt-32">
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
                {TAGGAGE_HUB.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {TAGGAGE_HUB.title}{" "}
                <span className="text-spectrum">
                  {TAGGAGE_HUB.titleHighlight}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg leading-relaxed text-foreground/75 md:text-xl">
                {TAGGAGE_HUB.chapo}
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-4 text-base leading-relaxed text-foreground/60 md:text-lg">
                {TAGGAGE_HUB.intro}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-4 text-base leading-relaxed text-foreground/60 md:text-lg">
                {TAGGAGE_HUB.intro2}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Les guides par outil ── */}
        <section className="relative px-4 py-10 md:py-14">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Le guide de <span className="text-spectrum">votre moteur</span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/60 md:text-lg">
                Chaque moteur de réservation a son architecture, ses noms
                d&apos;événements et ses pièges. Choisissez le vôtre.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {GUIDES.map((g, i) => (
                <Reveal
                  key={g.slug}
                  delay={Math.min(i, 4) * 0.06}
                  className="h-full"
                >
                  <Link
                    href={`/plan-de-taggage-parc-de-loisirs/${g.slug}`}
                    className="card-link group flex h-full flex-col rounded-2xl border bg-ink-soft/50 px-5 py-6 md:px-7 md:py-7"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-spectrum md:text-3xl">
                        {g.nom}
                      </span>
                      <ArrowUpRight className="card-arrow mt-1 h-5 w-5 flex-none text-pink/60 group-hover:text-pink" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                      {g.pilier.chapo.split(".")[0]}.
                    </p>
                    <span className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                      {g.plateformes.map((p) => (
                        <span
                          key={p.slug}
                          className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-foreground/50"
                        >
                          {p.nom}
                        </span>
                      ))}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-pink">
                      Ouvrir le plan de taggage
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Symptômes ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {TAGGAGE_HUB.symptomes.titre}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-7 space-y-2.5">
                {TAGGAGE_HUB.symptomes.liste.map((s) => (
                  <li
                    key={s}
                    className="flex gap-3 rounded-xl border border-white/10 bg-ink-soft/40 px-4 py-3 md:px-5"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-pink/60" />
                    <span className="text-base leading-relaxed text-foreground/70">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-foreground/65 md:text-lg">
                {TAGGAGE_HUB.symptomes.conclusion}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Les causes ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {TAGGAGE_HUB.causes.titre}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-4">
              {TAGGAGE_HUB.causes.liste.map((c, i) => (
                <Reveal key={c.titre} delay={Math.min(i, 4) * 0.05}>
                  <div className="flex gap-4 rounded-2xl border border-white/10 bg-ink-soft/50 px-5 py-5 md:px-7 md:py-6">
                    <TriangleAlert className="mt-1 h-5 w-5 flex-none text-pink/80" />
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                        {c.titre}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-foreground/65">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparatif ── */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {TAGGAGE_HUB.comparatif.titre}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/60 md:text-lg">
                {TAGGAGE_HUB.comparatif.intro}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[40rem] border-collapse text-left">
                  <thead>
                    <tr className="bg-ink-soft/70">
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/40 md:px-5">
                        Critère
                      </th>
                      {TAGGAGE_HUB.comparatif.colonnes.map((c) => (
                        <th
                          key={c}
                          className="px-4 py-3 font-display text-base tracking-tight text-foreground md:px-5 md:text-lg"
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TAGGAGE_HUB.comparatif.lignes.map((l, i) => (
                      <tr
                        key={l.critere}
                        className={
                          i % 2 === 0 ? "bg-ink-soft/40" : "bg-ink-soft/20"
                        }
                      >
                        <td className="px-4 py-3 text-sm text-foreground/60 md:px-5">
                          {l.critere}
                        </td>
                        {l.valeurs.map((v, j) => (
                          <td
                            key={`${l.critere}-${j}`}
                            className={`px-4 py-3 text-sm md:px-5 ${
                              v === "Oui" || v === "Conforme" || v === "Faible"
                                ? "font-semibold text-pink"
                                : "text-foreground/60"
                            }`}
                          >
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-sm text-foreground/45">
                Comparaison établie sur des installations en production, et non
                sur la documentation commerciale des éditeurs. Le détail de
                chaque moteur figure dans{" "}
                <Link
                  href="/logiciel-gestion-parc-de-loisirs"
                  className="text-pink underline-offset-4 transition-colors hover:underline"
                >
                  sa fiche outil
                </Link>
                .
              </p>
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
                  {TAGGAGE_HUB.cta.titre}
                </h2>
                <p className="relative mx-auto mt-4 max-w-lg text-foreground/60">
                  {TAGGAGE_HUB.cta.texte}
                </p>
                <div className="relative mt-8 flex justify-center">
                  <CtaButton href={CALENDLY_AUDIT_PARC}>
                    {TAGGAGE_HUB.cta.bouton}
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
