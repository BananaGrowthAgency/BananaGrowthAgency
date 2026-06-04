import Image from "next/image";
import { DIFFERENTIATION, CALENDLY_URL } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta-button";

const HIGHLIGHT_ICONS = ["shield", "trophy"];

export function Differentiation() {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 neon-ring">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

            <div className="relative grid md:grid-cols-2">
              {/* Texte — à gauche */}
              <div className="p-8 md:p-12">
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

                <ul className="mt-8 space-y-4">
                  {DIFFERENTIATION.highlights.map((h, i) => (
                    <li key={h} className="flex items-center gap-3">
                      <span className="neon-step is-lit flex-none">
                        <Image
                          src={`/canva/steps/${HIGHLIGHT_ICONS[i] ?? "trophy"}.png`}
                          alt=""
                          width={96}
                          height={96}
                          className="h-11 w-11 object-contain"
                        />
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

              {/* Image — à droite, pleine hauteur */}
              <div className="relative min-h-[18rem] border-t border-pink/15 md:min-h-full md:border-l md:border-t-0">
                <Image
                  src="/canva/photos/qui-sommes-nous.jpg"
                  alt="L'équipe Banana Growth Agency"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
