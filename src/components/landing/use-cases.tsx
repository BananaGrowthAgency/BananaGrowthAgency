import Image from "next/image";
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
            Ils ont obtenu des{" "}
            <span className="text-spectrum">résultats fructueux</span>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {USE_CASES.map((u, i) => {
            const reversed = i % 2 === 1;

            const text = (
              <div className="text-center">
                <span className="inline-block rounded-full border border-pink/20 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-pink/85">
                  {u.channel}
                </span>
                <p className="mx-auto mt-5 max-w-md font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
                  {u.context}
                </p>
                <p className="mt-6 font-display text-3xl font-bold leading-tight text-spectrum md:text-4xl">
                  {u.headline}
                </p>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-foreground/55 md:text-base">
                  {u.detail}
                </p>
              </div>
            );

            if (!u.image) {
              return (
                <Reveal key={`${u.channel}-${i}`} className="mx-auto max-w-2xl">
                  {text}
                </Reveal>
              );
            }

            return (
              <Reveal key={`${u.channel}-${i}`}>
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                  <div className={reversed ? "md:order-2" : ""}>
                    <div className="relative mx-auto w-full max-w-xl">
                      <div className="pointer-events-none absolute inset-0 -z-10 bg-spectrum-radial opacity-60 blur-2xl" />
                      <Image
                        src={`/canva/usecases/${u.image}.png`}
                        alt={`Résultat ${u.channel} — ${u.headline}`}
                        width={1600}
                        height={1100}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="h-auto w-full object-contain drop-shadow-[0_18px_50px_rgba(255,46,154,0.18)]"
                      />
                    </div>
                  </div>
                  <div className={reversed ? "md:order-1" : ""}>{text}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
