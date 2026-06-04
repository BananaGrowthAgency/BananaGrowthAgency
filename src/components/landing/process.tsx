import { PROCESS } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Process() {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-pink/80">
            Notre méthode
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Une recette simple et{" "}
            <span className="text-spectrum">efficace</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-ink-soft/60 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-pink/30 bg-pink/10 font-display text-lg font-bold text-spectrum">
                  {p.step}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-foreground/65">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
