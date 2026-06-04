import {
  Compass,
  BarChart3,
  Search,
  Clapperboard,
  Megaphone,
  Mail,
  PenLine,
  Gauge,
  MousePointerClick,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Reveal } from "@/components/reveal";

const ICONS: Record<string, LucideIcon> = {
  Compass,
  BarChart3,
  Search,
  Clapperboard,
  Megaphone,
  Mail,
  PenLine,
  Gauge,
  MousePointerClick,
};

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
          <p className="mt-4 text-foreground/60">
            Tous les leviers d&apos;acquisition gérés en interne, du premier clic
            à la conversion.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl border border-white/10 bg-ink-soft/60 p-6 transition-all duration-300 hover:border-pink/40 hover:neon-ring">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-pink/20 bg-pink/10 text-pink transition-colors group-hover:bg-pink/15">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
