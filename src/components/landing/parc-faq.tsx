"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PARC } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

/**
 * FAQ en accordéon.
 *
 * Toutes les réponses sont rendues dans le HTML, ouvertes ou non : seule
 * leur hauteur est repliée en CSS. Google et les IA lisent donc la FAQ
 * complète sans avoir à cliquer, ce qui n'était pas le cas quand les
 * réponses fermées n'étaient montées qu'à l'ouverture. Le balisage
 * FAQPage reprend les mêmes questions pour les résultats enrichis.
 *
 * Sans `items`, affiche la FAQ de la landing parcs de loisirs.
 */
export function ParcFaq({ items = PARC.faq }: { items?: readonly FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="relative px-4 py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-12 text-center">
          <span className="text-base uppercase tracking-[0.2em] md:text-xl text-pink/80">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Les questions <span className="text-spectrum">fréquentes</span>
          </h2>
        </Reveal>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <Reveal key={item.q} delay={Math.min(i, 6) * 0.04}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-ink-soft/60 transition-colors",
                    isOpen ? "border-pink/40 neon-ring" : "border-white/10",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={id}
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
                  </h3>
                  {/* Repli en grid-rows : la réponse reste dans le DOM. */}
                  <div
                    id={id}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-base leading-relaxed text-foreground/65 md:px-6 md:pb-6">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
