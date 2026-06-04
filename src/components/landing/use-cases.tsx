import { TrendingUp } from "lucide-react";
import { USE_CASES } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function UseCases() {
  return (
    <section id="use-cases" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-pink/80">
            Use Case
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Des résultats qui{" "}
            <span className="text-spectrum">parlent d&apos;eux-mêmes</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u, i) => (
            <Reveal key={`${u.tag}-${i}`} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-2xl border border-white/10 bg-ink-soft/60 p-6 transition-all duration-300 hover:border-pink/40 hover:neon-ring">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-pink/20 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-pink/85">
                    {u.tag}
                  </span>
                  <TrendingUp className="h-4 w-4 text-pink/60 transition-colors group-hover:text-pink" />
                </div>
                <p className="mt-5 font-display text-3xl font-bold text-spectrum">
                  {u.metric}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground/70">
                  {u.unit}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/50">
                  {u.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
