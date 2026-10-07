"use client";

import { useState, type ReactNode } from "react";
import { Info } from "lucide-react";
import type { Version } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * Sélecteur de version, pour les moteurs dont deux générations coexistent.
 *
 * Les deux contenus sont rendus dans le HTML et masqués en CSS plutôt que
 * montés à la demande : un lecteur sans JavaScript voit l'ensemble, et les
 * moteurs de recherche indexent les deux versions sur une seule URL — ce qui
 * évite d'avoir à gérer deux adresses quasi jumelles.
 */
export function VersionTabs({
  versions,
  contenus,
}: {
  versions: readonly Version[];
  /** Une entrée par version, dans le même ordre, indexée par `Version.id`. */
  contenus: Record<string, ReactNode>;
}) {
  const [actif, setActif] = useState(versions[0]?.id);
  const courant = versions.find((v) => v.id === actif) ?? versions[0];

  return (
    <>
      <section className="relative px-4 pb-2 pt-4">
        <div className="mx-auto max-w-3xl">
          <div
            role="tablist"
            aria-label="Version du moteur"
            className="flex flex-wrap gap-2"
          >
            {versions.map((v) => {
              const on = v.id === actif;
              return (
                <button
                  key={v.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls={`contenu-${v.id}`}
                  onClick={() => setActif(v.id)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                    on
                      ? "border-pink/60 bg-pink/15 text-pink"
                      : "border-white/10 text-foreground/55 hover:border-pink/30 hover:text-foreground/80",
                  )}
                >
                  {v.label}
                </button>
              );
            })}
          </div>

          <p className="mt-4 flex gap-2.5 rounded-xl border border-white/10 bg-ink-soft/50 px-4 py-3 text-sm leading-relaxed text-foreground/60 md:px-5">
            <Info className="mt-0.5 h-4 w-4 flex-none text-pink/70" />
            <span>
              <span className="text-foreground/80">
                {courant.label} — {courant.statut}.
              </span>{" "}
              Vous êtes concerné si {courant.reconnaitre}.
            </span>
          </p>
        </div>
      </section>

      {versions.map((v) => (
        <div
          key={v.id}
          id={`contenu-${v.id}`}
          role="tabpanel"
          hidden={v.id !== actif}
        >
          {contenus[v.id]}
        </div>
      ))}
    </>
  );
}
