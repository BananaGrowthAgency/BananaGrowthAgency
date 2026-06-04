"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Icône néon qui s'allume (effet d'amorçage) quand elle arrive à l'écran,
 * et s'éteint (effet inverse) quand elle en sort.
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
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  wrapperClassName?: string;
  amount?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount });
  const [state, setState] = useState<"idle" | "on" | "off">("idle");

  useEffect(() => {
    setState((prev) => (inView ? "on" : prev === "idle" ? "idle" : "off"));
  }, [inView]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block",
        state === "idle" && "neon-off",
        state === "on" && "neon-on",
        state === "off" && "neon-out",
        wrapperClassName,
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
  );
}
