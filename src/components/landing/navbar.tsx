"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navPour, CALENDLY_URL } from "@/lib/site";
import { CtaButton } from "@/components/cta-button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const liens = navPour(usePathname());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative mx-auto max-w-6xl transition-all duration-300",
          scrolled ? "mt-2" : "mt-3",
        )}
      >
        {/* Halo néon coloré DERRIÈRE la barre (ne bave qu'aux bords) */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl blur-lg transition-opacity duration-500 [background-image:linear-gradient(100deg,#ff7a18,#ff2e9a)]",
            scrolled ? "opacity-30" : "opacity-15",
          )}
        />
        <div
          className={cn(
            "border-warm relative flex items-center justify-between gap-4 rounded-2xl px-4 backdrop-blur-xl transition-all duration-300 md:px-6",
            scrolled ? "bg-ink/70 py-2" : "bg-ink/55 py-3",
          )}
        >
        <Link href="/" className="flex items-center" aria-label="Banana Growth Agency">
          <Image
            src="/logo/logoRow.png"
            alt="Banana Growth Agency"
            width={180}
            height={62}
            className={cn(
              "w-auto drop-shadow-[0_0_14px_rgba(255,46,154,0.35)] transition-all duration-300",
              scrolled ? "h-8 md:h-9" : "h-9 md:h-10",
            )}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {liens.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors",
                l.highlight
                  ? "rounded-full border border-pink/45 bg-pink/10 px-3.5 py-1.5 font-semibold text-pink hover:border-pink/70 hover:bg-pink/15"
                  : "text-foreground/70 hover:text-pink",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CtaButton href={CALENDLY_URL}>Prendre RDV</CtaButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-pink/30 text-pink md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-ink/95 p-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {liens.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-base transition-colors",
                  l.highlight
                    ? "border border-pink/45 bg-pink/10 font-semibold text-pink"
                    : "text-foreground/80 hover:bg-white/5 hover:text-pink",
                )}
              >
                {l.label}
              </Link>
            ))}
            <CtaButton href={CALENDLY_URL} className="mt-2 w-full">
              Prendre RDV
            </CtaButton>
          </nav>
        </div>
      )}
    </header>
  );
}
