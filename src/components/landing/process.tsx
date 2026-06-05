"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ComponentType } from "react";
import { PROCESS } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  BookingMock,
  ChatMock,
  OfferMock,
  GrowthMock,
} from "@/components/landing/mocks/step-mocks";

const META: {
  title: string;
  icon: string;
  Visual: ComponentType<{ active?: boolean }>;
}[] = [
  { title: "Réservez", icon: "booking", Visual: BookingMock },
  { title: "Échangeons", icon: "chat", Visual: ChatMock },
  { title: "Votre offre", icon: "offer", Visual: OfferMock },
  { title: "On exécute", icon: "exec", Visual: GrowthMock },
];

const STEPS = PROCESS.map((p, i) => ({
  step: p.step,
  desc: p.desc,
  title: META[i]?.title ?? `Étape ${p.step}`,
  icon: META[i]?.icon ?? "exec",
  Visual: META[i]?.Visual ?? GrowthMock,
}));

/** Étape active = celle dont le curseur banane a dépassé le milieu de la card.
 *  Renvoie -1 tant que la banane n'a pas atteint le milieu de la 1re card
 *  (donc tout est éteint au départ). */
function activeFromProgress(p: number, count: number) {
  const START = 0.05; // petit buffer : étape 1 éteinte tout au départ
  if (p < START) return -1;
  return Math.min(count - 1, Math.floor(p * count));
}

/** Icône d'étape : allumage doux (sans clignotement) piloté par `lit`. */
function StepIcon({
  icon,
  lit,
  className,
}: {
  icon: string;
  lit: boolean;
  className?: string;
}) {
  return (
    <span className={cn("ml-1 inline-block shrink-0 neon-step", lit && "is-lit")}>
      <Image
        src={`/canva/steps/${icon}.png`}
        alt=""
        width={96}
        height={96}
        className={className}
      />
    </span>
  );
}

function Header() {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-sm uppercase tracking-[0.2em] md:text-base text-pink/80">
        Notre méthode
      </span>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Une recette simple et <span className="text-spectrum">efficace</span>
      </h2>
    </div>
  );
}

function BananaDot() {
  return (
    <div className="relative h-14 w-14">
      <span className="absolute inset-0 rounded-full bg-pink/45 blur-md" />
      <Image
        src="/logo/banana-dot.png"
        alt=""
        width={72}
        height={72}
        className="relative h-14 w-14 object-contain drop-shadow-[0_0_10px_rgba(255,46,154,0.7)]"
      />
    </div>
  );
}

function ProgressBar({
  fillClip,
  dotLeft,
}: {
  fillClip: string | import("framer-motion").MotionValue<string>;
  dotLeft: string | import("framer-motion").MotionValue<string>;
}) {
  return (
    <div className="relative h-3">
      <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
        {/* Barre néon continue (spectre pleine largeur, révélée jusqu'au curseur — aucune coupure) */}
        <motion.div
          style={{ clipPath: fillClip }}
          className="absolute inset-0 rounded-full bg-spectrum shadow-[0_0_12px_rgb(255_46_154_/_0.5)]"
        />
      </div>
      <motion.div
        style={{ left: dotLeft }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <BananaDot />
      </motion.div>
    </div>
  );
}

/** Desktop : section épinglée, les étapes défilent horizontalement au scroll. */
function ProcessHorizontal() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 50,
    mass: 0.2,
    restDelta: 0.0005,
  });
  const x = useTransform(smooth, [0, 1], ["12.5%", "-62.5%"]);
  // Position du curseur (en %), source unique pour le point ET la barre afin
  // que l'écart reste FIXE (sinon il grandit le long de la barre).
  const dotPos = useTransform(smooth, [0, 1], [2, 98]);
  const dotLeft = useTransform(dotPos, (v) => `${v}%`);
  // Tête de remplissage reculée d'un décalage CONSTANT (bord gauche de la banane).
  const fillClip = useTransform(
    dotPos,
    (v) => `inset(0 ${100 - (v - 1.5)}% 0 0 round 9999px)`,
  );

  // Étape active = celle dont le centre de card est atteint par le curseur.
  const [active, setActive] = useState(-1);
  useMotionValueEvent(smooth, "change", (v) => {
    setActive(activeFromProgress(v, STEPS.length));
  });

  // Quand la section quitte l'écran, tout s'éteint (sinon la dernière étape
  // resterait allumée puisque le scroll progress reste bloqué à 1).
  const sectionInView = useInView(scrollRef, { amount: 0 });
  const litActive = sectionInView ? active : -1;

  return (
    <section
      id="process"
      ref={scrollRef}
      className="relative hidden md:block"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden py-12">
        <div className="mx-auto w-full max-w-6xl px-6 pt-12 md:pt-16">
          <Header />
        </div>

        {/* Bloc des étapes — centré verticalement dans l'écran */}
        <div className="flex flex-1 flex-col justify-center">
        {/* Titres des étapes */}
        <div className="relative overflow-hidden">
          <motion.div
            style={{ x, willChange: "transform" }}
            className="flex w-[200vw] items-end"
          >
            {STEPS.map((row, i) => (
              <div
                key={`t-${row.step}`}
                className="flex w-[50vw] shrink-0 items-end px-8 lg:px-12"
              >
                <div
                  className={cn(
                    "step-dim mx-auto flex w-full max-w-md items-center gap-3",
                    i === litActive && "is-lit",
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-spectrum text-sm font-bold text-white shadow-lg shadow-pink/25">
                    {row.step}
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                    {row.title}
                  </h3>
                  <StepIcon
                    icon={row.icon}
                    lit={i === litActive}
                    className="h-9 w-9 object-contain lg:h-11 lg:w-11"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Barre de progression — bord à bord */}
        <div className="mt-8 w-full">
          <ProgressBar fillClip={fillClip} dotLeft={dotLeft} />
        </div>

        {/* Bodies : description + visuel */}
        <div className="relative mt-16 flex items-start overflow-hidden">
          <motion.div
            style={{ x, willChange: "transform" }}
            className="flex w-[200vw] items-start"
          >
            {STEPS.map((row, i) => (
              <div
                key={`b-${row.step}`}
                className="flex w-[50vw] shrink-0 items-start px-8 lg:px-12"
              >
                <div
                  className={cn(
                    "step-dim mx-auto flex w-full max-w-md flex-col items-start gap-12",
                    i === litActive && "is-lit",
                  )}
                >
                  <p className="max-w-md text-base leading-relaxed text-foreground/65 md:text-lg">
                    {row.desc}
                  </p>
                  <row.Visual active={i === litActive} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}

/** Mobile : carousel horizontal swipeable + barre de progression. */
function ProcessMobile() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const pctNum = 2 + progress * 96;
  const pct = `${pctNum}%`;
  // Décalage constant (bord gauche de la banane) — même offset tout du long.
  const fillClip = `inset(0 ${101.5 - pctNum}% 0 0 round 9999px)`;
  const active = activeFromProgress(progress, STEPS.length);

  return (
    <section
      id="process"
      className="relative overflow-hidden px-0 py-20 md:hidden"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Header />
        <div className="mt-8">
          <div className="relative h-3">
            <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
              <div
                className="absolute inset-0 rounded-full bg-spectrum shadow-[0_0_12px_rgb(255_46_154_/_0.5)] transition-[clip-path] duration-150 ease-out"
                style={{ clipPath: fillClip }}
              />
            </div>
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-150 ease-out"
              style={{ left: pct }}
            >
              <BananaDot />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-8 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {STEPS.map((row, i) => (
          <div
            key={`m-${row.step}`}
            className={cn(
              "step-dim flex w-screen shrink-0 snap-center flex-col gap-8 px-6",
              i === active && "is-lit",
            )}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-spectrum text-sm font-bold text-white shadow-lg shadow-pink/25">
                {row.step}
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
                {row.title}
              </h3>
              <StepIcon
                icon={row.icon}
                lit={i === active}
                className="h-9 w-9 object-contain"
              />
            </div>
            <p className="max-w-md text-base leading-relaxed text-foreground/65">
              {row.desc}
            </p>
            <row.Visual active={i === active} />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Repli statique (mouvement réduit) : empilement vertical classique. */
function ProcessStatic() {
  return (
    <section id="process" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Header />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {STEPS.map((row, i) => (
            <div
              key={row.step}
              className={`flex flex-col items-start gap-6 md:flex-row md:items-center ${
                i % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-spectrum text-sm font-bold text-white shadow-lg shadow-pink/25">
                    {row.step}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {row.title}
                  </h3>
                </div>
                <p className="mt-3 text-base leading-relaxed text-foreground/65">
                  {row.desc}
                </p>
              </div>
              <row.Visual />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <ProcessStatic />;
  return (
    <>
      <ProcessMobile />
      <ProcessHorizontal />
    </>
  );
}
