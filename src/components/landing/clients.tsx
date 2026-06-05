import Image from "next/image";
import { CLIENTS } from "@/lib/site";

export function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-white/10 py-10">
      <p className="mb-8 text-center text-sm uppercase tracking-[0.2em] md:text-base text-pink">
        Ils nous font confiance
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 pr-14 hover:[animation-play-state:paused]">
          {row.map((c, i) => {
            const overlayStyle = {
              ["--logo-mask" as string]: `url(/canva/clients/${c.file}.png)`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            } as React.CSSProperties;
            return (
              <span
                key={`${c.file}-${i}`}
                className="group relative inline-flex h-9 shrink-0 md:h-11"
              >
                {/* Image invisible : sert uniquement à réserver la largeur du logo. */}
                <Image
                  src={`/canva/clients/${c.file}.png`}
                  alt={c.name}
                  width={200}
                  height={80}
                  className="h-full w-auto opacity-0"
                />
                {/* Logo masqué : blanc atténué (sans couleur) au repos, passe au
                    dégradé spectre + glow néon au survol. */}
                <span
                  aria-hidden
                  style={overlayStyle}
                  className="pointer-events-none absolute inset-0 bg-white/60 transition-all duration-300 ease-out [mask-image:var(--logo-mask)] [-webkit-mask-image:var(--logo-mask)] group-hover:[background-image:linear-gradient(100deg,#ffd21e_0%,#ff7a18_50%,#ff2e9a_100%)] group-hover:[filter:drop-shadow(0_0_10px_rgba(255,46,154,0.75))_drop-shadow(0_0_22px_rgba(255,122,24,0.5))]"
                />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
