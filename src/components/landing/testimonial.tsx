import { Quote } from "lucide-react";
import { TESTIMONIAL } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Testimonial() {
  return (
    <section id="avis" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <figure className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 p-8 text-center neon-ring md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-50" />
            <Quote className="relative mx-auto h-9 w-9 text-pink" />
            <blockquote className="relative mt-6 font-display text-xl font-medium leading-relaxed text-foreground md:text-2xl">
              “{TESTIMONIAL.quote}”
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
