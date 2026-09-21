import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { OUTILS, OUTILS_HUB } from "@/lib/outils";
import { CALENDLY_AUDIT_PARC } from "@/lib/site";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";

export const metadata = pageMetadata({
  title:
    "Logiciels pour parcs de loisirs : billetterie, caisse et réservation | Banana Growth Agency",
  description:
    "Qweekle, PlayPro, Apex Timing, ROLLER, BMI Leisure : à qui s'adresse chaque logiciel de gestion pour parc de loisirs, ses fonctionnalités clés et ses tarifs. Fiches indépendantes, par une agence qui opère ces outils.",
  path: "/outils-parc-de-loisirs",
});

export default function OutilsHubPage() {
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
                {OUTILS_HUB.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {OUTILS_HUB.title}{" "}
                <span className="text-spectrum">{OUTILS_HUB.titleHighlight}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg leading-relaxed text-foreground/70 md:text-xl">
                {OUTILS_HUB.intro}
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-4 text-base leading-relaxed text-foreground/60 md:text-lg">
                {OUTILS_HUB.intro2}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Les fiches ── */}
        <section className="relative px-4 py-10 md:py-14">
          <div className="mx-auto max-w-4xl space-y-4">
            {OUTILS.map((o, i) => (
              <Reveal key={o.slug} delay={Math.min(i, 5) * 0.06}>
                <Link
                  href={`/outils-parc-de-loisirs/${o.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-ink-soft/50 px-5 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink/40 hover:bg-ink-soft/70 md:px-8 md:py-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                        <span className="transition-colors group-hover:text-spectrum">
                          {o.nom}
                        </span>
                      </h2>
                      <p className="mt-1 text-sm text-foreground/45">
                        Éditeur {o.editeur.pays}
                        {o.editeur.depuis && ` · depuis ${o.editeur.depuis}`}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 flex-none text-foreground/30 transition-all duration-300 group-hover:text-pink" />
                  </div>

                  <p className="mt-4 text-base leading-relaxed text-foreground/65">
                    {o.baseline}
                  </p>

                  <p className="mt-4 border-t border-white/10 pt-4 text-sm text-foreground/50">
                    <span className="font-semibold uppercase tracking-[0.12em] text-foreground/40">
                      Pour qui
                    </span>{" "}
                    — {o.pourQuiCourt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Méthode & suite ── */}
        <section className="relative px-4 py-14 md:py-20">
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-2xl border border-white/10 bg-ink-soft/40 px-5 py-6 md:px-7 md:py-7">
                <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  {OUTILS_HUB.methodo.titre}
                </h2>
                <ul className="mt-4 space-y-3">
                  {OUTILS_HUB.methodo.lignes.map((l) => (
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
                  {OUTILS_HUB.suite.titre}
                </h2>
                <ul className="mt-4 space-y-3">
                  {OUTILS_HUB.suite.lignes.map((l) => (
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
                  {OUTILS_HUB.cta.titre}
                </h2>
                <p className="relative mx-auto mt-4 max-w-lg text-foreground/60">
                  {OUTILS_HUB.cta.texte}
                </p>
                <div className="relative mt-8 flex justify-center">
                  <CtaButton href={CALENDLY_AUDIT_PARC}>
                    {OUTILS_HUB.cta.bouton}
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
