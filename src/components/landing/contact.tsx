import Script from "next/script";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contact" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 p-4 neon-ring sm:p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

            {/* Formulaire Elfsight (titre + champs gérés dans le widget Elfsight) */}
            <div className="relative">
              <Script
                src="https://elfsightcdn.com/platform.js"
                strategy="afterInteractive"
              />
              <div
                className="elfsight-app-601ffa1e-33b9-4f7e-bee9-ca84346fcf7b"
                data-elfsight-app-lazy
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
