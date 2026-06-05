import type { ReactNode } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative px-4 pb-24 pt-32 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl">
            <span className="text-spectrum">{title}</span>
          </h1>
          <div className="legal-prose mt-10 space-y-8 text-sm leading-relaxed text-foreground/65 md:text-base">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
        {heading}
      </h2>
      {children}
    </section>
  );
}
