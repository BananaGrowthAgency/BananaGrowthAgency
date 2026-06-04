import { CALENDLY_URL, FINAL_CTA } from "@/lib/site";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";

export function Cta() {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-ink-soft/80 px-6 py-14 text-center neon-ring md:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
            <h2 className="relative font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Prêt à <span className="text-spectrum">vitaminer</span> votre
              croissance&nbsp;?
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-foreground/60">
              {FINAL_CTA.subtitle}
            </p>
            <div className="relative mt-8 flex justify-center">
              <CtaButton href={CALENDLY_URL}>{FINAL_CTA.cta}</CtaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
