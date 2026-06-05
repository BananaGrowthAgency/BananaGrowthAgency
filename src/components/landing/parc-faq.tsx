"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { PARC } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function ParcFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-12 text-center">
          <span className="text-sm uppercase tracking-[0.2em] md:text-base text-pink/80">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Les questions <span className="text-spectrum">fréquentes</span>
          </h2>
        </Reveal>

        <div className="space-y-3">
          {PARC.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-ink-soft/60 transition-colors",
                    isOpen ? "border-pink/40 neon-ring" : "border-white/10",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  >
                    <span className="font-display text-lg font-bold tracking-tight text-foreground md:text-xl">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 flex-none items-center justify-center rounded-full transition-all duration-300",
                        isOpen
                          ? "rotate-45 bg-spectrum text-white"
                          : "bg-white/10 text-pink",
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-5 text-base leading-relaxed text-foreground/65 md:px-6 md:pb-6">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
