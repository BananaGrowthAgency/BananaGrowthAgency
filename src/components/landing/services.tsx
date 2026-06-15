import { SERVICES } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { NeonIcon } from "@/components/neon-icon";

export function Services() {
  return (
    <section id="services" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-base uppercase tracking-[0.2em] md:text-xl text-pink/80">
            Nos services
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Un cocktail de services qui{" "}
            <span className="text-spectrum">porte ses fruits</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="group flex flex-col items-center text-center transition-transform duration-300 ease-out hover:-translate-y-1.5">
                <NeonIcon
                  src={`/canva/icons/${s.icon}.png`}
                  className="h-28 w-28 object-contain transition-transform duration-300 ease-out group-hover:scale-110 md:h-40 md:w-40"
                />
                <h3 className="mt-5 font-display text-3xl font-bold text-foreground md:text-4xl">
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
