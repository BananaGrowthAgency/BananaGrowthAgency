"use client";

import { motion } from "framer-motion";
import { Check, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function MockCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-60 overflow-hidden rounded-3xl border border-white/10 bg-ink-soft/80 p-5 neon-ring backdrop-blur-sm sm:w-72",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-spectrum-radial opacity-40" />
      {children}
    </div>
  );
}

/* ── Étape 1 : Réservez — mini calendrier avec créneau confirmé ── */
export function BookingMock() {
  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  const selected = 14;
  return (
    <MockCard>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-sm font-bold text-foreground">
          Avril
        </span>
        <span className="flex items-center gap-1 rounded-full bg-pink/15 px-2 py-0.5 text-[10px] font-medium text-pink">
          <Sparkles className="h-3 w-3" /> Dispo
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d) => {
          const active = d === selected;
          return (
            <motion.div
              key={d}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: d * 0.02, duration: 0.3, ease: EASE }}
              className={cn(
                "flex h-6 items-center justify-center rounded-md text-[10px]",
                active
                  ? "bg-spectrum font-bold text-white shadow-lg shadow-pink/30"
                  : "bg-white/5 text-foreground/60",
              )}
            >
              {d}
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-4 flex items-center gap-2 rounded-xl border border-pink/20 bg-pink/5 px-3 py-2"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-spectrum text-white">
          <Check className="h-3.5 w-3.5" />
        </span>
        <span className="text-[11px] text-foreground/80">
          RDV confirmé · 14h00
        </span>
      </motion.div>
    </MockCard>
  );
}

/* ── Étape 2 : Échangeons — chat / call de découverte ── */
export function ChatMock() {
  const bubbles = [
    { side: "in" as const, text: "Quels sont vos objectifs ce trimestre ?" },
    { side: "out" as const, text: "Scaler notre CA sur Meta & Google 🚀" },
    { side: "in" as const, text: "On construit la stratégie qu'il vous faut." },
  ];
  return (
    <MockCard>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-spectrum text-white">
          <Phone className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="text-[11px] font-semibold text-foreground">
            Appel découverte
          </p>
          <p className="text-[9px] text-cyan">● en ligne · 30 min</p>
        </div>
      </div>
      <div className="space-y-2">
        {bubbles.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.5, duration: 0.45, ease: EASE }}
            className={cn(
              "max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-snug",
              b.side === "out"
                ? "ml-auto bg-spectrum text-white"
                : "bg-white/8 text-foreground/80",
            )}
          >
            {b.text}
          </motion.div>
        ))}
      </div>
    </MockCard>
  );
}

/* ── Étape 3 : Votre offre — proposition sur-mesure 30 jours ── */
export function OfferMock() {
  const items = [
    "Audit acquisition complet",
    "Roadmap 30 jours sur-mesure",
    "Plan média multicanal",
    "Objectifs de ROAS chiffrés",
  ];
  return (
    <MockCard>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-sm font-bold text-foreground">
          Votre offre
        </span>
        <span className="rounded-full bg-spectrum px-2 py-0.5 text-[10px] font-bold text-white">
          30 jours
        </span>
      </div>
      <div className="space-y-2.5">
        {items.map((it, i) => (
          <motion.div
            key={it}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.35, duration: 0.4, ease: EASE }}
            className="flex items-center gap-2.5"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.4 + i * 0.35,
                type: "spring",
                stiffness: 400,
                damping: 14,
              }}
              className="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-pink/30 bg-pink/10 text-pink"
            >
              <Check className="h-3 w-3" />
            </motion.span>
            <span className="text-[11px] text-foreground/75">{it}</span>
          </motion.div>
        ))}
      </div>
    </MockCard>
  );
}

/* ── Étape 4 : On exécute — dashboard de croissance qui se dessine ── */
export function GrowthMock() {
  const bars = [38, 52, 46, 70, 64, 88, 100];
  return (
    <MockCard>
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-foreground/50">
            CA mensuel
          </p>
          <p className="font-display text-lg font-bold text-spectrum">+490%</p>
        </div>
        <span className="rounded-full bg-cyan/15 px-2 py-0.5 text-[10px] font-semibold text-cyan">
          ROAS 5,6
        </span>
      </div>

      <svg viewBox="0 0 200 70" className="w-full" aria-hidden>
        <defs>
          <linearGradient id="growthLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-yellow)" />
            <stop offset="50%" stopColor="var(--color-orange)" />
            <stop offset="100%" stopColor="var(--color-pink)" />
          </linearGradient>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-pink)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-pink)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 60 L33 50 L66 54 L100 32 L133 38 L166 14 L200 6 L200 70 L0 70 Z"
          fill="url(#growthFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
        <motion.path
          d="M0 60 L33 50 L66 54 L100 32 L133 38 L166 14 L200 6"
          fill="none"
          stroke="url(#growthLine)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </svg>

      <div className="mt-3 flex items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h * 0.32}px` }}
            transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: EASE }}
            className="flex-1 rounded-sm bg-gradient-to-t from-pink/40 to-pink"
          />
        ))}
      </div>
    </MockCard>
  );
}

export const STEP_VISUALS = [BookingMock, ChatMock, OfferMock, GrowthMock];
