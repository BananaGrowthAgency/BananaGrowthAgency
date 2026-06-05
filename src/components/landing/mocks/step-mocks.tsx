"use client";

import { motion } from "framer-motion";
import { Check, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Props communes : `active` pilote (re)jouer l'animation quand l'étape s'allume. */
type MockProps = { active?: boolean };

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
export function BookingMock({ active = true }: MockProps) {
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
          const isSel = d === selected;
          return (
            <motion.div
              key={d}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ delay: d * 0.02, duration: 0.3, ease: EASE }}
              className={cn(
                "flex h-6 items-center justify-center rounded-md text-[10px]",
                isSel
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
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
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
export function ChatMock({ active = true }: MockProps) {
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
            animate={
              active
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 10, scale: 0.96 }
            }
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
export function OfferMock({ active = true }: MockProps) {
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
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ delay: 0.25 + i * 0.35, duration: 0.4, ease: EASE }}
            className="flex items-center gap-2.5"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={active ? { scale: 1 } : { scale: 0 }}
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

/* ── Étape 4 : On exécute — campagnes multicanal lancées en live ── */
export function GrowthMock({ active = true }: MockProps) {
  const channels = [
    { name: "Meta Ads", fill: 82, roas: "5,6", color: "from-pink/50 to-pink" },
    {
      name: "Google Ads",
      fill: 68,
      roas: "4,1",
      color: "from-orange/50 to-orange",
    },
    {
      name: "TikTok Ads",
      fill: 54,
      roas: "3,8",
      color: "from-yellow/50 to-yellow",
    },
  ];
  return (
    <MockCard>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-sm font-bold text-foreground">
          Campagnes
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-cyan/15 px-2 py-0.5 text-[10px] font-semibold text-cyan">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-cyan"
            animate={active ? { opacity: [1, 0.3, 1] } : { opacity: 0.3 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          Live
        </span>
      </div>

      <div className="space-y-3.5">
        {channels.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 8 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: 0.2 + i * 0.35, duration: 0.4, ease: EASE }}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[11px] font-medium text-foreground/80">
                {c.name}
              </span>
              <span className="text-[10px] font-semibold text-foreground/50">
                ROAS {c.roas}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className={cn(
                  "h-full rounded-full bg-gradient-to-r",
                  c.color,
                )}
                initial={{ width: 0 }}
                animate={active ? { width: `${c.fill}%` } : { width: 0 }}
                transition={{
                  delay: 0.35 + i * 0.35,
                  duration: 0.7,
                  ease: EASE,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ delay: 1.3, duration: 0.4 }}
        className="mt-4 flex items-center justify-between rounded-xl border border-pink/20 bg-pink/5 px-3 py-2"
      >
        <span className="text-[10px] uppercase tracking-wide text-foreground/50">
          CA généré
        </span>
        <span className="font-display text-base font-bold text-spectrum">
          +490%
        </span>
      </motion.div>
    </MockCard>
  );
}

export const STEP_VISUALS = [BookingMock, ChatMock, OfferMock, GrowthMock];
