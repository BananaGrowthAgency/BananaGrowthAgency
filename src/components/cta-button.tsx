import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SPECTRUM =
  "linear-gradient(100deg, #ffd21e 0%, #ff7a18 50%, #ff2e9a 100%)";

export function CtaButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        variant === "primary" &&
          "bg-spectrum text-white neon-ring-strong hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(255,46,154,0.7),0_0_60px_rgba(255,122,24,0.45),0_0_90px_rgba(37,224,255,0.25)]",
        variant === "ghost" &&
          "border border-pink/50 text-foreground hover:scale-[1.03] hover:border-transparent hover:text-white hover:shadow-[0_0_24px_rgba(255,46,154,0.55),0_0_50px_rgba(255,122,24,0.3)]",
        className,
      )}
    >
      {/* Ghost : le dégradé balaie le bouton de gauche à droite au survol. */}
      {variant === "ghost" && (
        <span
          aria-hidden
          style={{ backgroundImage: SPECTRUM }}
          className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"
        />
      )}

      {/* Primaire : reflet lumineux qui traverse le bouton au survol. */}
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}

      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-rotate-45" />
      </span>
    </Link>
  );
}
