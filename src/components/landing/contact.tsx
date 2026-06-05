import { CONTACT } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contact" className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pink/20 bg-ink-soft/70 p-8 neon-ring md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-spectrum-radial opacity-40" />

            <div className="relative text-center">
              <span className="text-sm uppercase tracking-[0.2em] md:text-base text-pink/80">
                Contact
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {CONTACT.title}
              </h2>
              <p className="mt-3 text-foreground/60">{CONTACT.subtitle}</p>
            </div>

            <form className="relative mt-10 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Nom"
                className="w-full rounded-xl border border-white/10 bg-ink-soft/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-pink/50"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-xl border border-white/10 bg-ink-soft/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-pink/50"
              />
            </div>
            <textarea
              name="message"
              rows={5}
              placeholder="Votre message"
              className="w-full resize-none rounded-xl border border-white/10 bg-ink-soft/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-pink/50"
            />
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-full bg-spectrum px-6 py-3 text-sm font-semibold text-white neon-ring-strong transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,46,154,0.7),0_0_60px_rgba(255,122,24,0.45),0_0_90px_rgba(37,224,255,0.25)] active:translate-y-0 active:scale-[0.99]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative z-10">Envoyer</span>
            </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
