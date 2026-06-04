import { SERVICES } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { NeonIcon } from "@/components/neon-icon";

export function Services() {
  return (
    <section id="services" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-pink/80">
            Nos services
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Un cocktail de services qui{" "}
            <span className="text-spectrum">porte ses fruits</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="flex flex-col items-center text-center">
                <NeonIcon
                  src={`/canva/icons/${s.icon}.png`}
                  className="h-24 w-24 object-contain md:h-32 md:w-32"
                />
                <h3 className="mt-5 font-display text-xl font-bold text-foreground md:text-2xl">
                  {s.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-foreground/55">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
