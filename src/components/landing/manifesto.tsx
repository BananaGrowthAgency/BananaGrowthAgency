import { PROBLEM } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Manifesto() {
  return (
    <section id="manifesto" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="text-base uppercase tracking-[0.2em] md:text-xl text-pink/80">
            Manifesto
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {PROBLEM.title}
          </h2>
          <p className="mt-6 text-lg text-foreground/70">{PROBLEM.intro}</p>
        </Reveal>

        <div className="mt-8 space-y-4">
          {PROBLEM.lines.map((line, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-foreground/55 md:text-lg">
                {line}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {(() => {
              // Coupure nette apres la virgule pour eviter un retour a la ligne
              // au milieu d'un groupe de mots (ex. apres « que »).
              const [first, ...rest] = PROBLEM.punch.split(", ");
              const second = rest.join(", ");
              return (
                <span className="text-spectrum">
                  {first},
                  <br />
                  {second}
                </span>
              );
            })()}
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base text-foreground/70 md:text-lg">
            {PROBLEM.outro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
