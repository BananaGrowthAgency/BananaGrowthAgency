"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6500;

function Stars() {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 0.1 + i * 0.08,
            type: "spring",
            stiffness: 500,
            damping: 18,
          }}
        >
          <Star className="h-5 w-5 fill-yellow text-yellow drop-shadow-[0_0_6px_rgba(255,210,30,0.5)]" />
        </motion.span>
      ))}
    </div>
  );
}

type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  photo: string;
  logo: string;
  company: string;
};

type TestimonialProps = {
  items?: readonly TestimonialItem[];
  eyebrow?: string;
  title?: ReactNode;
  /** Hauteur réservée pour la citation, afin que les flèches ne bougent pas
   * d'un avis à l'autre. À augmenter pour des témoignages plus longs. */
  quoteMinH?: string;
};

export function Testimonial({
  items = TESTIMONIALS,
  eyebrow = "Avis",
  title = (
    <>
      Ils adorent notre <span className="text-spectrum">cocktail</span>
    </>
  ),
  quoteMinH = "min-h-[13rem] md:min-h-[9rem]",
}: TestimonialProps) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const go = useCallback(
    (next: number) => {
      setState(([cur]) => {
        const wrapped = (next + count) % count;
        return [wrapped, next < cur ? -1 : 1];
      });
    },
    [count],
  );

  // Autoplay (pause au survol).
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setState(([cur]) => [(cur + 1) % count, 1]);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const t = items[index];

  return (
    <section id="avis" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <span className="text-base uppercase tracking-[0.2em] md:text-xl text-pink/80">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
        </Reveal>

        <Reveal>
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Scène */}
            <div className="relative overflow-hidden px-10 md:px-0">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir >= 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir >= 0 ? -50 : 50 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) go(index + 1);
                    else if (info.offset.x > 80) go(index - 1);
                  }}
                  className="flex cursor-grab flex-col items-center text-center active:cursor-grabbing"
                >
                  <Stars />

                  <blockquote
                    className={cn(
                      "mt-6 flex max-w-3xl items-center justify-center font-display text-lg font-medium italic leading-relaxed text-foreground md:text-2xl",
                      quoteMinH,
                    )}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Photo ronde */}
                  <div className="relative mt-8 h-24 w-24 md:h-28 md:w-28">
                    <span className="absolute -inset-1 rounded-full bg-spectrum opacity-70 blur-md" />
                    <Image
                      src={`/canva/photos/${t.photo}.jpg`}
                      alt={t.author}
                      width={140}
                      height={140}
                      className="relative h-full w-full rounded-full border-2 border-pink/50 object-cover"
                    />
                  </div>

                  <figcaption className="mt-5">
                    <span className="block font-display text-xl font-bold text-foreground md:text-2xl">
                      {t.author}
                    </span>
                    <span className="mt-1 block text-sm italic text-foreground/55">
                      {t.role}
                    </span>
                  </figcaption>

                  {/* Logo entreprise */}
                  <div className="mt-4 flex h-10 items-center justify-center">
                    <Image
                      src={`/canva/clients/${t.logo}.png`}
                      alt={t.company}
                      width={200}
                      height={64}
                      className="h-9 w-auto object-contain opacity-90 md:h-10"
                    />
                  </div>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Flèches */}
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Avis précédent"
              className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-pink/30 bg-ink/80 text-foreground/80 backdrop-blur-sm transition-all hover:scale-110 hover:border-transparent hover:text-white hover:[background-image:linear-gradient(100deg,#ffd21e,#ff7a18,#ff2e9a)] hover:shadow-[0_0_20px_rgba(255,46,154,0.5)] md:-left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Avis suivant"
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-pink/30 bg-ink/80 text-foreground/80 backdrop-blur-sm transition-all hover:scale-110 hover:border-transparent hover:text-white hover:[background-image:linear-gradient(100deg,#ffd21e,#ff7a18,#ff2e9a)] hover:shadow-[0_0_20px_rgba(255,46,154,0.5)] md:-right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Points */}
          <div className="mt-9 flex items-center justify-center gap-2.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Avis ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-7 bg-spectrum"
                    : "w-2 bg-white/20 hover:bg-white/40",
                )}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
