import { Check } from "lucide-react";
import { DIFFERENTIATION, CALENDLY_URL } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta-button";

export function Differentiation() {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 p-8 neon-ring md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

            <div className="relative">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                En quoi sommes-nous{" "}
                <span className="text-spectrum">différents&nbsp;?</span>
              </h2>

              <div className="mt-6 space-y-4">
                {DIFFERENTIATION.lines.map((line, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-foreground/65 md:text-lg"
                  >
                    {line}
                  </p>
                ))}
              </div>

              <ul className="mt-8 space-y-3">
                {DIFFERENTIATION.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-pink/30 bg-pink/10 text-pink">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-display text-lg font-semibold text-foreground">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-base text-foreground/60 md:text-lg">
                {DIFFERENTIATION.closing}
              </p>

              <div className="mt-8">
                <CtaButton href={CALENDLY_URL}>Prendre Rendez-vous</CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
