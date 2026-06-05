"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Icône néon qui s'allume (effet d'amorçage) quand elle arrive à l'écran,
 * et s'éteint (effet inverse) quand elle en sort.
 *
 * Par défaut l'animation se rejoue à CHAQUE entrée dans le viewport : on
 * incrémente `run` à chaque (ré)apparition et on l'utilise comme `key` sur le
 * span animé pour forcer le redémarrage de l'animation CSS (sinon le navigateur
 * ne relance pas une animation `forwards` déjà terminée). Le span porteur du
 * `ref` reste, lui, stable pour ne pas casser le suivi de `useInView`.
 *
 * Avec `once`, l'amorçage ne se joue qu'UNE seule fois (à la première
 * apparition) puis le néon reste allumé — utile pour les logos des hero.
 */
export function NeonIcon({
  src,
  alt = "",
  width = 160,
  height = 160,
  className,
  wrapperClassName,
  amount = 0.55,
  priority = false,
  once = false,
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  wrapperClassName?: string;
  amount?: number;
  priority?: boolean;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount, once });
  const [{ phase, run }, setAnim] = useState<{
    phase: "idle" | "on" | "out";
    run: number;
  }>({ phase: "idle", run: 0 });
  const wasIn = useRef(false);

  useEffect(() => {
    if (inView && !wasIn.current) {
      wasIn.current = true;
      setAnim((s) => ({ phase: "on", run: s.run + 1 }));
    } else if (!inView && wasIn.current) {
      wasIn.current = false;
      setAnim((s) => (s.phase === "idle" ? s : { phase: "out", run: s.run + 1 }));
    }
  }, [inView]);

  return (
    <span ref={ref} className={cn("inline-block", wrapperClassName)}>
      <span
        key={run}
        className={cn(
          "block",
          phase === "idle" && "neon-off",
          phase === "on" && "neon-on",
          phase === "out" && "neon-out",
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
        />
      </span>
    </span>
  );
}
