import Image from "next/image";
import { CLIENTS } from "@/lib/site";

export function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-white/10 py-10">
      <p className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-foreground/40">
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
                {/* Logo blanc atténué au repos, s'efface au survol */}
                <Image
                  src={`/canva/clients/${c.file}.png`}
                  alt={c.name}
                  width={200}
                  height={80}
                  className="h-full w-auto opacity-55 transition-opacity duration-300 ease-out group-hover:opacity-0"
                />
                {/* Remplissage dégradé spectre + glow néon. Le MASQUE et le fond
                    ne s'appliquent qu'au survol → au repos l'overlay est vide
                    (aucune couche de masque pendant le défilement = fluide). */}
                <span
                  aria-hidden
                  style={overlayStyle}
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:bg-spectrum group-hover:opacity-100 group-hover:[mask-image:var(--logo-mask)] group-hover:[-webkit-mask-image:var(--logo-mask)] group-hover:[filter:drop-shadow(0_0_10px_rgba(255,46,154,0.75))_drop-shadow(0_0_22px_rgba(255,122,24,0.5))]"
                />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
