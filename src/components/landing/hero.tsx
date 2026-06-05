"use client";

import { motion } from "framer-motion";
import { CALENDLY_URL, HERO } from "@/lib/site";
import { CtaButton } from "@/components/cta-button";
import { NeonIcon } from "@/components/neon-icon";
import { CountUp } from "@/components/count-up";

const stats = [
  { value: "10 ans", label: "d'expertise growth" },
  { value: "+490%", label: "de CA généré" },
  { value: "560%", label: "de ROAS max" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-20 pt-24 md:pt-28"
    >
      {/* Spot de lumière blanche type projecteur, centré sur le logo + le texte */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(42% 48% at 50% 30%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 38%, transparent 72%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="relative mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex justify-center"
        >
          <NeonIcon
            src="/logo/logoCol.png"
            alt="Banana Growth Agency"
            width={460}
            height={475}
            className="h-60 w-auto animate-float sm:h-72 md:h-80"
            wrapperClassName="block w-fit"
            amount={0.4}
            once
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mt-2 font-display text-4xl font-bold uppercase leading-[1.0] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {HERO.title}
          <br className="hidden sm:block" />{" "}
          <span className="text-spectrum">{HERO.titleHighlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-base text-foreground/65 md:text-lg"
        >
          Nous créons des stratégies marketing sur-mesure multicanaux qui
          garantissent le ROI de nos clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.6 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <CtaButton href={CALENDLY_URL} className="w-full sm:w-auto">
            {HERO.cta}
          </CtaButton>
          <CtaButton href="#services" variant="ghost" className="w-full sm:w-auto">
            Découvrir nos services
          </CtaButton>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.6 }}
          className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl border border-white/10 px-3 py-4"
            >
              <dt>
                <CountUp
                  value={s.value}
                  className="font-display text-xl font-bold text-spectrum md:text-2xl"
                />
              </dt>
              <dd className="mt-1 text-[11px] leading-tight text-foreground/55 md:text-xs">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
