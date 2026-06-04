"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, CALENDLY_URL } from "@/lib/site";
import { CtaButton } from "@/components/cta-button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-xl md:px-6">
        <Link href="#top" className="flex items-center" aria-label="Banana Growth Agency">
          <Image
            src="/logo/logoRow.png"
            alt="Banana Growth Agency"
            width={180}
            height={62}
            className="h-9 w-auto drop-shadow-[0_0_14px_rgba(255,46,154,0.35)] md:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/70 transition-colors hover:text-pink"
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

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-ink/95 p-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-foreground/80 transition-colors hover:bg-white/5 hover:text-pink"
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
