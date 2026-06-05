import { CALENDLY_URL, FINAL_CTA } from "@/lib/site";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";
import { NeonIcon } from "@/components/neon-icon";

export function Cta() {
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
              className="h-16 w-16 object-contain md:h-20 md:w-20"
              wrapperClassName="relative mx-auto mb-6 block w-fit"
            />
            <h2 className="relative font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Prêt à <span className="text-spectrum">vitaminer</span>&nbsp;votre
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
