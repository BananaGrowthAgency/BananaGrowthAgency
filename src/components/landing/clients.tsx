import { CLIENTS } from "@/lib/site";

export function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-white/10 py-8">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-foreground/40">
        Ils nous font confiance
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 pr-12">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-lg font-semibold text-foreground/45 transition-colors hover:text-pink md:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
