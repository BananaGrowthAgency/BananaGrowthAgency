import Image from "next/image";
import { Quote } from "lucide-react";
import { TESTIMONIAL } from "@/lib/site";
import { Reveal } from "@/components/reveal";

const AVATARS = ["team-01", "team-02", "team-03", "team-04", "team-05"];

export function Testimonial() {
  return (
    <section id="avis" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-pink/80">
            Avis
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ils adorent notre{" "}
            <span className="text-spectrum">cocktail</span>
          </h2>
          <div className="mt-6 flex items-center justify-center -space-x-3">
            {AVATARS.map((a) => (
              <Image
                key={a}
                src={`/canva/photos/${a}.jpg`}
                alt=""
                width={48}
                height={48}
                className="h-11 w-11 rounded-full border-2 border-ink object-cover ring-1 ring-pink/30"
              />
            ))}
          </div>
        </Reveal>
        <Reveal>
          <figure className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 p-8 text-center neon-ring md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-50" />
            <Quote className="relative mx-auto h-9 w-9 text-pink" />
            <blockquote className="relative mt-6 font-display text-lg font-medium leading-relaxed text-foreground md:text-xl">
              {TESTIMONIAL.quote}
            </blockquote>
            <figcaption className="relative mt-6">
              <span className="block font-semibold text-pink">
                {TESTIMONIAL.author}
              </span>
              <span className="text-sm text-foreground/50">
                {TESTIMONIAL.role}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
